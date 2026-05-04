# SNAKEPISS Website

Static band website. HTML, CSS, JS. No build step.

## Quick Start

Open `index.html` in a browser, or run a tiny local server:

```bash
npx serve .
```

## Content

Band bio:
Search `EDIT YOUR BAND BIO BELOW` in `index.html`.

Social links:
Instagram, Facebook, Spotify, and Bandcamp are already connected in `index.html`.

Music:
Spotify and Bandcamp embeds are already connected in `index.html`.

Shows:
Upcoming shows are rendered from `data/shows.js`. On GitHub, `.github/workflows/update-shows.yml` can update this file from Bandsintown.

Merch:
Edit the merch cards in `index.html`. Put images in `img/` and reference them like:

```html
<img src="img/your-image.jpg" alt="Product Name">
```

Colors:
Edit CSS variables at the top of `style.css`.

## Bandsintown Setup

Do not put the Bandsintown API key into `index.html` or `script.js`.

For GitHub Pages:

1. Push this project to GitHub.
2. In the repo, go to Settings > Secrets and variables > Actions.
3. Add a repository secret named `BANDSINTOWN_API_KEY`.
4. Paste the Bandsintown API key as the secret value.
5. Go to Actions and run `Update Bandsintown Shows` once.
6. The workflow updates `data/shows.js`.

If the workflow returns no events, update `BANDSINTOWN_ARTIST` in `.github/workflows/update-shows.yml` to the exact Bandsintown artist ID, for example `id_123456`.

## Deploying to GitHub Pages

1. Create a public GitHub repository. GitHub Pages is free for public repos.
2. Push all files to the `main` branch.
3. Go to Settings > Pages.
4. Set Source to `Deploy from a branch`.
5. Select `main` and `/root`.
6. GitHub gives you a `*.github.io` URL.
7. For `www.snakepiss.com`, add a `CNAME` file and configure DNS at your domain registrar.

```txt
www.snakepiss.com
```

## File Structure

```txt
snakepiss-website/
├── index.html
├── style.css
├── script.js
├── README.md
├── data/
│   └── shows.js
├── .github/
│   └── workflows/
│       └── update-shows.yml
└── img/
    └── your-image.jpg
```
