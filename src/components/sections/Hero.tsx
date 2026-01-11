'use client';

import { StickFigure } from '@/components/character/StickFigure';

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Stick Figure Character */}
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0">
            <StickFigure className="w-full h-full" />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Hello 👋 I am Razvan
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              React developer and technology enthusiast 🎉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
