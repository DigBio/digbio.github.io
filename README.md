# Digital Biology Lab - Archived Website

This repository started as a static snapshot of the former Digital Biology Lab
website, previously hosted at `digbio.missouri.edu`. The original WordPress site
is no longer maintained.

Snapshot taken: 2026-07-30.

## Static rebuild workflow

The original snapshot files are kept in `archive/snapshot-2026-07-30/` as the
reference copy. The 8 WordPress page-type pages have also been extracted into
editable source files:

- `src/pages/*.html` contains the editable `<main id="content">...</main>` block
  for each page.
- `src/shells/*.before.html` and `src/shells/*.after.html` preserve the original
  WordPress-generated wrapper around each page.
- `src/pages.json` maps each editable page to its original snapshot path and its
  generated output path.

Build the deployable static site with:

```bash
npm run build
```

The rebuilt website is written to `dist/`. This directory is the deployable
static product: it contains only the 8 rebuilt page-type HTML pages plus the
static WordPress assets needed for those pages to display correctly. The build
copies `wp-content/` and `wp-includes/` from the archived snapshot, then
regenerates the 8 editable pages from `src/`.

To confirm that the first extracted version still matches the archived snapshot:

```bash
npm run build
npm run check:parity
```

Only run the extractor again when you intentionally want to reset the editable
page sources from the current snapshot:

```bash
npm run extract:pages -- --force
```

GitHub Pages deployment is configured in `.github/workflows/pages.yml`. In the
GitHub repository settings, set Pages to deploy from GitHub Actions.
