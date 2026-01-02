import { Metadata } from "next";
import { Hero, FeaturedProjects, RecentlyPublished } from "@/components/sections";
import { siteConfig, generateJsonLd } from "@/lib/seo";
import { BelowFoldContent } from "@/components/sections/BelowFoldContent";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: "Explore my portfolio of web development projects. I'm a Front End Engineer specializing in React, TypeScript, and Next.js, building beautiful and performant web experiences.",
  openGraph: {
    title: siteConfig.title,
    description: "Explore my portfolio of web development projects. I'm a Front End Engineer specializing in React, TypeScript, and Next.js, building beautiful and performant web experiences.",
    url: siteConfig.url,
    type: 'website',
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  const jsonLd = generateJsonLd('website', {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <BelowFoldContent>
          <FeaturedProjects />
          <RecentlyPublished />
        </BelowFoldContent>
      </main>
    </>
  );
}
