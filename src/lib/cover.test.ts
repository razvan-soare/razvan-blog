import { describe, it, expect } from 'vitest';
import { getCoverImageMeta, getDefaultOgImage, getInlineCoverImageMeta } from './cover';

describe('getDefaultOgImage', () => {
  it('returns the site default OG route with dimensions', () => {
    expect(getDefaultOgImage()).toEqual({
      url: '/og/default',
      width: 1200,
      height: 630,
      alt: 'Razvan Soare',
    });
  });

  it('allows a custom alt', () => {
    expect(getDefaultOgImage('Custom').alt).toBe('Custom');
  });
});

describe('getCoverImageMeta', () => {
  it('returns null when coverImage is missing', () => {
    expect(getCoverImageMeta(undefined, 'Alt')).toBeNull();
  });

  it('returns null for a missing file', () => {
    expect(getCoverImageMeta('/articles/does-not-exist/cover.jpg', 'Alt')).toBeNull();
  });

  it('resolves the life-after-ai cover dimensions', () => {
    const meta = getCoverImageMeta('/articles/life-after-ai/cover.jpg', 'Life after AI cover');
    expect(meta).toEqual({
      url: '/articles/life-after-ai/cover.jpg',
      width: 1280,
      height: 720,
      alt: 'Life after AI cover',
    });
  });
});

describe('getInlineCoverImageMeta', () => {
  it('prefers coverInlineImage over coverImage', () => {
    const meta = getInlineCoverImageMeta({
      title: 'Life after AI',
      coverImage: '/articles/life-after-ai/cover.jpg',
      coverInlineImage: '/articles/life-after-ai/cover-inline.jpg',
      coverAlt: 'Scene alt',
    });
    expect(meta).toEqual({
      url: '/articles/life-after-ai/cover-inline.jpg',
      width: 704,
      height: 720,
      alt: 'Scene alt',
    });
  });

  it('falls back to coverImage when coverInlineImage is missing', () => {
    const meta = getInlineCoverImageMeta({
      title: 'Life after AI',
      coverImage: '/articles/life-after-ai/cover.jpg',
    });
    expect(meta?.url).toBe('/articles/life-after-ai/cover.jpg');
  });
});
