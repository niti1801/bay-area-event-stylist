# NP Events — Portfolio website

Static site for **Niti Punjabi** — **Event Stylist** (Bay Area). Works in any modern browser on **desktop and mobile**.

## Live site (GitHub Pages)

**[https://niti1801.github.io/np-events-website/](https://niti1801.github.io/np-events-website/)**

Repository: [github.com/niti1801/np-events-website](https://github.com/niti1801/np-events-website)

## Local preview

```bash
python3 -m http.server 8765
```

Open [http://127.0.0.1:8765](http://127.0.0.1:8765).

## Updating the live site

After you change files locally:

```bash
git add -A
git commit -m "Describe your change"
git push
```

GitHub Pages rebuilds in about one minute. Hard-refresh the live URL if you don’t see updates.

## Project layout

- `index.html` — main page  
- `css/` — styles  
- `js/` — carousel behavior  
- `assets/images/` — images and icons  
- `assets/images/og-image.jpg` — **1200×630** Open Graph / Twitter link preview (derived from `hero.jpg`; regenerate if you replace the hero photo)  
- `assets/images/logo-mark-icon.png` — **1024×1024** source for favicons (mark on white)  
- `assets/images/favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` — resized from `logo-mark-icon.png`  

## Portfolio order

Within each category (e.g. **Balloon arch and backdrop styling**), **new projects go first**—directly under that section’s subheading—followed by older work. The first project block uses `project__block` only; each additional project adds `project__block--spaced` for spacing.

Carousel photos use **center-cropped** JPEGs at **710×946px** (2× the on-screen slot, aspect **355∶473** to match `.carousel__slide img`). To re-export the Holi set from source PNGs, copy the four originals into `assets/holi-sources/` using the filenames listed in `scripts/process_holi_images.py`, then run `scripts/process_holi_images.py` with Pillow available (e.g. create `.venv`, `pip install Pillow`, then `.venv/bin/python scripts/process_holi_images.py`).
