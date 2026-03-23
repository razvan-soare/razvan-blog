import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const userId = searchParams.get('userId');

  if (!slug || !userId) {
    return NextResponse.json({ error: 'Missing slug or userId' }, { status: 400 });
  }

  try {
    let article = await prisma.article.findUnique({
      where: { slug },
      include: { userLikes: { where: { userId } } },
    });

    if (!article) {
      article = await prisma.article.create({
        data: { slug },
        include: { userLikes: true },
      });
    }

    const userLike = article.userLikes[0];

    return NextResponse.json({
      articleLikes: article.likes,
      userLikes: userLike?.count || 0,
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (error) {
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
    // Upsert article (increment likes count, or create with initial count of 1)
    const article = await prisma.article.upsert({
      where: { slug },
      create: { slug, likes: 1 },
      update: { likes: { increment: 1 } },
    });

    // Upsert user like
    await prisma.userLike.upsert({
      where: { articleId_userId: { articleId: article.id, userId } },
      create: { articleId: article.id, userId, count: 1 },
      update: { count: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting likes:', error);
    return NextResponse.json({ error: 'Failed to update likes' }, { status: 500 });
  }
}
