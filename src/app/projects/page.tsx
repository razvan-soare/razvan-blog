import { getPostsByType } from '@/lib/mdx';
import Projects from '@/components/Projects';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Razvan Soare',
  description: 'Projects by Razvan Soare',
};

export default function ProjectsPage() {
  const posts = getPostsByType('projects');
  return <Projects posts={posts} />;
}
