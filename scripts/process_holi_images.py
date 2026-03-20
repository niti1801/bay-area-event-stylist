#!/usr/bin/env python3
"""Center-crop to carousel aspect (355:473) and export 2x JPEGs for portfolio carousels."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: pip install Pillow", file=sys.stderr)
    sys.exit(1)

# Matches css: .carousel__slide img { width 100%; max ~355px; height min(70vh, 473px); object-fit: cover }
TARGET_W, TARGET_H = 710, 946
ASPECT = TARGET_W / TARGET_H


def crop_and_save(src: Path, dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    r = w / h
    if r > ASPECT:
        new_w = int(round(h * ASPECT))
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    elif r < ASPECT:
        new_h = int(round(w / ASPECT))
        top = (h - new_h) // 2
        im = im.crop((0, top, w, top + new_h))
    im = im.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=88, optimize=True)


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    out_dir = root / "assets" / "images"
    sources = [
        "01E0A026-48E6-43B9-BDDA-CAAB3A4912DE-2d4fea93-54c1-4803-a5c1-7b1825ce83f8.png",
        "IMG_7530-2eec0dfb-8dfb-4d84-b442-f203dd716f56.png",
        "73A01F2F-E6ED-4E75-91E9-BB7E30EEE341-d3acf47a-7df9-49a4-82e9-0452111d73e8.png",
        "C009387A-486B-4178-9BDD-17990C6FDC66-bfbc9d65-c20f-4e94-aeb9-118f64994135.png",
    ]
    # Default: look in repo assets/holi-sources/ (copy PNGs here) or pass dir as argv[1]
    src_root = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "assets" / "holi-sources"
    for i, name in enumerate(sources, start=1):
        src = src_root / name
        if not src.is_file():
            print(f"Missing: {src}", file=sys.stderr)
            sys.exit(1)
        dest = out_dir / f"holi-{i}.jpg"
        crop_and_save(src, dest)
        print(dest)


if __name__ == "__main__":
    main()
