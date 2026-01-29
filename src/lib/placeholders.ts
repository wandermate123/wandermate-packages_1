/**
 * Stock/placeholder image URLs for packages, banners, and galleries.
 * Uses Unsplash (free to use, no key required for hotlinking).
 * Replace with your own images later.
 */

const unsplash = (id: string, w = 800, h = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

// Package card thumbnail & gallery (smaller sizes for faster load)
export const PLACEHOLDER_IMAGES = {
  /** Default when no package image is set */
  packageCard: unsplash('1544551763-46a013bb70d5', 400, 250),
  /** Gallery slides - travel / India themed */
  gallery: [
    unsplash('1544551763-46a013bb70d5', 800, 450),
    unsplash('1578662996442-48f60103fc96', 800, 450),
    unsplash('1506905925346-21bda4d32df4', 800, 450),
    unsplash('1526481280693-3bfa7568e0f3', 800, 450),
    unsplash('1469476398021-4f928f43d684', 800, 450),
  ],
  /** Single image when gallery is empty */
  packageHero: unsplash('1544551763-46a013bb70d5', 800, 450),
  /** Itinerary day image fallback */
  itineraryDay: unsplash('1506905925346-21bda4d32df4', 600, 300),
} as const;

// Banner / hero slides (wider aspect, moderate size for faster load)
export const BANNER_IMAGES = [
  unsplash('1544551763-46a013bb70d5', 1200, 400),
  unsplash('1578662996442-48f60103fc96', 1200, 400),
  unsplash('1506905925346-21bda4d32df4', 1200, 400),
] as const;

/** Get first valid image URL or placeholder for package card */
export function getPackageCardImage(images?: string[]): string {
  const first = images?.[0];
  if (first && isValidImageUrl(first)) return first;
  return PLACEHOLDER_IMAGES.packageCard;
}

/** Get gallery array: use package images if any, else stock gallery */
export function getPackageGallery(images?: string[]): string[] {
  const valid = (images || []).filter(isValidImageUrl);
  if (valid.length > 0) return valid;
  return [...PLACEHOLDER_IMAGES.gallery];
}

/** Get single hero image or placeholder */
export function getPackageHeroImage(images?: string[]): string {
  const first = images?.[0];
  if (first && isValidImageUrl(first)) return first;
  return PLACEHOLDER_IMAGES.packageHero;
}

function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const t = url.trim().toLowerCase();
  return t.startsWith('http://') || t.startsWith('https://');
}
