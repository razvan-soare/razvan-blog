export type PostCategory = 'hooks' | 'helper' | 'tips';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: PostCategory;
  slug: string;
  publishedAt: string;
}

export const recentPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Custom React Hooks for Data Fetching',
    excerpt: 'Learn how to create reusable hooks that handle loading states, error handling, and caching for your API calls.',
    category: 'hooks',
    slug: 'custom-react-hooks-data-fetching',
    publishedAt: '2024-12-28',
  },
  {
    id: '2',
    title: 'Essential TypeScript Utility Types You Should Know',
    excerpt: 'A deep dive into Pick, Omit, Partial, and other utility types that will make your TypeScript code more expressive.',
    category: 'helper',
    slug: 'typescript-utility-types',
    publishedAt: '2024-12-22',
  },
  {
    id: '3',
    title: '5 VS Code Shortcuts That Will Save You Hours',
    excerpt: 'Boost your productivity with these lesser-known keyboard shortcuts and tricks for Visual Studio Code.',
    category: 'tips',
    slug: 'vscode-shortcuts-productivity',
    publishedAt: '2024-12-15',
  },
];
