# Analytics Setup (No-Cost)

This site now supports:

1. **Cloudflare Web Analytics** for simple traffic trends (already embedded).
2. **Optional Umami** for richer event-level analytics (CTA clicks, scroll depth, referrer attribution).

---

## Cloudflare Web Analytics (already active)

The Cloudflare beacon script is already present on all pages. No further code changes are required if you only want baseline analytics.

Use this for:
- total visits/pageviews
- top pages
- quick trend checks

---

## Umami (optional, richer detail)

The site includes a loader at:
- `js/analytics-loader.js`

To enable Umami:
1. Open `js/analytics-loader.js`
2. Set:
   - `umamiHost` (for example `https://umami.yourdomain.com`)
   - `websiteId` (UUID from Umami)
3. Deploy

Once enabled, site events are tracked from `js/main.js`:
- `intro_call_click`
- `contact_click`
- `email_click`
- `outbound_click`
- `scroll_50`
- `scroll_90`

The site also stores first-touch UTM/ref values in localStorage and includes them with events.

---

## Weekly traffic report (Umami API)

Use:
- `scripts/umami_report.py`

Example:

```bash
UMAMI_BASE_URL="https://YOUR_UMAMI_HOST" \
UMAMI_API_KEY="YOUR_API_KEY" \
UMAMI_WEBSITE_ID="YOUR_WEBSITE_UUID" \
python3 scripts/umami_report.py
```

Output:
- `traffic_report.txt` in project root

---

## Cron automation (macOS/Linux)

Run weekly report every Monday at 9am:

```cron
0 9 * * 1 cd "/Volumes/HomeX/joemini/Projects/Punkeye Pictures web Site" && UMAMI_BASE_URL="https://YOUR_UMAMI_HOST" UMAMI_API_KEY="YOUR_API_KEY" UMAMI_WEBSITE_ID="YOUR_WEBSITE_UUID" /usr/bin/python3 scripts/umami_report.py >> traffic_cron.log 2>&1
```

---

## Recommendation

If you want detailed analytics without paying:
- keep Cloudflare for baseline traffic
- run self-hosted Umami (or equivalent) and enable the loader above for event-level detail
