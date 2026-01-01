import { StickFigure } from '@/components/character';

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
