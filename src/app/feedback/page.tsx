import { Metadata } from 'next';
import { MessageSquarePlus } from 'lucide-react';

import { siteConfig } from '@/lib/seo';
import { FeedbackPageClient } from './FeedbackPageClient';

// Force dynamic rendering to avoid SSR issues with localStorage-based hooks
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `Feedback | ${siteConfig.name}`,
  description:
    'Share your feedback about my portfolio. Your thoughts help improve the design, functionality, and overall experience.',
  openGraph: {
    title: `Feedback | ${siteConfig.name}`,
    description:
      'Share your feedback about my portfolio. Your thoughts help improve the design, functionality, and overall experience.',
    url: `${siteConfig.url}/feedback`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/feedback`,
  },
};

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
              <MessageSquarePlus className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Share Your Feedback
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your feedback is invaluable in making this portfolio better. Whether it&apos;s about
              the design, the stick figure animations, or anything else - I&apos;d love to hear
              your thoughts!
            </p>
          </div>

          <FeedbackPageClient />
        </div>
      </section>
    </main>
  );
}
