import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getLikes, addLike } from '@/lib/likes';
import * as Sentry from '@sentry/nextjs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const userId = searchParams.get('userId');

  if (!slug || !userId) {
    return NextResponse.json({ error: 'Missing slug or userId' }, { status: 400 });
  }

  try {
    const result = await getLikes(prisma, { slug, userId });
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { endpoint: 'likes_get' },
      extra: { slug, userId },
    });
    console.error('Error getting likes:', error);
    return NextResponse.json({ articleLikes: 0, userLikes: 0 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { slug, userId } = body;

  if (!slug || !userId) {
    return NextResponse.json({ error: 'Missing slug or userId' }, { status: 400 });
  }

  try {
    await addLike(prisma, { slug, userId });
    return NextResponse.json({ success: true });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { endpoint: 'likes_post' },
      extra: { slug, userId },
    });
    console.error('Error setting likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}
