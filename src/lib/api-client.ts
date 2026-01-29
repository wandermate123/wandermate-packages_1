const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  error: string;
  message: string;
  details?: any;
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Use relative URL in browser, full URL only for server-side
    const isServer = typeof window === 'undefined';
    const url = isServer ? `${API_BASE_URL}${endpoint}` : endpoint;
    
    console.log('[API Client] Requesting:', url);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        const msg = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('[API Client] Error response:', response.status, errorData);
        throw new Error(
          response.status === 503
            ? 'Service temporarily unavailable. Please try again in a moment.'
            : msg
        );
      }

      const data = await response.json();
      console.log('[API Client] Success:', { endpoint, dataCount: Array.isArray(data.data) ? data.data.length : 'N/A' });
      return data;
    } catch (error) {
      console.error('[API Client] Request failed:', error);
      throw error;
    }
  }

  // Package methods
  async getPackages(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', String(params.featured));
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    return this.request(`/api/packages?${queryParams.toString()}`);
  }

  async getPackage(id: string): Promise<ApiResponse<any>> {
    return this.request(`/api/packages/${id}`);
  }

  // Booking methods
  async createBooking(bookingData: {
    packageId: string;
    numberOfPeople: number;
    startDate: string;
    endDate: string;
    name: string;
    email: string;
    phone: string;
    specialRequests?: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings(params?: {
    email?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    if (params?.email) queryParams.append('email', params.email);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    return this.request(`/api/bookings?${queryParams.toString()}`);
  }

  async getBooking(id: string, email?: string): Promise<ApiResponse<any>> {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    return this.request(`/api/bookings/${id}${query}`);
  }

  // Payment methods
  async createPayment(paymentData: {
    bookingId: string;
    amount: number;
    gateway: 'razorpay' | 'stripe';
    paymentMethod?: string;
    metadata?: any;
  }): Promise<ApiResponse<any>> {
    return this.request('/api/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  /** Create Razorpay order for a booking. Returns { orderId, amount, currency, key, paymentId }. */
  async createPaymentOrder(bookingId: string, email?: string): Promise<
    ApiResponse<{ orderId: string; amount: number; currency: string; key: string; paymentId: string }>
  > {
    return this.request('/api/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ bookingId, email: email || undefined }),
    });
  }

  /** Verify Razorpay payment and confirm booking. */
  async verifyPayment(body: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    paymentId?: string;
  }): Promise<ApiResponse<{ verified: boolean; bookingId: string; message: string }>> {
    return this.request('/api/payments/verify', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const apiClient = new ApiClient();
