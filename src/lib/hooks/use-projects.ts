import { useQuery } from '@tanstack/react-query';
import {
  projects,
  featuredProjects,
  getProjectBySlug,
  getRelatedProjects,
  type Project,
} from '@/lib/data/projects';

// Query keys for projects
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: { featured?: boolean }) =>
    [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (slug: string) => [...projectKeys.details(), slug] as const,
  related: (slug: string, limit?: number) =>
    [...projectKeys.all, 'related', slug, limit] as const,
};

// Async wrapper functions to simulate API calls
// These can be replaced with actual API calls in the future
async function fetchProjects(): Promise<Project[]> {
  // Simulate network delay for future API compatibility
  return Promise.resolve(projects);
}

async function fetchFeaturedProjects(): Promise<Project[]> {
  return Promise.resolve(featuredProjects);
}

async function fetchProjectBySlug(slug: string): Promise<Project | undefined> {
  return Promise.resolve(getProjectBySlug(slug));
}

async function fetchRelatedProjects(
  slug: string,
  limit?: number
): Promise<Project[]> {
  return Promise.resolve(getRelatedProjects(slug, limit));
}

/**
 * Hook to fetch all projects
 */
export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: fetchProjects,
  });
}

/**
 * Hook to fetch featured projects only
 */
export function useFeaturedProjects() {
  return useQuery({
    queryKey: projectKeys.list({ featured: true }),
    queryFn: fetchFeaturedProjects,
  });
}

/**
 * Hook to fetch a single project by slug
 */
export function useProject(slug: string) {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => fetchProjectBySlug(slug),
    enabled: !!slug,
  });
}

/**
 * Hook to fetch related projects for a given project slug
 */
export function useRelatedProjects(slug: string, limit = 3) {
  return useQuery({
    queryKey: projectKeys.related(slug, limit),
    queryFn: () => fetchRelatedProjects(slug, limit),
    enabled: !!slug,
  });
}
