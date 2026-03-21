import { getPostsByType } from '@/lib/mdx';
import Homepage from '@/components/Homepage';

export default function Home() {
  const posts = getPostsByType('articles');
  return <Homepage posts={posts} />;
}
