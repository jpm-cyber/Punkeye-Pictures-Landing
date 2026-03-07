# Cloudflare Web Analytics Setup

The site already includes the Cloudflare Web Analytics beacon script. To start tracking visitors:

## 1. Get your token

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. In the left sidebar, click **Web Analytics** (under Analytics & Logs)
3. Click **Add a site**
4. Enter `punkeyepictures.com` (or `www.punkeyepictures.com` if that’s your canonical domain)
5. Complete verification (Cloudflare may auto-verify if the domain is already in your account)
6. Copy the token from the script snippet Cloudflare shows you (it looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## 2. Add the token to the site

Replace `YOUR_TOKEN` with your token in all four HTML files:

- `index.html`
- `about.html`
- `what-we-do.html`
- `contact.html`

Search for `"token": "YOUR_TOKEN"` and replace `YOUR_TOKEN` with your actual token.

## 3. Deploy

Push your changes and deploy. Data should appear in the Cloudflare Web Analytics dashboard within a few minutes.

---

**Note:** If your site is already proxied through Cloudflare (e.g. Cloudflare Pages), Web Analytics may be enabled by default. Check **Analytics & Logs → Web Analytics** in the dashboard to see if data is already being collected before adding the beacon.
