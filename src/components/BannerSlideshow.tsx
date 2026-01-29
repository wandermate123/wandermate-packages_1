'use client';

import { useState, useEffect } from 'react';
import { BANNER_IMAGES } from '../lib/placeholders';

interface BannerSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface BannerSlideshowProps {
  slides?: BannerSlide[];
}

const defaultSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Discover Authentic Varanasi',
    subtitle: 'Experience the Spiritual Capital',
    description: 'Raw. Real. Unfiltered. Journey through the heart of ancient India.',
    image: BANNER_IMAGES[0],
    ctaText: 'Explore Packages',
    ctaLink: '/packages?category=varanasi-budget',
  },
  {
    id: '2',
    title: 'Premium Luxury Travel',
    subtitle: 'WanderMate Elite Experience',
    description: 'Indulge in world-class hospitality with exclusive access to spiritual ceremonies.',
    image: BANNER_IMAGES[1],
    ctaText: 'View Premium Packages',
    ctaLink: '/packages?category=varanasi-premium',
  },
  {
    id: '3',
    title: 'Spiritual Triangle Tour',
    subtitle: 'Varanasi • Ayodhya • Prayagraj',
    description: 'Complete your spiritual journey through India\'s most sacred cities.',
    image: BANNER_IMAGES[2],
    ctaText: 'Discover More',
    ctaLink: '/packages?category=spiritual-triangle',
  },
];

export default function BannerSlideshow({ slides = defaultSlides }: BannerSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            {slide.image && (
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                aria-hidden
              />
            )}
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />
            
            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center text-white">
                {slide.subtitle && (
                  <p className="text-xs md:text-sm font-medium text-gray-300 mb-1.5 tracking-wider uppercase">
                    {slide.subtitle}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-3 tracking-tight">
                  {slide.title}
                </h2>
                {slide.description && (
                  <p className="text-sm md:text-base text-gray-300 mb-5 max-w-2xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                )}
                {slide.ctaText && (
                  <a
                    href={slide.ctaLink || '#'}
                    className="inline-block px-6 py-2.5 bg-white text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div
            key={currentSlide}
            className="h-full bg-white"
            style={{
              width: '100%',
              animation: 'progress 5s linear forwards',
            }}
          />
        </div>
      )}
    </div>
  );
}
