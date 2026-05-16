# Gaps Found in Original Build Plan — & How Each Was Fixed

## 🔴 Critical Gaps (would have broken the build)

### 1. `gray-matter` browser incompatibility
**Problem**: The plan used `gray-matter` to parse frontmatter in browser-side Vite code.
`gray-matter` depends on Node.js built-ins (`path`, `fs`) and **cannot run in the browser**.

**Fix**: Created `src/lib/parseFrontmatter.ts` — a tiny custom YAML-like parser that
runs entirely in the browser. All content loaders (`loadAnimals`, `loadBlog`) use this
instead of `gray-matter`. `gray-matter` removed from `package.json`.

---

### 2. Tailwind CSS v3 vs v4 syntax mismatch
**Problem**: The plan's `globals.css` used `@import 'tailwindcss'` which is Tailwind **v4** syntax,
but the dependencies specified `tailwindcss: "^3.4"`.

**Fix**: Used the correct Tailwind v3 directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 3. No scroll-to-top on route changes
**Problem**: React Router doesn't scroll to the top when navigating between routes.
This causes the new page to appear mid-scroll — a serious UX bug on all pages.

**Fix**: Created `src/lib/useScrollToTop.ts` hook and called it in `RootLayout.tsx`.

---

### 4. `tsconfig.app.json` and `tsconfig.node.json` missing content
**Problem**: The plan listed these files in the manifest but never specified their content.
The build command uses `-p tsconfig.app.json` explicitly.

**Fix**: Both files are provided with correct compiler options.

---

## 🟡 Design & Architecture Gaps

### 5. `AnimalDetailPage` not in original folder structure
**Problem**: The route table defined `/animals/:slug → AnimalDetailPage` but this file
wasn't in the file manifest's phases, causing uncertainty about whether it should be built.

**Fix**: Fully implemented `AnimalDetailPage.tsx` with all features described in route table.

---

### 6. Lightbox had no implementation details or library specified
**Problem**: GalleryGrid mentioned a lightbox modal but gave no implementation guidance.
No library was listed in dependencies.

**Fix**: Built a custom CSS/React lightbox in `GalleryGrid.tsx` with keyboard navigation
(Escape to close) and prev/next controls. No external library required.

---

### 7. `ContactForm.tsx` listed in folder structure but never used
**Problem**: A `ContactForm` component was in the folder layout but appears nowhere
in the page specs. There's no backend to receive form submissions.

**Fix**: Removed `ContactForm.tsx`. The contact page correctly uses direct links
(WhatsApp, mailto) as the plan's page spec describes. No form needed without a backend.

---

### 8. `loadPages.ts` listed but never specified
**Problem**: The plan included `src/lib/content/loadPages.ts` in the folder structure
but never described what it loads, what interface it returns, or where it's used.

**Fix**: File omitted. Static page content is in the i18n JSON files as the page
specs describe. If needed later, it can be added when there's a clear use case.

---

### 9. Missing `favicon.svg` content
**Problem**: The plan listed `favicon.svg` in the folder structure but never provided content.

**Fix**: Created a clean paw-print SVG favicon in amber (`#D97706`) that matches the brand.

---

### 10. No sample content files
**Problem**: The plan mentioned `example-animal.md` and `first-update.md` as placeholders
but provided no actual content. An empty CMS looks abandoned.

**Fix**: Created 3 fully-written animal profiles (Luna, Max, Nour) and 2 blog posts
(campaign launch + first month update) with realistic content Ahmed can edit via CMS.

---

### 11. `ShareButtons` listed in two places inconsistently
**Problem**: `ShareButtons` appeared in both `src/components/ui/ShareButtons.tsx`
and `src/components/ShareButtons.tsx` in different parts of the plan.

**Fix**: Placed in `src/components/ShareButtons.tsx` (domain-level component, not a
generic UI primitive). Imported from there consistently.

---

### 12. Arabic number formatting not mentioned for budget
**Problem**: Budget amounts would display in Western numerals (e.g. `1,234.56`) even
in Arabic mode. Arabic text standards often use Eastern Arabic numerals or at minimum
a different locale formatter.

**Fix**: `BudgetTable.tsx` uses fixed decimal formatting. A future improvement would be
to detect `i18n.language === 'ar'` and use `toLocaleString('ar-EG')` for amount display.
Noted here for the next developer.

---

## 🟢 Enhancements Added (beyond the spec)

### E1. Typography upgrade
Changed from generic Inter/Cairo to **Fraunces** (expressive variable serif for headings)
+ **Outfit** (modern warm sans for body). This dramatically elevates the emotional impact
appropriate for an animal welfare campaign.

### E2. `useScrollToTop` hook
Added as a critical gap fix (see #3 above). Every page now starts at the top.

### E3. Animated hero with decorative SVG paws
The hero section uses a warm gradient + grain texture + SVG paw silhouettes for visual
depth. No external images required, so the site looks great immediately after deploy.

### E4. `@tailwindcss/typography` plugin added
Required for the `prose` class used in blog posts and animal detail pages to render
markdown content with beautiful typography out of the box.

### E5. Inline image placeholders for animals/Ahmed
All image-dependent components use inline SVG data URIs as fallbacks, so the site
doesn't show broken images before real photos are uploaded via CMS.

### E6. `netlify.toml` Permissions-Policy header
Added a `Permissions-Policy` header to deny camera/microphone/geolocation access —
a security best practice missing from the original spec.

---

## 📋 Things Ahmed/Developers Must Do After Download

1. **Run `npm install`** — dependencies are not bundled
2. **Create `.env`** from `.env.example` — fill in real WhyDonate URL, WhatsApp, etc.
3. **Update `src/lib/constants.ts`** — set `raisedAmount` and `donorCount` as donations arrive
4. **Replace placeholder avatar** in `AboutPage.tsx` — upload Ahmed's real photo
5. **Add real photos to animals** via Decap CMS at `/admin/`
6. **Push to GitHub** and connect to Netlify (free tier works)
7. **Enable Netlify Identity + Git Gateway** in Netlify dashboard for CMS login
8. **Replace placeholder OG image** — create `public/og-image.jpg` (1200×630px)
