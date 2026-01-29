# How to Add Images to Your Website

This project uses images in three main places:

| Where | What | Source |
|-------|------|--------|
| **Homepage banner** | Hero slideshow | `BANNER_IMAGES` in `src/lib/placeholders.ts` |
| **Package cards** (packages list) | Card thumbnail | Package `images[0]` or placeholder |
| **Package detail page** | Gallery slideshow + itinerary day images | Package `images[]` or placeholders |

You can add images in two ways: **static files** (your own files) or **URLs** (hosted elsewhere).

---

## Option 1: Static Images (Your Own Files)

Best for: logos, hero images, fixed assets that you store in the repo.

### Step 1: Put files in `public/`

All files inside `public/` are served from the site root.

```
PACK12/
  public/
    images/           ← create this folder (optional but tidy)
      hero-1.jpg
      hero-2.jpg
      logo.png
      packages/
        varanasi-tour.jpg
```

### Step 2: Use the path from the root

Reference them **without** the word `public` — paths start with `/`.

- File: `public/images/hero-1.jpg`  
- Use in code: **`/images/hero-1.jpg`**

### Step 3: Use in components

**With Next.js `Image` (recommended — auto optimization):**

```tsx
import Image from 'next/image';

// With known dimensions (better for layout)
<Image
  src="/images/hero-1.jpg"
  alt="Hero"
  width={1200}
  height={400}
  className="..."
/>

// Or fill a container (like your PackageCard)
<div className="relative h-64 w-full">
  <Image
    src="/images/hero-1.jpg"
    alt="Hero"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 1200px"
  />
</div>
```

**With plain `<img>` (e.g. in slideshows):**

```tsx
<img src="/images/hero-1.jpg" alt="Hero" className="..." />
```

### Using static images in this project

- **Banner:** Edit `src/lib/placeholders.ts` and set `BANNER_IMAGES` to your paths:
  ```ts
  export const BANNER_IMAGES = [
    '/images/hero-1.jpg',
    '/images/hero-2.jpg',
    '/images/hero-3.jpg',
  ] as const;
  ```
- **Package images:** Use URLs like `'/images/packages/varanasi-tour.jpg'` in your package data (e.g. in API/DB or `src/data/packages.ts` as `images: ['/images/packages/varanasi-tour.jpg']`).

---

## Option 2: Remote URLs (Hosted Elsewhere)

Best for: images on a CDN, Supabase Storage, S3, or any `https://` URL.

Your app already supports this: package `images` are an array of strings (URLs).  
`next.config.js` allows all `https` hosts for the Next.js Image component.

### Where to set the URLs

1. **Placeholders / defaults**  
   Edit `src/lib/placeholders.ts`:
   - `PLACEHOLDER_IMAGES.packageCard` — default card image
   - `PLACEHOLDER_IMAGES.gallery` — default gallery when a package has no images
   - `BANNER_IMAGES` — homepage banner slides

2. **Per-package images**  
   Set when creating/editing a package (API or DB):
   - `images: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg']`
   - First URL = card thumbnail and main hero; rest = gallery and slideshow.

3. **Itinerary day image**  
   In the itinerary object: `image: 'https://...'` (see `ItineraryDay` in `src/types/package.ts`).

### Example: New Unsplash image

In `placeholders.ts`, the helper is:

```ts
const unsplash = (id: string, w = 800, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;
```

Use any Unsplash photo ID in the URL (e.g. from the image’s URL on unsplash.com).  
Example: `unsplash('1544551763-46a013bb70d5', 400, 250)`.

---

## Quick Reference

| Goal | Action |
|------|--------|
| Use your own image file | Put it in `public/` (e.g. `public/images/hero.jpg`) and use `src="/images/hero.jpg"`. |
| Change homepage banner | Edit `BANNER_IMAGES` in `src/lib/placeholders.ts`. |
| Set package card/detail images | Set package `images: ['url1', 'url2']` in your data/API; first URL = card + hero, all = gallery. |
| Fallback when package has no images | Edit `PLACEHOLDER_IMAGES` in `src/lib/placeholders.ts`. |
| Next.js Image with external URL | Already allowed for `https` in `next.config.js`; use `<Image src={url} ... />` as in `PackageCard`. |

---

## Image Sizes (recommendations)

- **Package card:** ~400×250 px (or similar aspect ratio).
- **Banner:** ~1200×400 px (wide).
- **Gallery / hero on detail page:** ~800×450 px.
- **Itinerary day:** ~600×300 px.

Next.js `Image` will optimize and serve modern formats; `sizes` on `<Image>` (as in `PackageCard`) helps the browser pick the right width.

---

## If You Add Uploads Later (e.g. Supabase Storage)

1. Upload file to your storage and get a **public URL**.
2. Save that URL in the database (e.g. `Package.images` or itinerary `image`).
3. Use that URL exactly like any other remote URL above; no code change needed in the components that already accept `images` or `image` URLs.
