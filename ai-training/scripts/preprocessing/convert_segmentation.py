"""
Convert YOLO segmentation labels to YOLO object detection labels.

Currently used for:
- Waterlogging dataset

The script converts polygon annotations into bounding boxes.
"""

import os
import shutil


def polygon_to_bbox(points):
    """
    Convert polygon points into YOLO bounding box format.
    
    Input:
    [x1, y1, x2, y2, ...]

    Output:
    x_center, y_center, width, height
    """

    x_coordinates = points[0::2]
    y_coordinates = points[1::2]

    xmin = min(x_coordinates)
    xmax = max(x_coordinates)

    ymin = min(y_coordinates)
    ymax = max(y_coordinates)

    x_center = (xmin + xmax) / 2
    y_center = (ymin + ymax) / 2

    width = xmax - xmin
    height = ymax - ymin

    return x_center, y_center, width, height

def convert_label_file(input_file, output_file):
    """
    Convert one YOLO segmentation label file
    into YOLO detection format.
    """

    with open(input_file, "r") as file:
        lines = file.readlines()

    converted_lines = []

    for line in lines:
        values = line.strip().split()

        if len(values) < 7:
            continue

        class_id = values[0]

        points = list(map(float, values[1:]))

        x_center, y_center, width, height = polygon_to_bbox(points)

        converted_lines.append(
            f"{class_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n"
        )

    with open(output_file, "w") as file:
        file.writelines(converted_lines)

if __name__ == "__main__":

    input_folder = (
        "ai-training/datasets/raw/waterlogging/"
        "Waterlogging.v2i.yolov8/valid/labels"
    )

    output_folder = (
        "ai-training/datasets/processed/waterlogging/labels"
    )

    image_input_folder = (
        "ai-training/datasets/raw/waterlogging/"
        "Waterlogging.v2i.yolov8/valid/images"
    )

    image_output_folder = (
        "ai-training/datasets/processed/waterlogging/images"
    )

    os.makedirs(output_folder, exist_ok=True)
    os.makedirs(image_output_folder, exist_ok=True)


    # Convert segmentation labels to detection labels

    converted_count = 0

    for filename in os.listdir(input_folder):

        if filename.endswith(".txt"):

            input_file = os.path.join(
                input_folder,
                filename
            )

            output_file = os.path.join(
                output_folder,
                filename
            )

            if not os.path.isfile(input_file):
                continue

            if os.path.getsize(input_file) == 0:
                continue

            convert_label_file(
                input_file,
                output_file
            )

            converted_count += 1


    print(
        f"Converted {converted_count} label files successfully."
    )


    # Copy corresponding images

    copied_images = 0

    for filename in os.listdir(image_input_folder):

        if filename.lower().endswith(
            (".jpg", ".jpeg", ".png")
        ):

            source = os.path.join(
            image_input_folder,
            filename
            )

            destination = os.path.join(
            image_output_folder,
            filename
            )

            if not os.path.isfile(source):
                continue

            try:
                shutil.copy2(
                    source,
                    destination
                )

                copied_images += 1

            except FileNotFoundError:
                continue


    print(
        f"Copied {copied_images} images successfully."
    )