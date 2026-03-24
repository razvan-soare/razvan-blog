import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLikes, addLike } from './likes';

function createMockPrisma() {
  return {
    article: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    userLike: {
      upsert: vi.fn(),
    },
  } as any;
}

describe('getLikes', () => {
  let db: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    db = createMockPrisma();
  });

  it('returns likes for an existing article with user likes', async () => {
    db.article.findUnique.mockResolvedValue({
      id: 'art-1',
      slug: 'test-article',
      likes: 10,
      userLikes: [{ id: 'ul-1', userId: 'user-1', count: 3 }],
    });

    const result = await getLikes(db, { slug: 'test-article', userId: 'user-1' });

    expect(result).toEqual({ articleLikes: 10, userLikes: 3 });
    expect(db.article.findUnique).toHaveBeenCalledWith({
      where: { slug: 'test-article' },
      include: { userLikes: { where: { userId: 'user-1' } } },
    });
  });

  it('returns zero user likes when user has not liked the article', async () => {
    db.article.findUnique.mockResolvedValue({
      id: 'art-1',
      slug: 'test-article',
      likes: 5,
      userLikes: [],
    });

    const result = await getLikes(db, { slug: 'test-article', userId: 'user-2' });

    expect(result).toEqual({ articleLikes: 5, userLikes: 0 });
  });

  it('creates article when it does not exist and returns zero likes', async () => {
    db.article.findUnique.mockResolvedValue(null);
    db.article.create.mockResolvedValue({
      id: 'art-new',
      slug: 'new-article',
      likes: 0,
      userLikes: [],
    });

    const result = await getLikes(db, { slug: 'new-article', userId: 'user-1' });

    expect(result).toEqual({ articleLikes: 0, userLikes: 0 });
    expect(db.article.create).toHaveBeenCalledWith({
      data: { slug: 'new-article' },
      include: { userLikes: true },
    });
  });
});

describe('addLike', () => {
  let db: ReturnType<typeof createMockPrisma>;

  beforeEach(() => {
    db = createMockPrisma();
  });

  it('upserts article and user like', async () => {
    db.article.upsert.mockResolvedValue({ id: 'art-1', slug: 'test-article', likes: 1 });
    db.userLike.upsert.mockResolvedValue({});

    await addLike(db, { slug: 'test-article', userId: 'user-1' });

    expect(db.article.upsert).toHaveBeenCalledWith({
      where: { slug: 'test-article' },
      create: { slug: 'test-article', likes: 1 },
      update: { likes: { increment: 1 } },
    });
    expect(db.userLike.upsert).toHaveBeenCalledWith({
      where: { articleId_userId: { articleId: 'art-1', userId: 'user-1' } },
      create: { articleId: 'art-1', userId: 'user-1', count: 1 },
      update: { count: { increment: 1 } },
    });
  });

  it('creates new article on first like', async () => {
    db.article.upsert.mockResolvedValue({ id: 'art-new', slug: 'fresh-article', likes: 1 });
    db.userLike.upsert.mockResolvedValue({});

    await addLike(db, { slug: 'fresh-article', userId: 'user-1' });

    expect(db.article.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: { slug: 'fresh-article', likes: 1 },
      })
    );
    expect(db.userLike.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        create: { articleId: 'art-new', userId: 'user-1', count: 1 },
      })
    );
  });

  it('increments existing article likes', async () => {
    db.article.upsert.mockResolvedValue({ id: 'art-1', slug: 'popular-article', likes: 100 });
    db.userLike.upsert.mockResolvedValue({});

    await addLike(db, { slug: 'popular-article', userId: 'user-5' });

    expect(db.article.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        update: { likes: { increment: 1 } },
      })
    );
  });
});
