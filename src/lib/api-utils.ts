import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: 'Invalid input data',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.code || 'API_ERROR',
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    const msg = error.message || '';
    const isDbError =
      (error as { code?: string }).code?.startsWith?.('P') ||
      /can't reach|connection|database|ECONNREFUSED|ETIMEDOUT|P1001|P1002|P1017|Environment variable not found|DATABASE_URL|invalid connection|connection refused|getaddrinfo|ENOTFOUND/i.test(msg);
    const status = isDbError ? 503 : 500;
    const message =
      process.env.NODE_ENV === 'development'
        ? error.message
        : isDbError
          ? 'Database connection failed. Please try again later.'
          : 'An unexpected error occurred';
    console.error('[API] Server error:', error.message, error);
    return NextResponse.json(
      { error: isDbError ? 'SERVICE_UNAVAILABLE' : 'INTERNAL_ERROR', message },
      { status }
    );
  }

  return NextResponse.json(
    {
      error: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred',
    },
    { status: 500 }
  );
}

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    },
  });
}
