'use client';

import { useState, useEffect } from 'react';
import PackageCard from '../../components/PackageCard';
import BannerSlideshow from '../../components/BannerSlideshow';
import { apiClient } from '../../lib/api-client';
import { Package } from '../../types/package';

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

// Map frontend category to database category
function mapCategoryToDatabase(category: string): string {
  switch (category) {
    case 'varanasi-budget':
      return 'VARANASI_BUDGET';
    case 'varanasi-premium':
      return 'VARANASI_PREMIUM';
    case 'spiritual-triangle':
      return 'SPIRITUAL_TRIANGLE';
    default:
      return 'all';
  }
}

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const categories = [
    { value: 'all', label: 'All Packages' },
    { value: 'varanasi-budget', label: 'Varanasi Budget Package' },
    { value: 'varanasi-premium', label: 'Varanasi Premium Package' },
    { value: 'spiritual-triangle', label: 'Spiritual Triangle Package' },
  ];

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        setError(null);
        
        const category = mapCategoryToDatabase(selectedCategory);
        const response = await apiClient.getPackages({
          category: category === 'all' ? undefined : category,
          search: debouncedSearch || undefined,
        });

        // Transform API data to match frontend Package type
        const transformedPackages = response.data.map((pkg: any) => ({
          ...pkg,
          category: mapCategoryToFrontend(pkg.category),
          // Ensure all optional fields are present
          highlights: pkg.highlights || [],
          images: pkg.images || [],
          itinerary: pkg.itinerary || [],
          inclusions: pkg.inclusions || [],
          exclusions: pkg.exclusions || [],
          reviews: pkg.reviews || [],
          faqs: pkg.faqs || [],
          terms: pkg.terms || null,
          mapLocation: pkg.mapLocation || null,
        }));

        setPackages(transformedPackages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load packages');
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, [selectedCategory, debouncedSearch]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-light text-gray-900 tracking-tight">
            Wandermate Packages
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Curated travel experiences for the modern explorer
          </p>
        </div>
      </header>

      {/* Banner Slideshow */}
      <BannerSlideshow />

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-gray-500 mt-4">Loading packages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg mb-2">Error loading packages</p>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No packages found</p>
          </div>
        )}
      </section>
    </div>
  );
}
