export function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-4 w-full">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Text Content */}
          <div className="text-center">
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
