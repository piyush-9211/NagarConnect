from pathlib import Path


DATASET = Path(
    "ai-training/datasets/processed/nagarconnect"
)


valid_classes = {
    "0",
    "1",
    "2",
    "3",
    "4",
    "5"
}


bad_labels = []


for label_file in DATASET.rglob("*.txt"):

    with open(label_file, "r") as f:

        for line in f:

            parts = line.strip().split()

            if len(parts) < 5:
                bad_labels.append(
                    str(label_file)
                )
                break


            if parts[0] not in valid_classes:
                bad_labels.append(
                    str(label_file)
                )
                break



print(
    "Bad labels:",
    len(bad_labels)
)


if bad_labels:
    print(
        bad_labels[:10]
    )
else:
    print(
        "Dataset looks clean ✅"
    )