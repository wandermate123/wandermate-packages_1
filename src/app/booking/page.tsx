'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '../../lib/api-client';

function BookingLookupContent() {
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get('ref') ?? '';

  const [bookingId, setBookingId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (refFromUrl) setBookingId(refFromUrl);
  }, [refFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBooking(null);
    const id = bookingId.trim();
    const emailVal = email.trim();
    if (!id || !emailVal) {
      setError('Please enter your booking reference and email.');
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.getBooking(id, emailVal);
      setBooking(response?.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Booking not found or access denied. Please check your reference and email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
            ← Back to home
          </Link>
          <h1 className="text-lg font-medium text-gray-900">View your booking</h1>
          <span className="w-16" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-light text-gray-900">Look up your booking</h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the booking reference from your confirmation and the email you used to book.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="bookingId" className="block text-sm font-medium text-gray-900 mb-2">
                Booking reference
              </label>
              <input
                id="bookingId"
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g. clxyz..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Looking up...
                </>
              ) : (
                'View booking'
              )}
            </button>
          </form>
        </div>

        {/* Booking result */}
        {booking && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-green-50">
              <p className="text-sm font-medium text-green-800">Booking found</p>
              <p className="text-xs text-green-700 mt-1">Reference: {booking.id}</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{booking.package?.name}</h3>
                <p className="text-sm text-gray-600">{booking.package?.destination} · {booking.package?.duration}</p>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">Travelers</dt>
                  <dd className="font-medium text-gray-900">{booking.numberOfPeople}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Start date</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">End date</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Total amount</dt>
                  <dd className="font-medium text-gray-900">₹{Number(booking.totalPrice).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Status</dt>
                  <dd className="font-medium text-gray-900 capitalize">{booking.status?.toLowerCase()}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Payment</dt>
                  <dd className="font-medium text-gray-900 capitalize">{booking.paymentStatus?.toLowerCase()}</dd>
                </div>
              </dl>
              {booking.specialRequests && (
                <div>
                  <dt className="text-gray-500 text-sm mb-1">Special requests</dt>
                  <dd className="text-gray-900 text-sm">{booking.specialRequests}</dd>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    }>
      <BookingLookupContent />
    </Suspense>
  );
}
