'use client';

import Link from 'next/link';
import { Package } from '@/types/package';

interface PackageCardProps {
  package: Package;
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <Link href={`/packages/${pkg.id}`} className="group cursor-pointer block">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Image</span>
          </div>
          
          {/* Badge */}
          {pkg.featured && (
            <div className="absolute top-4 right-4 z-20 bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-900">
              Featured
            </div>
          )}

          {/* Destination */}
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-white text-xl font-semibold mb-1">{pkg.destination}</h3>
            <p className="text-white/90 text-sm">{pkg.duration}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {pkg.name}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {pkg.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {pkg.highlights.slice(0, 2).map((highlight, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-2xl font-light text-gray-900">₹{pkg.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">per person</span>
            </div>
            <div className="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
