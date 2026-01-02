import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore React hooks, helper functions, and development tips to level up your coding workflow. Practical tutorials and insights from a Front End Engineer.',
  keywords: [
    ...siteConfig.keywords,
    'React hooks',
    'JavaScript tips',
    'web development blog',
    'coding tutorials',
    'helper functions',
  ],
  openGraph: {
    title: 'Blog & Snippets | Razvan Soare',
    description: 'Explore React hooks, helper functions, and development tips to level up your coding workflow.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
