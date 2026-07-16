from pathlib import Path
import shutil


PROJECT_ROOT = Path(__file__).resolve().parents[2]


INPUT = (
    PROJECT_ROOT /
    "datasets" /
    "raw" /
    "garbage" /
    "garbagedataset" /
    "trash-detection.v35.yolov9"
)


OUTPUT = (
    PROJECT_ROOT /
    "datasets" /
    "processed" /
    "garbage"
)



def polygon_to_bbox(points):

    xs = points[0::2]
    ys = points[1::2]

    x_min = min(xs)
    x_max = max(xs)

    y_min = min(ys)
    y_max = max(ys)


    x_center = (x_min + x_max) / 2
    y_center = (y_min + y_max) / 2

    width = x_max - x_min
    height = y_max - y_min


    return (
        x_center,
        y_center,
        width,
        height
    )



def convert_label(src, dst):

    new_lines = []


    with open(src, "r") as f:

        for line in f:

            values = line.strip().split()

            if len(values) < 7:
                continue


            points = list(
                map(float, values[1:])
            )


            x,y,w,h = polygon_to_bbox(
                points
            )


            new_lines.append(
                f"2 {x} {y} {w} {h}\n"
            )


    with open(dst,"w") as f:
        f.writelines(new_lines)




if __name__ == "__main__":


    count = 0


    for split in [
        "train",
        "valid",
        "test"
    ]:


        image_out = (
            OUTPUT /
            split /
            "images"
        )


        label_out = (
            OUTPUT /
            split /
            "labels"
        )


        image_out.mkdir(
            parents=True,
            exist_ok=True
        )


        label_out.mkdir(
            parents=True,
            exist_ok=True
        )


        image_in = (
            INPUT /
            split /
            "images"
        )


        label_in = (
            INPUT /
            split /
            "labels"
        )


        for image in image_in.iterdir():

            if image.suffix.lower() not in [
                ".jpg",
                ".png",
                ".jpeg"
            ]:
                continue


            shutil.copy2(
                image,
                image_out / image.name
            )


            label = (
                label_in /
                f"{image.stem}.txt"
            )


            if label.exists():

                convert_label(
                    label,
                    label_out /
                    label.name
                )

            count += 1



    print(
        "Converted garbage images:",
        count
    )