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

## SEO and traffic monitoring

### SEO improvements in this repo

- `index.html` includes improved social tags (`og:site_name`, `og:locale`, `twitter:image`).
- `index.html` includes `ProfessionalService` JSON-LD schema.
- Canonical URLs are set to `https://www.punkeyepictures.ca/`.

### Umami analytics (optional)

If you use Umami, place this script on each page before `</body>` (replace placeholders):

```html
<script defer src="https://YOUR_UMAMI_HOST/script.js" data-website-id="YOUR_UMAMI_WEBSITE_ID"></script>
```

If you prefer, keep Cloudflare Web Analytics and skip Umami.

### Weekly traffic report script (Umami API)

Use `scripts/umami_report.py`:

```bash
UMAMI_BASE_URL="https://YOUR_UMAMI_HOST" \
UMAMI_API_KEY="YOUR_API_KEY" \
UMAMI_WEBSITE_ID="YOUR_WEBSITE_UUID" \
python3 scripts/umami_report.py
```

This writes `traffic_report.txt` in the project root.

### Uptime check script

```bash
python3 scripts/uptime_check.py
```

### Cron automation (macOS/Linux)

Run weekly report every Monday at 9am:

```bash
crontab -e
```

Add:

```cron
0 9 * * 1 cd "/Volumes/HomeX/joemini/Projects/Punkeye Pictures web Site" && UMAMI_BASE_URL="https://YOUR_UMAMI_HOST" UMAMI_API_KEY="YOUR_API_KEY" UMAMI_WEBSITE_ID="YOUR_WEBSITE_UUID" /usr/bin/python3 scripts/umami_report.py >> traffic_cron.log 2>&1
```
