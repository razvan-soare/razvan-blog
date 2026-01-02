import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of web development projects, from healthcare applications to e-commerce platforms and social commerce solutions. Each project showcases my expertise in React, TypeScript, and modern web technologies.',
  keywords: [
    ...siteConfig.keywords,
    'portfolio',
    'web projects',
    'case studies',
    'healthcare apps',
    'e-commerce',
  ],
  openGraph: {
    title: 'Projects | Razvan Soare',
    description: 'Explore my portfolio of web development projects, from healthcare applications to e-commerce platforms and social commerce solutions.',
    url: `${siteConfig.url}/projects`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
