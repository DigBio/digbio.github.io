# Digital Biology Lab Website

This is the rebuilt static website for the Digital Biology Lab. It is a simple
8-page static site that can be edited directly as HTML and deployed with GitHub
Pages.

The previous WordPress snapshot was backed up in Git commit `eb6c68b` before the
cleanup.

## Project Structure

- `index.html` is the Home page.
- `digital-bio-news/index.html` is the News page.
- `our-team/index.html` is the Team page.
- `publications/index.html` is the Publications page.
- `software/index.html` is the Software page.
- `contact/index.html` is the Contact page.
- `assets/index.html` is the Assets page.
- `thank-for-your-message/index.html` is the thank-you page.
- `assets/uploads/` contains images and PDFs used by the pages.
- `assets/legacy/` contains old theme and plugin CSS/JS needed to preserve the
  original appearance.

## Editing

Edit the HTML files directly. Most content changes should happen in one of the
8 `index.html` files listed above. The files under `assets/legacy/` are
preserved style and script dependencies from the old site and should usually be
left alone.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. The
workflow uploads the static files directly; there is no build step.
