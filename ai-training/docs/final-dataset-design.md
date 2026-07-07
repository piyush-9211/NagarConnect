# Final Dataset Design

## Final Classes

| ID | Class |
|----|------------------|
| 0 | Pothole |
| 1 | RoadCrack |
| 2 | Garbage |
| 3 | OpenManhole |
| 4 | Waterlogging |
| 5 | BrokenStreetlight |

---

## Final Folder Structure

```
datasets/
└── processed/
    └── nagarconnect/
        ├── train/
        │   ├── images/
        │   └── labels/
        ├── valid/
        │   ├── images/
        │   └── labels/
        ├── test/
        │   ├── images/
        │   └── labels/
        └── data.yaml
```

---

## Standardization Rules

| Original | Final |
|----------|-------|
| pothole | Pothole |
| cracks | RoadCrack |
| Open-Manholes | OpenManhole |
| open_manhole | OpenManhole |
| waterlogging | Waterlogging |
| Not Working | BrokenStreetlight |

---

## Remove These Classes

- good_road
- Working
- Manhole
- object
- 0

---

## Final data.yaml

```yaml
train: train/images
val: valid/images
test: test/images

nc: 6

names:
  0: Pothole
  1: RoadCrack
  2: Garbage
  3: OpenManhole
  4: Waterlogging
  5: BrokenStreetlight
```