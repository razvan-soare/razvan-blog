import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About',
  description: "I'm Razvan, a 27-year-old Front End Engineer based in the United Kingdom. I'm passionate about building beautiful, performant, and accessible web experiences with React and modern technologies.",
  keywords: [
    ...siteConfig.keywords,
    'about me',
    'front end developer',
    'UK developer',
    'React engineer',
  ],
  openGraph: {
    title: 'About Razvan Soare',
    description: "I'm Razvan, a 27-year-old Front End Engineer based in the United Kingdom. I'm passionate about building beautiful, performant, and accessible web experiences with React and modern technologies.",
    url: `${siteConfig.url}/about`,
    type: 'profile',
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
