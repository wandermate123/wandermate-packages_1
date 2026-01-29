'use client';

import { useState } from 'react';
import { getPackageGallery, PLACEHOLDER_IMAGES } from '../lib/placeholders';

interface ImageSlideshowProps {
  images?: string[];
}

export default function ImageSlideshow({ images = [] }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  const displayImages = getPackageGallery(images);
  const currentUrl = displayImages[currentIndex];
  const fallbackUrl = PLACEHOLDER_IMAGES.packageHero;

  const handleImageError = () => {
    if (currentUrl) setFailedUrls((prev) => new Set(prev).add(currentUrl));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const imageToShow = failedUrls.has(currentUrl) ? fallbackUrl : currentUrl;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] w-full">
        <img
          src={imageToShow}
          alt={`Package view ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
          onError={handleImageError}
        />

        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all z-10"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-all z-10"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 p-4 bg-gray-50 overflow-x-auto">
          {displayImages.map((url, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={failedUrls.has(url) ? fallbackUrl : url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
