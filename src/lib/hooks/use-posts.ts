import { useQuery } from '@tanstack/react-query';
import {
  blogPosts,
  recentPosts,
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
  type PostCategory,
} from '@/lib/data/posts';

// Query keys for blog posts
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters?: { category?: PostCategory; recent?: boolean }) =>
    [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (slug: string) => [...postKeys.details(), slug] as const,
  related: (slug: string, limit?: number) =>
    [...postKeys.all, 'related', slug, limit] as const,
};

// Async wrapper functions to simulate API calls
// These can be replaced with actual API calls in the future
async function fetchPosts(): Promise<BlogPost[]> {
  return Promise.resolve(blogPosts);
}

async function fetchRecentPosts(): Promise<BlogPost[]> {
  return Promise.resolve(recentPosts);
}

async function fetchPostsByCategory(category: PostCategory): Promise<BlogPost[]> {
  const filtered = blogPosts.filter((post) => post.category === category);
  return Promise.resolve(filtered);
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return Promise.resolve(getPostBySlug(slug));
}

async function fetchRelatedPosts(
  slug: string,
  limit?: number
): Promise<BlogPost[]> {
  return Promise.resolve(getRelatedPosts(slug, limit));
}

/**
 * Hook to fetch all blog posts
 */
export function usePosts() {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: fetchPosts,
  });
}

/**
 * Hook to fetch recent blog posts
 */
export function useRecentPosts() {
  return useQuery({
    queryKey: postKeys.list({ recent: true }),
    queryFn: fetchRecentPosts,
  });
}

/**
 * Hook to fetch blog posts by category
 */
export function usePostsByCategory(category: PostCategory) {
  return useQuery({
    queryKey: postKeys.list({ category }),
    queryFn: () => fetchPostsByCategory(category),
    enabled: !!category,
  });
}

/**
 * Hook to fetch a single blog post by slug
 */
export function usePost(slug: string) {
  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook to fetch related blog posts for a given post slug
 */
export function useRelatedPosts(slug: string, limit = 3) {
  return useQuery({
    queryKey: postKeys.related(slug, limit),
    queryFn: () => fetchRelatedPosts(slug, limit),
    enabled: !!slug,
  });
}
