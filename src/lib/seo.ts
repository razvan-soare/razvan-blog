import { Metadata } from 'next';

export const siteConfig = {
  name: 'Razvan Soare',
  title: 'Razvan Soare | Front End Engineer',
  description: 'Front End Engineer specializing in React, TypeScript, and modern web technologies. Building beautiful, performant, and accessible web experiences.',
  url: 'https://razvansoare.com',
  author: {
    name: 'Razvan Soare',
    email: 'hello@razvansoare.com',
    twitter: '@razvansoare',
  },
  keywords: [
    'Front End Engineer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Web Developer',
    'JavaScript',
    'UI/UX',
    'Razvan Soare',
  ],
  ogImage: '/images/og-default.jpg',
  twitterHandle: '@razvansoare',
  locale: 'en_US',
};

export function createMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  canonical?: string;
}): Metadata {
  const fullTitle = title === siteConfig.name
    ? siteConfig.title
    : `${title} | ${siteConfig.name}`;

  const image = ogImage || siteConfig.ogImage;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords || siteConfig.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      type: ogType,
      locale: siteConfig.locale,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
  };
}

export function createArticleMetadata({
  title,
  description,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  ogImage,
  canonical,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  ogImage?: string;
  canonical?: string;
}): Metadata {
  const baseMetadata = createMetadata({
    title,
    description,
    ogImage,
    ogType: 'article',
    canonical,
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors || [siteConfig.author.name],
      tags,
    },
  };
}

export function createProjectMetadata({
  title,
  description,
  category,
  technologies,
  ogImage,
  canonical,
}: {
  title: string;
  description: string;
  category?: string;
  technologies?: string[];
  ogImage?: string;
  canonical?: string;
}): Metadata {
  const keywords = [
    ...(technologies || []),
    category,
    'portfolio',
    'project',
    'case study',
  ].filter(Boolean) as string[];

  return createMetadata({
    title,
    description,
    keywords,
    ogImage,
    canonical,
  });
}

export function generateJsonLd(type: 'website' | 'person' | 'article' | 'project', data: Record<string, unknown>) {
  const baseContext = 'https://schema.org';

  switch (type) {
    case 'website':
      return {
        '@context': baseContext,
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        author: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
      };

    case 'person':
      return {
        '@context': baseContext,
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.url,
        jobTitle: 'Front End Engineer',
        sameAs: [
          'https://github.com/razvansoare',
          'https://linkedin.com/in/razvansoare',
          'https://instagram.com/razvansoare',
        ],
        ...data,
      };

    case 'article':
      return {
        '@context': baseContext,
        '@type': 'Article',
        author: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
        publisher: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
        ...data,
      };

    case 'project':
      return {
        '@context': baseContext,
        '@type': 'CreativeWork',
        creator: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
        ...data,
      };

    default:
      return data;
  }
}
