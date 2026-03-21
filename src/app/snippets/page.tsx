import { getPostsByType } from '@/lib/mdx';
import Snippets from '@/components/Snippets';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snippets - Razvan Soare',
  description: 'Code snippets by Razvan Soare',
};

export default function SnippetsPage() {
  const posts = getPostsByType('snippets');
  return <Snippets posts={posts} />;
}
