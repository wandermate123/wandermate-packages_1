import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          Travel Agency
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome to our modern travel platform
        </p>
        <Link
          href="/packages"
          className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          View Packages
        </Link>
      </div>
    </div>
  );
}
