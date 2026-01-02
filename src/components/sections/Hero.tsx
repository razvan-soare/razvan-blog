'use client';

import dynamic from 'next/dynamic';

// Dynamic import for code splitting - StickFigure is a large animated component
const StickFigure = dynamic(
  () => import('@/components/character/StickFigure').then(mod => ({ default: mod.StickFigure })),
  {
    loading: () => (
      <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border-4 border-muted-foreground/20 border-t-primary animate-spin" />
      </div>
    ),
    ssr: false, // Disable SSR for animation-heavy component
  }
);

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Hello 👋 I am Razvan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              React developer and technology enthusiast 🎉
            </p>
          </div>

          {/* Animated Stick Figure Character */}
          <div className="flex-shrink-0">
            <StickFigure className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
          </div>
        </div>
      </div>
    </section>
  );
}
