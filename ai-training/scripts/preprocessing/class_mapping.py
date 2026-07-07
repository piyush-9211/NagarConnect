"""
Class mapping configuration for the Nagar Connect dataset.

This file defines:
1. Final class IDs.
2. Class name standardization.
3. Classes to ignore during preprocessing.
"""

# Final class IDs


FINAL_CLASSES = {
    "Pothole": 0,
    "RoadCrack": 1,
    "Garbage": 2,
    "OpenManhole": 3,
    "Waterlogging": 4,
    "BrokenStreetlight": 5,
}


# Rename classes
# (original name -> final name)

CLASS_RENAME = {
    "pothole": "Pothole",

    "cracks": "RoadCrack",

    "Open-Manholes": "OpenManhole",
    "open_manhole": "OpenManhole",

    "waterlogging": "Waterlogging",

    "Not Working": "BrokenStreetlight",
}


# Merge multiple classes into one

GARBAGE_CLASSES = [
    "Aluminium foil",
    "Bottle cap",
    "Broken glass",
    "Cigarette",
    "Clear plastic bottle",
    "Crisp packet",
    "Cup",
    "Drink can",
    "Food Carton",
    "Food container",
    "Food waste",
    "Garbage bag",
    "Glass bottle",
    "Lid",
    "Other Carton",
    "Other can",
    "Other container",
    "Other plastic",
    "Other plastic bottle",
    "Other plastic wrapper",
    "Paper",
    "Paper bag",
    "Plastic bag wrapper",
    "Plastic film",
    "Pop tab",
    "Single-use carrier bag",
    "Straw",
    "Styrofoam piece",
    "Unlabeled litter",
]


# Classes to ignore

IGNORE_CLASSES = {
    "good_road",
    "Working",
    "Manhole",
    "object",
    "0",
}