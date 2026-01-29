'use client';

export default function PackageDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-5 bg-gray-100 rounded w-1/4 mb-4" />
          <div className="flex gap-4">
            <div className="h-9 bg-gray-100 rounded w-24" />
            <div className="h-9 bg-gray-100 rounded w-28" />
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-96 md:h-[500px] w-full bg-gray-200 rounded-2xl" />
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-4/5" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-32 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
