/**
 * Environment variable validation and access
 * Validates required environment variables at startup
 */

const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'NEXT_PUBLIC_APP_URL',
] as const;

const optionalEnvVars = [
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
] as const;

export function validateEnv() {
  const missing: string[] = [];
  
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local or .env.production file.'
    );
  }
  
  // Warn about missing optional vars in development
  if (process.env.NODE_ENV === 'development') {
    optionalEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        console.warn(`⚠️  Optional environment variable not set: ${varName}`);
      }
    });
  }
}

// Validate on module load (server-side only)
// Only validate during runtime, not during build
if (typeof window === 'undefined' && process.env.NODE_ENV !== undefined) {
  try {
    validateEnv();
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    // Don't throw during build - let it fail at runtime instead
    // This allows the build to complete even if env vars aren't set yet
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      // Only throw if we're actually running in production (not building)
      throw error;
    }
  }
}

// Export validated env vars with types
export const env = {
  // Required
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  
  // Optional
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@wandermate.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@wandermate.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER,
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;
