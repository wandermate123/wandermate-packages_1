import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  let db: 'connected' | 'error' = 'connected';
  let dbMessage: string | undefined;

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {
    db = 'error';
    dbMessage = e instanceof Error ? e.message : 'Unknown';
    console.error('[Health] DB check failed:', e);
  }

  const ok = db === 'connected';
  return NextResponse.json(
    {
      status: ok ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      message: ok ? 'API is working' : 'API up, database unavailable',
      db: { status: db, ...(dbMessage && { message: dbMessage }) },
    },
    { status: ok ? 200 : 503 }
  );
}
