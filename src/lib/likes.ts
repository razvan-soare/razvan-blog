import type { PrismaClient } from '@prisma/client';

export interface GetLikesParams {
  slug: string;
  userId: string;
}

export interface GetLikesResult {
  articleLikes: number;
  userLikes: number;
}

export interface PostLikeParams {
  slug: string;
  userId: string;
}

export async function getLikes(
  db: PrismaClient,
  { slug, userId }: GetLikesParams
): Promise<GetLikesResult> {
  let article = await db.article.findUnique({
    where: { slug },
    include: { userLikes: { where: { userId } } },
  });

  if (!article) {
    article = await db.article.create({
      data: { slug },
      include: { userLikes: true },
    });
  }

  const userLike = article.userLikes[0];

  return {
    articleLikes: article.likes,
    userLikes: userLike?.count || 0,
  };
}

export async function addLike(
  db: PrismaClient,
  { slug, userId }: PostLikeParams
): Promise<void> {
  const article = await db.article.upsert({
    where: { slug },
    create: { slug, likes: 1 },
    update: { likes: { increment: 1 } },
  });

  await db.userLike.upsert({
    where: { articleId_userId: { articleId: article.id, userId } },
    create: { articleId: article.id, userId, count: 1 },
    update: { count: { increment: 1 } },
  });
}
