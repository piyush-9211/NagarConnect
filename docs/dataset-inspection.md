# Dataset Inspection Report

This document tracks the inspection of all datasets selected for training the Nagar Connect object detection model.

---

## 1. Potholes-Detection-YOLOv8

**Status:** Inspected

**Source:** Kaggle

**Format:** YOLO

**Structure:**

- train/images
- train/labels
- valid/images
- valid/labels
- data.yaml

**Classes**

- pothole

**Notes**

- Ready for training.
- No annotation conversion required.

## 2. Roads and Bridges Cracks (YOLOv8 Format)

**Status:**  Inspected

**Source:** Kaggle

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- test/images
- test/labels
- data.yaml

**Classes**

- cracks

**Notes**

- Ready for training.
- No annotation conversion required.
- Class name will be standardized from `cracks` to `RoadCrack`.

## 3. Potholes, Cracks and OpenManholes (Road Hazards)

**Status:**  Inspected

**Source:** Kaggle

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- test/images
- test/labels
- classes/

**Classes**

- cracks
- good_road
- open_manhole
- pothole

**Notes**

- Ready for training.
- No annotation conversion required.
- Standardize:
  - `cracks` → `RoadCrack`
  - `open_manhole` → `OpenManhole`
- Exclude `good_road` from the final dataset since it is not a target class.

## 4. Trash-detection image dataset

**Status:**  Inspected

**Source:** Kaggle (Roboflow)

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- test/images
- test/labels
- data.yaml

**Classes**

- 29 litter categories

**Notes**

- Ready for training.
- No annotation conversion required.
- All 29 classes will be merged into a single class: `Garbage`.

## 5. Open-Manholes Computer Vision Dataset

**Status:**  Inspected

**Source:** Roboflow Universe

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- test/images
- test/labels
- data.yaml

**Classes**

- Manhole
- Open-Manholes
- pothole

**Notes**

- Ready for training.
- No annotation conversion required.
- Standardize:
  - `Open-Manholes` → `OpenManhole`
  - `pothole` → `Pothole`
- Exclude the `Manhole` class from the final dataset since it is not a target complaint category.

## 6. Waterlogging Computer Vision Dataset

**Status:**  Inspected

**Source:** Roboflow Universe

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- test/images
- test/labels
- data.yaml

**Classes**

- 0
- object
- waterlogging

**Notes**

- Ready for training.
- No annotation conversion required.
- Remove:
  - `0`
  - `object`
- Standardize:
  - `waterlogging` → `Waterlogging`

## 7. Damaged Lights Computer Vision Dataset

**Status:**  Inspected

**Source:** Roboflow Universe

**Format:** YOLO

**Structure**

- train/images
- train/labels
- valid/images
- valid/labels
- data.yaml

**Classes**

- Not Working
- Working

**Notes**

- Ready for training.
- No annotation conversion required.
- Standardize:
  - `Not Working` → `BrokenStreetlight`
- Exclude:
  - `Working`

---

# Final Dataset Summary For The Entire Report

| Class | Dataset(s) Selected |
|------|----------------------|
| Pothole | Potholes-Detection-YOLOv8, Road Hazards |
| RoadCrack | Roads and Bridges Cracks, Road Hazards |
| Garbage | Trash-detection |
| OpenManhole | Open-Manholes, Road Hazards |
| Waterlogging | Waterlogging Computer Vision Dataset |
| BrokenStreetlight | Damaged Lights |

## Total Selected Datasets

- Potholes-Detection-YOLOv8
- Roads and Bridges Cracks (YOLOv8 Format)
- Potholes, Cracks and OpenManholes (Road Hazards)
- Trash-detection image dataset
- Open-Manholes Computer Vision Dataset
- Waterlogging Computer Vision Dataset
- Damaged Lights Computer Vision Dataset

**Total:** 7 datasets