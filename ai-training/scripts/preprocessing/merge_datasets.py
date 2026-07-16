"""
Merge all selected datasets into one standardized Nagar Connect dataset.
"""

from pathlib import Path
import shutil

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

    for split in ["train", "valid", "test"]:

        (OUTPUT_DATASET / split / "images").mkdir(
            parents=True,
            exist_ok=True
        )

        (OUTPUT_DATASET / split / "labels").mkdir(
            parents=True,
            exist_ok=True
        )


def find_dataset_splits(dataset_path):

    splits = {}

    for split in ["train", "valid", "test"]:

        split_path = dataset_path / split

        if split_path.exists():
            splits[split] = split_path

    return splits


def get_image_label_dirs(split_path):

    images_dir = split_path / "images"
    labels_dir = split_path / "labels"

    if not images_dir.exists():
        return None, None

    if not labels_dir.exists():
        return None, None

    return images_dir, labels_dir


def load_label_file(label_path):

    if not label_path.exists():
        return []

    with open(label_path, "r", encoding="utf-8") as file:
        return file.readlines()


def save_label_file(label_path, annotations):

    with open(label_path, "w", encoding="utf-8") as file:
        file.writelines(annotations)


def copy_image(source, destination):

    if not source.exists():
        print("Missing image skipped:", source)
        return False

    destination.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    shutil.copy2(
        str(source),
        str(destination)
    )

    return True



if __name__ == "__main__":

    create_output_folders()


    datasets = {

        "brokenstreetlight":
            RAW_DATASETS /
            "brokenstreetlight" /
            "brokenstreetlightdataset",


        "garbage":
         PROJECT_ROOT /
         "datasets" /
         "processed" /
         "garbage",


        "openmanhole":
            RAW_DATASETS /
            "openmanhole" /
            "openmanholedataset", 


        "pothole":
            RAW_DATASETS /
            "pothole" /
            "potholedataset",


        "roadcrack":
            RAW_DATASETS /
            "roadcrack" /
            "roadcrackdataset",


        "waterlogging":
            PROJECT_ROOT /
            "datasets" /
            "processed" /
            "waterlogging"
    }



    total_images = 0
    total_labels = 0


    for dataset_name, dataset_path in datasets.items():

        print("\nProcessing", dataset_name)


        splits = find_dataset_splits(dataset_path)


        for split, split_path in splits.items():


            images_dir, labels_dir = get_image_label_dirs(
                split_path
            )


            if images_dir is None:
                continue



            output_images = (
                OUTPUT_DATASET /
                split /
                "images"
            )


            output_labels = (
                OUTPUT_DATASET /
                split /
                "labels"
            )



            for image_file in list(images_dir.iterdir()):


                if not image_file.is_file():
                    continue


                if image_file.suffix.lower() not in [
                    ".jpg",
                    ".jpeg",
                    ".png"
                ]:
                    continue


                destination_image = (
                    output_images /
                    f"{dataset_name}_{image_file.name}"
                )


                copied = copy_image(
                    image_file,
                    destination_image
                )


                if not copied:
                    continue



                label_file = (
                    labels_dir /
                    f"{image_file.stem}.txt"
                )


                destination_label = (
                    output_labels /
                    f"{dataset_name}_{image_file.stem}.txt"
                )


                annotations = []


                if label_file.exists():

                    annotations = load_label_file(
                        label_file
                    )


                save_label_file(
                    destination_label,
                    annotations
                )


                total_images += 1
                total_labels += 1



        print(
            "Finished",
            dataset_name
        )



    print("\nMERGE COMPLETE")

    print(
        "Images copied:",
        total_images
    )

    print(
        "Labels created:",
        total_labels
    )