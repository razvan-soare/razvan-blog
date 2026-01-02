import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { blogPosts, getPostBySlug, getRelatedPosts, PostCategory } from '@/lib/data/posts';
import { parseContent } from '@/lib/mdx';
import { TableOfContents } from '@/components/mdx';
import { cn } from '@/lib/utils';
import { RelatedPosts } from './RelatedPosts';
import { siteConfig, generateJsonLd } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const categoryKeywords: Record<PostCategory, string[]> = {
    hooks: ['React hooks', 'custom hooks', 'React development'],
    helpers: ['helper functions', 'utility functions', 'JavaScript helpers'],
    tips: ['coding tips', 'development tips', 'best practices'],
  };

  const keywords = [
    ...siteConfig.keywords,
    ...categoryKeywords[post.category],
    'tutorial',
    'web development',
  ];

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      type: 'article',
      title: `${post.title} | Razvan Soare`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt,
      authors: [siteConfig.author.name],
      tags: [post.category, 'React', 'JavaScript', 'Web Development'],
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Razvan Soare`,
      description: post.excerpt,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

const categoryStyles: Record<PostCategory, { badge: string; text: string }> = {
  hooks: {
    badge: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    text: 'Hooks',
  },
  helpers: {
    badge: 'bg-green-500/20 text-green-400 border-green-500/50',
    text: 'Helpers',
  },
  tips: {
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    text: 'Tips',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { html } = await parseContent(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);
  const categoryStyle = categoryStyles[post.category];

  const jsonLd = generateJsonLd('article', {
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    image: siteConfig.ogImage,
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <article>
            {/* Header */}
            <header className="mb-10">
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
                    categoryStyle.badge
                  )}
                >
                  <Tag className="h-3 w-3" />
                  {categoryStyle.text}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-4">
                {post.excerpt}
              </p>
            </header>

            {/* Content */}
            <div
              className="mdx-content prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border/50">
            <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
            <RelatedPosts posts={relatedPosts} />
          </section>
        )}
        </div>
      </main>
    </>
  );
}
