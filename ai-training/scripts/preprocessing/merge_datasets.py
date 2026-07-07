"""
Merge all selected datasets into one standardized Nagar Connect dataset.

This script creates the folder structure that will hold the final
merged dataset used for training the Nagar Connect AI model.
"""

from pathlib import Path
import shutil

from filter_classes import (
    load_dataset_classes,
    create_class_mapping,
)

# Project paths

PROJECT_ROOT = Path(__file__).resolve().parents[2]

RAW_DATASETS = PROJECT_ROOT / "datasets" / "raw"

OUTPUT_DATASET = (
    PROJECT_ROOT
    / "datasets"
    / "processed"
    / "nagarconnect"
)


def create_output_folders():
    """
    Create the folder structure for the processed dataset.
    """

    for split in ["train", "valid", "test"]:

        (OUTPUT_DATASET / split / "images").mkdir(
            parents=True,
            exist_ok=True,
        )

        (OUTPUT_DATASET / split / "labels").mkdir(
            parents=True,
            exist_ok=True,
        )

def find_dataset_splits(dataset_path):
    """
    Find available train, valid and test folders in a dataset.

    Args:
        dataset_path (Path): Path to a dataset folder.

    Returns:
        dict: Available dataset splits.
    """

    splits = {}

    for split in ["train", "valid", "test"]:

        split_path = dataset_path / split

        if split_path.exists():
            splits[split] = split_path

    return splits
def get_image_label_dirs(split_path):
    """
    Return image and label directories for a dataset split.

    Args:
        split_path (Path): train/valid/test folder

    Returns:
        tuple(Path, Path): (images_dir, labels_dir)
    """

    images_dir = split_path / "images"
    labels_dir = split_path / "labels"

    if not images_dir.exists():
        return None, None

    if not labels_dir.exists():
        return None, None

    return images_dir, labels_dir

def load_label_file(label_path):
    """
    Read all annotations from a YOLO label file.

    Args:
        label_path (Path)

    Returns:
        list
    """

    if not label_path.exists():
        return []

    with open(label_path, "r", encoding="utf-8") as file:
        return file.readlines()
    
def save_label_file(label_path, annotations):
    """
    Save annotations to a YOLO label file.
    """

    with open(label_path, "w", encoding="utf-8") as file:
        file.writelines(annotations)

def copy_image(source_image, destination_image):
    """
    Copy an image to the processed dataset.
    """

    shutil.copy2(source_image, destination_image)


if __name__ == "__main__":

    sample = next(
    path for path in RAW_DATASETS.rglob("*.txt")
    if path.parent.name == "labels"
)

    print(sample)

    annotations = load_label_file(sample)

    print("\nFirst five annotations:\n")

    for line in annotations[:5]:
        print(line.strip())