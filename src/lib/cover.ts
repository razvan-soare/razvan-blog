import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';

export interface CoverImageMeta {
  url: string;
  width: number;
  height: number;
  alt: string;
}

const DEFAULT_OG_IMAGE = {
  url: '/og/default',
  width: 1200,
  height: 630,
} as const;

export function getDefaultOgImage(alt = 'Razvan Soare') {
  return { ...DEFAULT_OG_IMAGE, alt };
}

/** Resolve cover image dimensions from a public-path frontmatter value. */
export function getCoverImageMeta(
  coverImage: string | undefined,
  alt: string
): CoverImageMeta | null {
  if (!coverImage) return null;

  const relativePath = coverImage.replace(/^\//, '');
  const filePath = path.join(process.cwd(), 'public', relativePath);
  if (!fs.existsSync(filePath)) return null;

  const { width, height } = imageSize(fs.readFileSync(filePath));
  if (!width || !height) return null;

  return {
    url: coverImage.startsWith('/') ? coverImage : `/${coverImage}`,
    width,
    height,
    alt,
  };
}

/** On-page cover: prefer coverInlineImage, then coverImage. */
export function getInlineCoverImageMeta(
  frontmatter: { coverInlineImage?: string; coverImage?: string; coverAlt?: string; title: string }
): CoverImageMeta | null {
  const alt = frontmatter.coverAlt || frontmatter.title;
  return (
    getCoverImageMeta(frontmatter.coverInlineImage, alt) ??
    getCoverImageMeta(frontmatter.coverImage, alt)
  );
}
