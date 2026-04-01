# Punkeye Pictures

Teaser website for Punkeye Pictures—a structured media arts program for youth and adults with developmental disabilities. Launching 2026.

## Where this repo lives

The canonical clone sits in the **Obsidian iCloud vault** so it syncs to the Satellite Mac:

| Machine | Path |
|--------|------|
| **Source** (external home) | `…/Library/Mobile Documents/iCloud~md~obsidian/Documents/Punkeye/Work/punkeye-pictures-com` |
| **Satellite** (typical) | `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Punkeye/Work/punkeye-pictures-com` |

A **symlink** may still exist at `~/Projects/Punkeye Pictures web Site` on the Source machine (same folder). In **Cursor**, open this folder directly or add it to **`joemini-projects.code-workspace`** (paths differ per Mac—adjust the absolute path on the Satellite if needed).

**Remote:** `https://github.com/jpm-cyber/Punkeye-Pictures-Landing.git`

## Viewing the site

Open `index.html` in a browser, or run a local server:

```bash
# Python 3
python -m http.server 8000

# or npx
npx serve .
```

Then visit http://localhost:8000

## Structure

- **index.html** — Home, core philosophy, audiences
- **about.html** — Founder (Joe Moulins), Own Voice, mission
- **what-we-do.html** — Organizations, families, how it works, funders
- **contact.html** — Email, next steps

Content drawn from Obsidian docs (ethos, service delivery, core principles). Static HTML/CSS/JS. No build step.
