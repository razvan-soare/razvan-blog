import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  type: 'articles' | 'projects' | 'snippets';
  excerpt: string;
  thumbnail?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

function getPostsFromDir(dir: string): Post[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) return [];

  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.mdx'));

  return files.map(filename => {
    const filePath = path.join(fullPath, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Ensure date is a string (gray-matter parses it as Date)
    if (data.date instanceof Date) {
      data.date = data.date.toISOString().split('T')[0];
    } else if (typeof data.date === 'string') {
      // Keep as string
    }

    return {
      slug: filename.replace('.mdx', ''),
      frontmatter: data as PostFrontmatter,
      content,
    };
  });
}

export function getAllPosts(): Post[] {
  const articles = getPostsFromDir('articles');
  const projects = getPostsFromDir('projects');
  const snippets = getPostsFromDir('snippets');

  return [...articles, ...projects, ...snippets];
}

export function getPostsByType(type: string): Post[] {
  return getAllPosts()
    .filter(post => post.frontmatter.type === type && !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getPublishedPosts(): Post[] {
  return getAllPosts().filter(post => !post.frontmatter.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find(post => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return getPublishedPosts().map(post => post.slug);
}
