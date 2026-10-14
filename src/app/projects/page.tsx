import fs from 'fs';
import path from 'path';
import { imageSize } from 'image-size';
import { getPostsByType } from '@/lib/mdx';
import Projects from '@/components/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Razvan Soare',
  description: 'Projects by Razvan Soare',
};

export default function ProjectsPage() {
  const posts = getPostsByType('projects').map(post => {
    const { thumbnail } = post.frontmatter;
    if (!thumbnail) return { post, thumbnailSize: undefined };
    const { width, height } = imageSize(fs.readFileSync(path.join(process.cwd(), 'public/images', thumbnail)));
    return { post, thumbnailSize: { width, height } };
  });
  return <Projects items={posts} />;
}
