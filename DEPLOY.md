# Deploy Hurghada Animal Shelter to Netlify

> **Status:** Build verified ✅ (v1.0.0 — 10 May 2026)
> **GitHub repo:** `https://github.com/aet247/Hurghada-Animal-Shelter-campaign-website`
> **Expected URL:** `https://hurghada-animal-shelter.netlify.app`

---

## Option 1: Deploy via Netlify CLI (if you have it authenticated)

```bash
# Install CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to production
netlify deploy --prod --dir=dist
```

---

## Option 2: Deploy via Netlify Dashboard (recommended for first-time setup)

### Step 1 — Create Netlify Site

1. Go to **[https://app.netlify.com/](https://app.netlify.com/)** and log in (or sign up — GitHub OAuth is the easiest)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select the repository: **`aet247/Hurghada-Animal-Shelter-campaign-website`**

### Step 2 — Configure Build Settings

The `netlify.toml` at the project root will auto-detect these settings — verify they match:

| Field | Value |
|---|---|
| **Base directory** | (leave blank) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

> **What the build does:** runs `node scripts/generate-sitemap.mjs && tsc --noEmit && vite build`
> This generates a `sitemap.xml`, type-checks with TypeScript, and creates a production bundle in `dist/`.

### Step 3 — Add Environment Variables

In **Site settings** → **Environment variables** → **Add variable**, add these **6 variables** (use the **"Import from .env"** option or add manually):

| Key | Value (use real values, not placeholders) | Example |
|---|---|---|
| `VITE_WHYDONATE_URL` | WhyDonate campaign URL | `https://whydonate.com/...` |
| `VITE_WHYDONATE_GOAL` | Fundraising goal amount | `5000` |
| `VITE_CAMPAIGN_EMAIL` | Campaign contact email | `ahmed@hurghada-animals.org` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number (with country code) | `+201234567890` |
| `VITE_INSTAGRAM_URL` | Instagram profile URL | `https://instagram.com/hurghada_animal_shelter` |
| `VITE_FACEBOOK_URL` | Facebook page URL | `https://facebook.com/hurghada.animal.shelter` |
| `VITE_SITE_URL` | Deployed site URL | `https://hurghada-animal-shelter.netlify.app` |

> **⚠️ Important:** Replace the example values with the actual campaign details.
> The `.env.example` file in the repo has placeholder values for reference.

### Step 4 — Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~1–2 minutes)
3. Netlify assigns the URL: **`https://hurghada-animal-shelter.netlify.app`**
4. (Optional) Set up a custom domain in **Site settings** → **Domain management**

---

## Post-Deploy: Enable Netlify Identity (for Decap CMS)

After the site is deployed, enable admin access via Netlify Identity:

1. In the Netlify dashboard for your site, go to **Site settings** → **Identity**
2. Click **"Enable Identity"**
3. Under **"Registration preferences"**, select **"Invite only"**
4. Under **"Services"**, click **"Enable Git Gateway"** (this allows Decap CMS to commit content changes back to GitHub)

### Invite Editors

1. In **Identity** → **"Invite users"**
2. Enter the email addresses of content editors
3. They will receive an invite email with a link to set their password
4. Editors can log in at: **`https://hurghada-animal-shelter.netlify.app/admin/`**

---

## Site Configuration Summary

### `netlify.toml` (already configured)

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_VERSION = "20"
```

### Included assets (all pre-configured)
- **`robots.txt`** — allows all crawlers, points to sitemap
- **`sitemap.xml`** — auto-generated on build, covers all 7 pages
- **`og-image.svg`** — Open Graph share image
- **`favicon.svg`** — SVG favicon
- **`_redirects`** — SPA fallback redirect (matches `netlify.toml`)
- **Netlify Identity widget** — included in `index.html` for CMS auth

---

## Post-Deploy Verification Checklist

- [ ] Site loads at `https://hurghada-animal-shelter.netlify.app/`
- [ ] All routes work (SPA redirect) — `/about`, `/animals`, `/budget`, `/blog`, `/gallery`, `/get-involved`, `/contact`
- [ ] Open Graph preview works (share URL to test)
- [ ] Environment variables are set and visible on the live site
- [ ] Roboto font loads correctly
- [ ] Arabic language toggle works (if implemented)
- [ ] Netlify Identity login works at `/admin/`
- [ ] `https://hurghada-animal-shelter.netlify.app/sitemap.xml` returns valid XML
- [ ] `https://hurghada-animal-shelter.netlify.app/robots.txt` returns correctly
- [ ] Security headers are present (check via browser DevTools → Network tab)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails on Netlify | Check the deploy log — likely a missing env var or Node version mismatch |
| 404 on page refresh | SPA redirect misconfigured — verify `[[redirects]]` in `netlify.toml` |
| CMS login redirect loop | Netlify Identity must be enabled and Git Gateway active |
| Images not loading | Check `VITE_SITE_URL` is set correctly, images use absolute paths |
| TypeScript errors | Run `npm run typecheck` locally to check for TS issues before pushing |
| Build taking too long | Node 20 is set in `netlify.toml`; the build should complete in <2 min |

---

*Generated on 10 May 2026 — Build verified and ready for deployment.*
