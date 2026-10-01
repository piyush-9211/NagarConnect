from fastapi import FastAPI, UploadFile, File, HTTPException
from ultralytics import YOLO
from PIL import Image
from io import BytesIO
from pathlib import Path

app = FastAPI(title="NagarConnect AI Service")

# Find the NagarConnect project root
PROJECT_ROOT = Path(__file__).resolve().parents[1]

# Load trained YOLO model
MODEL_PATH = PROJECT_ROOT / "models/best.pt"

model = YOLO(MODEL_PATH)


# Department mapping
DEPARTMENT_MAP = {
    "Pothole": "Road Maintenance",
    "Garbage": "Sanitation",
    "Waterlogging": "Drainage",
    "BrokenStreetlight": "Electrical",
}


# Estimated repair budget
# These are configurable MVP estimates, not official fixed costs.
COST_TABLE = {
    "Pothole": {
        "Low": 2000,
        "Medium": 8000,
        "High": 15000,
    },
    "Garbage": {
        "Low": 500,
        "Medium": 1500,
        "High": 3000,
    },
    "Waterlogging": {
        "Low": 10000,
        "Medium": 17500,
        "High": 25000,
    },
    "BrokenStreetlight": {
        "Low": 4000,
        "Medium": 6000,
        "High": 8000,
    },
}


def calculate_severity(area_ratio):
    """
    Estimate severity using bounding-box area
    relative to the image area.

    This is an MVP proxy, not a physical measurement.
    """

    if area_ratio < 0.05:
        return "Low"
    elif area_ratio < 0.15:
        return "Medium"
    else:
        return "High"


@app.get("/")
def home():
    return {
        "service": "NagarConnect AI Service",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "nagarconnect_v1",
        "classes": list(model.names.values())
    }


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read uploaded file
        image_bytes = await file.read()

        # Let PIL verify that the file is actually an image
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        # Make sure an image was uploaded
    

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Could not read the uploaded image."
        )

    # Run YOLO
    results = model.predict(
        source=image,
        conf=0.25,
        verbose=False
    )

    result = results[0]

    image_width, image_height = image.size
    image_area = image_width * image_height

    detections = []

    if result.boxes is not None:

        for box in result.boxes:

            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            class_name = model.names[class_id]

            # Bounding box coordinates
            x1, y1, x2, y2 = box.xyxy[0].tolist()

            box_width = x2 - x1
            box_height = y2 - y1

            box_area = box_width * box_height

            # How much of the image does the object occupy?
            area_ratio = box_area / image_area

            # Estimate severity
            severity = calculate_severity(area_ratio)

            # Department
            department = DEPARTMENT_MAP.get(
                class_name,
                "General Civic Maintenance"
            )

            # Estimated repair budget
            estimated_cost = COST_TABLE.get(
                class_name,
                {}
            ).get(
                severity,
                0
            )

            detections.append({
                "class": class_name,
                "confidence": round(confidence, 3),
                "severity": severity,
                "estimated_cost": estimated_cost,
                "department": department,
                "bounding_box": {
                    "x1": round(x1, 2),
                    "y1": round(y1, 2),
                    "x2": round(x2, 2),
                    "y2": round(y2, 2)
                }
            })

    # Nothing detected
    if not detections:
        return {
            "success": True,
            "message": "No supported civic issue detected.",
            "detections": []
        }

    # Select highest-confidence detection
    top_detection = max(
        detections,
        key=lambda x: x["confidence"]
    )

    return {
        "success": True,
        "class": top_detection["class"],
        "confidence": top_detection["confidence"],
        "severity": top_detection["severity"],
        "estimated_cost": top_detection["estimated_cost"],
        "department": top_detection["department"],
        "detections": detections
    }
