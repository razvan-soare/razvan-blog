export type PostCategory = 'hooks' | 'helpers' | 'tips';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  slug: string;
  publishedAt: string;
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Editable content for any react project',
    excerpt: 'Learn how to implement inline editable content in your React applications. A flexible helper component that makes any text element editable with save and cancel functionality.',
    category: 'helpers',
    slug: 'editable-content-react',
    publishedAt: '2024-12-28',
    readingTime: 5,
  },
  {
    id: '2',
    title: 'Prevent your React Context from re-rendering everything',
    excerpt: 'Optimize your React Context usage to avoid unnecessary re-renders. Learn techniques to split context, memoize values, and keep your app performant.',
    category: 'tips',
    slug: 'prevent-context-rerendering',
    publishedAt: '2024-12-22',
    readingTime: 7,
  },
  {
    id: '3',
    title: 'On scroll animation',
    excerpt: 'Create smooth, performant scroll-triggered animations in React. A reusable hook that leverages Intersection Observer for elegant reveal effects.',
    category: 'hooks',
    slug: 'on-scroll-animation',
    publishedAt: '2024-12-15',
    readingTime: 4,
  },
  {
    id: '4',
    title: 'Disable Body Scroll Hook',
    excerpt: 'A custom React hook to disable body scrolling when modals or overlays are open. Handles edge cases like iOS Safari and preserves scroll position.',
    category: 'hooks',
    slug: 'disable-body-scroll-hook',
    publishedAt: '2024-12-10',
    readingTime: 3,
  },
  {
    id: '5',
    title: 'Conditional Rendering - Clean up your code trick',
    excerpt: 'Master conditional rendering patterns in React. From simple ternaries to render props, learn the best practices for showing and hiding UI elements and cleaning up messy conditionals.',
    category: 'tips',
    slug: 'conditional-rendering-clean-code',
    publishedAt: '2024-12-05',
    readingTime: 6,
  },
  {
    id: '6',
    title: 'useDebounce: Optimize User Input Performance',
    excerpt: 'Implement a custom debounce hook to prevent excessive API calls and improve performance in search inputs and forms.',
    category: 'hooks',
    slug: 'use-debounce-hook',
    publishedAt: '2024-11-28',
    readingTime: 5,
  },
  {
    id: '7',
    title: 'Type-Safe API Client with Generics',
    excerpt: 'Build a reusable, type-safe HTTP client wrapper that provides excellent developer experience and catches errors at compile time.',
    category: 'helpers',
    slug: 'type-safe-api-client',
    publishedAt: '2024-11-20',
    readingTime: 8,
  },
  {
    id: '8',
    title: 'useLocalStorage: Persistent State Made Easy',
    excerpt: 'Create a hook that syncs React state with localStorage, handling serialization and cross-tab synchronization automatically.',
    category: 'hooks',
    slug: 'use-local-storage-hook',
    publishedAt: '2024-11-15',
    readingTime: 6,
  },
  {
    id: '9',
    title: 'Deep Clone Utility for Complex Objects',
    excerpt: 'Build a robust deep clone function that handles edge cases like circular references, dates, and special object types.',
    category: 'helpers',
    slug: 'deep-clone-utility',
    publishedAt: '2024-11-08',
    readingTime: 7,
  },
];

// For backwards compatibility with RecentlyPublished section
export const recentPosts: BlogPost[] = blogPosts.slice(0, 3);
