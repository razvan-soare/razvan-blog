import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug } from '@/lib/data/projects';
import { siteConfig, generateJsonLd } from '@/lib/seo';
import { ProjectDetailClient } from './ProjectDetailClient';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const ogImage = project.thumbnail || siteConfig.ogImage;
  const keywords = [
    ...project.technologies,
    project.category,
    'portfolio',
    'case study',
    'web development',
  ].filter(Boolean) as string[];

  return {
    title: project.title,
    description: project.description,
    keywords,
    openGraph: {
      title: `${project.title} | Razvan Soare`,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Razvan Soare`,
      description: project.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = generateJsonLd('project', {
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}/projects/${project.slug}`,
    keywords: project.technologies.join(', '),
    genre: project.category,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient slug={slug} />
    </>
  );
}
