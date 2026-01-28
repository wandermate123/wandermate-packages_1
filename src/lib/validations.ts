import { z } from 'zod';

// Package validation schemas
export const packageSchema = z.object({
  name: z.string().min(1, 'Package name is required'),
  destination: z.string().min(1, 'Destination is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().positive('Price must be positive'),
  category: z.enum(['VARANASI_BUDGET', 'VARANASI_PREMIUM', 'SPIRITUAL_TRIANGLE']),
  featured: z.boolean().optional().default(false),
  highlights: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  itinerary: z.any().optional(),
  inclusions: z.array(z.string()).optional().default([]),
  exclusions: z.array(z.string()).optional().default([]),
  terms: z.any().optional(),
  mapLocation: z.any().optional(),
  isActive: z.boolean().optional().default(true),
});

export const packageUpdateSchema = packageSchema.partial();

// Booking validation schemas
export const bookingSchema = z.object({
  packageId: z.string().min(1, 'Package ID is required'),
  numberOfPeople: z.number().int().positive('Number of people must be positive'),
  startDate: z.string().datetime('Invalid start date'),
  endDate: z.string().datetime('Invalid end date'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  specialRequests: z.string().optional(),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end > start;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// Payment validation schemas
export const paymentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  amount: z.number().positive('Amount must be positive'),
  gateway: z.enum(['razorpay', 'stripe']),
  paymentMethod: z.string().optional(),
  metadata: z.any().optional(),
});

// Review validation schemas
export const reviewSchema = z.object({
  packageId: z.string().min(1, 'Package ID is required'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(1, 'Comment is required'),
  name: z.string().min(1, 'Name is required'),
  bookingId: z.string().optional(),
});

// Query validation schemas
export const packageQuerySchema = z.object({
  category: z.enum(['VARANASI_BUDGET', 'VARANASI_PREMIUM', 'SPIRITUAL_TRIANGLE', 'all']).default('all'),
  featured: z.string().optional().transform((val) => val === 'true'),
  search: z.string().optional(),
  page: z.string().default('1').transform((val) => {
    const parsed = parseInt(val);
    return isNaN(parsed) ? 1 : parsed;
  }),
  limit: z.string().default('10').transform((val) => {
    const parsed = parseInt(val);
    return isNaN(parsed) ? 10 : parsed;
  }),
});
