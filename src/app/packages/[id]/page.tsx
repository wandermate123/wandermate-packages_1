'use client';

import { useParams } from 'next/navigation';
import { Package } from '@/types/package';
import Link from 'next/link';
import ImageSlideshow from '@/components/ImageSlideshow';
import BookingModal from '@/components/BookingModal';
import PackageCard from '@/components/PackageCard';
import { apiClient } from '@/lib/api-client';
import { useState, useEffect } from 'react';

// Map database category to frontend category
function mapCategoryToFrontend(category: string): string {
  switch (category) {
    case 'VARANASI_BUDGET':
      return 'varanasi-budget';
    case 'VARANASI_PREMIUM':
      return 'varanasi-premium';
    case 'SPIRITUAL_TRIANGLE':
      return 'spiritual-triangle';
    default:
      return category.toLowerCase();
  }
}

export default function PackageDetailPage() {
  const params = useParams();
  const packageId = params.id as string;
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [similarPackages, setSimilarPackages] = useState<Package[]>([]);

  useEffect(() => {
    async function fetchPackage() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.getPackage(packageId);
        
        // Transform API data to match frontend Package type
        const transformedPackage: Package = {
          ...response.data,
          category: mapCategoryToFrontend(response.data.category),
          highlights: response.data.highlights || [],
          images: response.data.images || [],
          itinerary: response.data.itinerary || [],
          inclusions: response.data.inclusions || [],
          exclusions: response.data.exclusions || [],
          reviews: response.data.reviews || [],
          faqs: response.data.faqs || [],
          terms: response.data.terms || null,
          mapLocation: response.data.mapLocation || null,
        };

        setPkg(transformedPackage);

        // Fetch similar packages
        const similarResponse = await apiClient.getPackages({
          category: response.data.category,
          limit: 3,
        });

        const transformedSimilar = similarResponse.data
          .filter((p: any) => p.id !== packageId)
          .slice(0, 3)
          .map((p: any) => ({
            ...p,
            category: mapCategoryToFrontend(p.category),
            highlights: p.highlights || [],
            images: p.images || [],
          }));

        setSimilarPackages(transformedSimilar);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load package');
        console.error('Error fetching package:', err);
      } finally {
        setLoading(false);
      }
    }

    if (packageId) {
      fetchPackage();
    }
  }, [packageId]);

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this amazing travel package: ${pkg?.name} - ${pkg?.description}`;

  const handleShare = async (platform: string) => {
    const url = shareUrl;
    const text = shareText;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(url);
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 2000);
        }
        break;
      case 'native':
        if ('share' in navigator && navigator.share) {
          try {
            await navigator.share({
              title: pkg?.name,
              text: text,
              url: url,
            });
          } catch (err) {
            // User cancelled or error occurred
          }
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-500">Loading package...</p>
        </div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            {error || 'Package Not Found'}
          </h1>
          <Link
            href="/packages"
            className="text-gray-600 hover:text-gray-900 text-sm underline"
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/packages"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2">
                {pkg.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{pkg.duration}</span>
                </div>
              </div>
            </div>
            {pkg.featured && (
              <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar - Booking Card - Hidden on mobile, shown on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-light text-gray-900">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-sm">per person</span>
                  </div>
                  <p className="text-sm text-gray-500">All taxes included</p>
                </div>

                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
                >
                  Book Now
                </button>

                <button className="w-full border border-gray-300 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Contact Us
                </button>
              </div>

              {/* Why Choose Us Section */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Best Price Guarantee</h4>
                      <p className="text-sm text-gray-600">We ensure you get the best rates for your travel package</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">24/7 Customer Support</h4>
                      <p className="text-sm text-gray-600">Round-the-clock assistance for all your travel needs</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Flexible Cancellation</h4>
                      <p className="text-sm text-gray-600">Easy cancellation and refund policies for your peace of mind</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Trusted & Verified</h4>
                      <p className="text-sm text-gray-600">Authentic experiences with verified local partners</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
            {/* Image Slideshow */}
            <ImageSlideshow images={pkg.images} />

            {/* Description */}
            <section>
              <h2 className="text-xl font-medium text-gray-900 mb-4">About This Package</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {pkg.description}
              </p>
            </section>

            {/* Share Package - Minimalist */}
            <section className="border-t border-gray-100 pt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-gray-900">Share This Package</h2>
                <div className="relative">
                  {/* Share Icon Button */}
                  {typeof window !== 'undefined' && 'share' in navigator ? (
                    <button
                      onClick={() => handleShare('native')}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                      aria-label="Share"
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                        aria-label="Share"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      {/* Share Menu Dropdown */}
                      {showShareMenu && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowShareMenu(false)}
                          />
                          <div className="absolute right-0 top-12 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[160px]">
                            <button
                              onClick={() => {
                                handleShare('whatsapp');
                                setShowShareMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                              <span className="text-sm text-gray-700">WhatsApp</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare('facebook');
                                setShowShareMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                              </svg>
                              <span className="text-sm text-gray-700">Facebook</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare('twitter');
                                setShowShareMenu(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <span className="text-sm text-gray-700">Twitter</span>
                            </button>
                            <button
                              onClick={() => {
                                handleShare('copy');
                                setShowShareMenu(false);
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                linkCopied ? 'bg-green-50' : 'hover:bg-gray-50'
                              }`}
                            >
                              {linkCopied ? (
                                <>
                                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-sm text-green-700">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-sm text-gray-700">Copy Link</span>
                                </>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <section>
                <h2 className="text-xl font-medium text-gray-900 mb-8">Day-Wise Itinerary</h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      {/* Timeline Line */}
                      {index < pkg.itinerary!.length - 1 && (
                        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
                      )}
                      
                      <div className="relative flex gap-6">
                        {/* Day Number Circle */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-lg relative z-10">
                            {day.day}
                          </div>
                        </div>
                        
                        {/* Day Content */}
                        <div className="flex-1 pb-6">
                          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  Day {day.day}
                                </h3>
                                <p className="text-base font-medium text-gray-700">
                                  {day.title}
                                </p>
                              </div>
                              <button
                                onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                                className="flex-shrink-0 ml-4 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label={expandedDay === day.day ? 'Collapse' : 'Expand'}
                              >
                                <svg
                                  className={`w-5 h-5 transition-transform ${
                                    expandedDay === day.day ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                            
                            {/* Show first activity as preview when collapsed */}
                            {expandedDay !== day.day && day.activities.length > 0 && (
                              <div className="pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-gray-400">•</span>
                                  <span>{day.activities[0]}</span>
                                </p>
                                {day.activities.length > 1 && (
                                  <button
                                    onClick={() => setExpandedDay(day.day)}
                                    className="text-sm text-gray-900 font-medium mt-2 hover:underline"
                                  >
                                    + {day.activities.length - 1} more activities
                                  </button>
                                )}
                              </div>
                            )}
                            
                            {/* Activities List - Expanded */}
                            {expandedDay === day.day && (
                              <div className="pt-4 border-t border-gray-100">
                                {/* Day Image - Only shown when expanded */}
                                {day.image && (
                                  <div className="mb-4 rounded-lg overflow-hidden">
                                    <img
                                      src={day.image}
                                      alt={`Day ${day.day} - ${day.title}`}
                                      className="w-full h-48 object-cover"
                                      onError={(e) => {
                                        // Fallback to placeholder if image fails to load
                                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=400&fit=crop&q=80`;
                                      }}
                                    />
                                  </div>
                                )}
                                <ul className="space-y-3">
                                  {day.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-gray-900" />
                                      </div>
                                      <span className="text-gray-700 leading-relaxed">{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            {(pkg.inclusions || pkg.exclusions) && (
              <section className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Inclusions & Exclusions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        What's Not Included
                      </h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700">
                            <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Map Integration */}
            {pkg.mapLocation && (
              <section className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Location</h2>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                    <a
                      href={`https://www.google.com/maps?q=${pkg.mapLocation.lat},${pkg.mapLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center hover:bg-gray-200/50 transition-colors cursor-pointer group"
                    >
                      <div className="text-center z-10">
                        <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium mb-1">View on Google Maps</p>
                        {pkg.mapLocation.address && (
                          <p className="text-gray-600 text-sm">{pkg.mapLocation.address}</p>
                        )}
                        <p className="text-gray-500 text-xs mt-2">Click to open interactive map</p>
                      </div>
                    </a>
                    {/* Decorative map grid pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Reviews & Testimonials */}
            {pkg.reviews && pkg.reviews.length > 0 && (
              <section className="border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-gray-900">Reviews & Testimonials</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({pkg.reviews.length} reviews)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {pkg.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-medium">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900">{review.name}</h4>
                              {review.verified && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Verified</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            {pkg.faqs && pkg.faqs.length > 0 && (
              <section className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {pkg.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-base font-medium text-gray-900 pr-4">{faq.question}</h3>
                        <svg
                          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                            expandedFAQ === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedFAQ === index && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Terms & Conditions */}
            {pkg.terms && (
              <section className="border-t border-gray-100 pt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Terms & Conditions</h2>
                <div className="space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  {pkg.terms.cancellation && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cancellation Policy
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{pkg.terms.cancellation}</p>
                    </div>
                  )}
                  {pkg.terms.refund && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Refund Policy
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{pkg.terms.refund}</p>
                    </div>
                  )}
                  {pkg.terms.booking && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Booking Terms
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{pkg.terms.booking}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Additional Details */}
            <section className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Package Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {pkg.category.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-gray-900 font-medium">{pkg.duration}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Destination</span>
                  <span className="text-gray-900 font-medium">{pkg.destination}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Similar Packages */}
      {similarPackages.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-3">Similar Packages</h2>
              <p className="text-gray-600">Explore more options that might interest you</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPackages.map((similarPkg) => (
                <PackageCard key={similarPkg.id} package={similarPkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating Book Now Button - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-gray-900">₹{pkg.price.toLocaleString()}</span>
                <span className="text-gray-500 text-xs">per person</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">All taxes included</p>
            </div>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        package={pkg}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
