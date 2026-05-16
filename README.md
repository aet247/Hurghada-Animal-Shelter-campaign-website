# Hurghada Animal Shelter — Campaign Website

> **Campaign**: Building a shelter for stray animals in Hurghada, Egypt
> **Organiser**: Ahmed Fathi (lawyer)
> **Tech Stack**: Vite + React 18 + TypeScript + Tailwind CSS + React Router
> **CMS**: Decap CMS (Netlify Identity)
> **Hosting**: Netlify (free static deploy)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Environment Variables

Edit `.env` (never commit this file):

| Variable | Description |
|----------|-------------|
| `VITE_WHYDONATE_URL` | Your WhyDonate campaign URL |
| `VITE_WHYDONATE_GOAL` | Fundraising goal in USD (e.g. `5000`) |
| `VITE_CAMPAIGN_EMAIL` | Ahmed's contact email |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number with country code |
| `VITE_INSTAGRAM_URL` | Full Instagram profile URL |
| `VITE_FACEBOOK_URL` | Full Facebook page URL |
| `VITE_SITE_URL` | Deployed site URL for SEO |

---

## Updating Campaign Progress

Edit `src/lib/constants.ts` to update the live stats:

```typescript
raisedAmount: 250,   // Current total raised in USD
donorCount:   12,    // Number of donors
animalsHelped: 15,   // Animals currently being cared for
```

---

## Content Management (CMS)

After deploying to Netlify:

1. Enable **Netlify Identity** in your Netlify dashboard
2. Enable **Git Gateway** (under Identity → Services)
3. Invite yourself as a user
4. Log in at `https://your-site.netlify.app/admin/`

From the CMS you can add/edit:
- **Animals** — name, age, gender, photo, story, needs
- **Blog posts** — updates about the campaign
- **Gallery** — photos and videos
- **Budget entries** — donations and expenses (with receipt uploads)

---

## Build & Deploy

```bash
# Type-check
npm run typecheck

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Netlify Deploy

1. Push to GitHub
2. In Netlify: **New site from Git** → select your repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add all `VITE_*` environment variables in Netlify dashboard

---

## Project Structure

```
src/
├── components/
│   ├── ui/          — Generic reusable components (Button, Card, Badge…)
│   ├── Layout/      — Header, Footer, MobileMenu, FloatingCTA
│   └── *.tsx        — Domain components (AnimalCard, BlogCard, etc.)
├── pages/           — One file per route
├── layouts/         — RootLayout (wraps all pages)
├── lib/
│   ├── i18n/        — English & Arabic translations
│   ├── content/     — CMS data loaders
│   ├── parseFrontmatter.ts  — Browser-safe markdown parser
│   ├── constants.ts — Campaign config (amounts, URLs)
│   ├── usePageMeta.ts
│   ├── useRTL.ts
│   └── useScrollToTop.ts
content/
├── animals/         — Animal markdown files
├── blog/            — Blog post markdown files
├── gallery.json     — Gallery items
└── budget.json      — Financial ledger
public/
└── admin/           — Decap CMS entry
```

---

## Languages

The site is fully bilingual English ↔ Arabic with RTL support.
Translation files: `src/lib/i18n/en.json` and `ar.json`.

The language preference is saved in localStorage and auto-detected from browser settings.

---

## Gaps Fixed from Original Plan

See `GAPS_ANALYSIS.md` for a full list of gaps found and how they were resolved.

---

## License

Built for the Hurghada Animal Shelter campaign. All rights reserved.
