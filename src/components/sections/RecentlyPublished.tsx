import { PostCard } from './PostCard';
import { recentPosts } from '@/lib/data/posts';

export function RecentlyPublished() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Recently Published
          </h2>
          <p className="text-muted-foreground text-lg">
            Latest articles, tips, and code snippets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${150 + index * 100}ms`, animationFillMode: 'both' }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
