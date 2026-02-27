# Deploy Punkeye Pictures to Cloudflare Pages

Two options: **Direct Upload** (simplest) or **Git + Auto-Deploy** (for easy updates).

---

## Option A: Direct Upload (no Git)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. Name the project: `punkeye-pictures`
3. Drag and drop the entire `Punkeye Pictures web Site` folder (or create a zip of: index.html, about.html, what-we-do.html, contact.html, css/, js/)
4. Deploy. You'll get a URL like `punkeye-pictures.pages.dev`
5. **Add custom domain:** Project → **Custom domains** → **Set up a custom domain** → enter `www.punkeypictures.com`
6. Cloudflare will show DNS instructions. If your domain uses Cloudflare nameservers, it configures automatically. Otherwise, add the CNAME record they provide at your DNS provider.

---

## Option B: Git + Auto-Deploy (recommended for updates)

### 1. Push to GitHub

```bash
cd "/Volumes/HomeX/joemini/Projects/Punkeye Pictures web Site"
git init
git add .
git commit -m "Initial commit"
```

Create a new repo at [github.com/new](https://github.com/new) (e.g. `punkeye-pictures`). Then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/punkeye-pictures.git
git branch -M main
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize GitHub, select `punkeye-pictures`
3. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (or `.`)
4. Deploy. You'll get `punkeye-pictures.pages.dev`

### 3. Add custom domain

1. Pages project → **Custom domains** → **Set up a custom domain**
2. Enter: `www.punkeypictures.com`
3. If punkeypictures.com is on Cloudflare: it configures DNS automatically
4. If not: add the CNAME record Cloudflare shows at your current DNS provider

### 4. Root domain (optional)

To have `punkeypictures.com` (without www) also work:
- Add `punkeypictures.com` as a second custom domain in Cloudflare Pages
- Cloudflare will set up redirect from root to www, or serve both

---

## Domain DNS (if not already on Cloudflare)

If your domain is at another registrar (GoDaddy, Namecheap, etc.):

**Option 1 – Use Cloudflare nameservers (recommended)**  
1. Add the site in Cloudflare: **Websites** → **Add a site** → enter punkeypictures.com  
2. Cloudflare gives you two nameservers (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`)  
3. At your registrar, change the domain's nameservers to those two  
4. After DNS propagates, add the custom domain in Pages as above  

**Option 2 – Keep current DNS**  
Add a CNAME record at your current provider:
- **Name:** `www`
- **Target:** `punkeye-pictures.pages.dev` (or the exact value Cloudflare gives you)
