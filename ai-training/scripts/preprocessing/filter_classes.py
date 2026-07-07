"""
Filter and standardize dataset classes.

This script reads the class names from a dataset,
maps them to the final Nagar Connect classes,
and identifies which classes should be ignored.
"""

from pathlib import Path
import yaml

from class_mapping import (
    FINAL_CLASSES,
    CLASS_RENAME,
    GARBAGE_CLASSES,
    IGNORE_CLASSES,
)


def load_dataset_classes(data_yaml_path):
    """
    Load class names from a YOLO data.yaml file.

    Args:
        data_yaml_path (str or Path): Path to the dataset's data.yaml.

    Returns:
        list: List of class names.
    """

    data_yaml_path = Path(data_yaml_path)

    with open(data_yaml_path, "r", encoding="utf-8") as file:
        data = yaml.safe_load(file)

    return data["names"]
def create_class_mapping(class_names):
    """
    Create a mapping from dataset class IDs to final Nagar Connect class IDs.

    Args:
        class_names (list): Original class names from the dataset.

    Returns:
        dict: Mapping of original class ID -> final class ID (or None if ignored).
    """

    mapping = {}

    for original_id, class_name in enumerate(class_names):

        # Ignore unwanted classes
        if class_name in IGNORE_CLASSES:
            mapping[original_id] = None
            continue

        # Merge all garbage classes
        if class_name in GARBAGE_CLASSES:
            mapping[original_id] = FINAL_CLASSES["Garbage"]
            continue

        # Rename classes if needed
        final_name = CLASS_RENAME.get(class_name, class_name)

        # Convert final class name to class ID
        if final_name in FINAL_CLASSES:
            mapping[original_id] = FINAL_CLASSES[final_name]
        else:
            print(f"Warning: Unknown class '{class_name}'")
            mapping[original_id] = None

    return mapping
