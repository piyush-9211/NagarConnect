"""
Convert all dataset labels to the final Nagar Connect class IDs.
"""

from pathlib import Path

from filter_classes import (
    load_dataset_classes,
    create_class_mapping,
)

PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASETS = {
    "brokenstreetlight": PROJECT_ROOT / "datasets" / "raw" / "brokenstreetlight" / "brokenstreetlightdataset",

    "garbage": PROJECT_ROOT / "datasets" / "raw" / "garbage" / "garbagedataset" / "trash-detection.v35.yolov9",

    "openmanhole": PROJECT_ROOT / "datasets" / "raw" / "openmanhole" / "openmanholedataset",

    "pothole": PROJECT_ROOT / "datasets" / "raw" / "pothole" / "potholedataset",

    "roadcrack": PROJECT_ROOT / "datasets" / "raw" / "roadcrack" / "roadcrackdataset",

    "waterlogging": PROJECT_ROOT / "datasets" / "raw" / "waterlogging" / "Waterlogging.v2i.yolov8",
}


def convert_label_file(label_file, mapping):
    if not label_file.exists():
        return

    new_lines = []

    with open(label_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()

            if not line:
                continue

            parts = line.split()

            old_class = int(parts[0])

            new_class = mapping.get(old_class)

            if new_class is None:
                continue

            parts[0] = str(new_class)

            new_lines.append(" ".join(parts) + "\n")

    with open(label_file, "w", encoding="utf-8") as f:
        f.writelines(new_lines)


if __name__ == "__main__":

    for dataset_name, dataset_path in DATASETS.items():

        data_yaml = dataset_path / "data.yaml"

        if not data_yaml.exists():
            print(f"Skipping {dataset_name} (no data.yaml)")
            continue

        print(f"\nProcessing {dataset_name}")

        class_names = load_dataset_classes(data_yaml)

        mapping = create_class_mapping(class_names)

        for split in ["train", "valid", "test"]:

            labels_dir = dataset_path / split / "labels"

            if not labels_dir.exists():
                continue

            for label_file in labels_dir.glob("*.txt"):
                convert_label_file(label_file, mapping)

        print("Done")

print("\nAll datasets converted successfully.")