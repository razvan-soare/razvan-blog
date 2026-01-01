import { FeaturedProjects, Hero, RecentlyPublished } from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <FeaturedProjects />
      <RecentlyPublished />
    </main>
  );
}
