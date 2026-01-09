import Link from 'next/link';
import { Github, Linkedin, Instagram, Code2, BookOpen, Bike, Gamepad2, Wind, Heart, Layers, Zap, Users, Sparkles } from 'lucide-react';

const socialLinks = [
  { href: 'https://linkedin.com/in/razvansoare', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://github.com/razvansoare', label: 'GitHub', Icon: Github },
  { href: 'https://instagram.com/razvansoare', label: 'Instagram', Icon: Instagram },
];

const reactReasons = [
  {
    Icon: Layers,
    title: 'Component Architecture',
    description: 'Building reusable, composable UI pieces that snap together like LEGO blocks. Clean separation of concerns makes code a joy to maintain.',
  },
  {
    Icon: Zap,
    title: 'Developer Experience',
    description: 'Hot reloading, excellent tooling, and intuitive debugging. React makes the development process smooth and productive.',
  },
  {
    Icon: Users,
    title: 'Vibrant Community',
    description: 'An incredible ecosystem of libraries, tools, and passionate developers sharing knowledge and pushing boundaries.',
  },
  {
    Icon: Sparkles,
    title: 'Declarative Magic',
    description: 'Describing what the UI should look like, not how to update it. State changes flow naturally through the component tree.',
  },
];

const hobbies = [
  {
    Icon: BookOpen,
    title: 'Reading Tech Articles',
    description: 'Staying up-to-date with the latest in web development and emerging technologies.',
  },
  {
    Icon: Bike,
    title: 'Longboarding',
    description: 'Cruising on my longboard and electric board - nothing beats gliding through the streets.',
  },
  {
    Icon: Wind,
    title: 'Running',
    description: 'Keeping active with regular runs to clear my mind and stay energized.',
  },
  {
    Icon: Gamepad2,
    title: 'Video Gaming',
    description: "Huge Assassin's Creed fan! Love immersing myself in open-world adventures.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 animate-in fade-in duration-300">
        {/* Hero Section */}
        <section className="mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Me
          </h1>
        </section>

        {/* Personal Bio Section */}
        <section
          className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-[#e60067]/10 p-2">
                <Code2 className="h-5 w-5 text-[#e60067]" />
              </div>
              <h2 className="text-xl font-semibold">Who I Am</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-medium">27-year-old Front End Engineer</span> based in the <span className="text-foreground font-medium">United Kingdom</span>.
              </p>
              <p>
                I'm a passionate developer who genuinely <span className="text-[#e60067] font-medium">loves coding</span>, embraces <span className="text-[#5773ff] font-medium">open challenges</span>, and is deeply invested in the <span className="text-foreground font-medium">web platform</span>.
                There's something magical about crafting interfaces that people interact with every day.
              </p>
            </div>
          </div>
        </section>

        {/* Why I Love React Section */}
        <section
          className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '150ms', animationFillMode: 'both' }}
        >
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-[#61dafb]/10 p-2">
                <Heart className="h-5 w-5 text-[#61dafb]" />
              </div>
              <h2 className="text-xl font-semibold">Why I Love React</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              React isn't just a library to me—it's the <span className="text-[#61dafb] font-medium">foundation of how I think about building user interfaces</span>. Here's what makes it special:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reactReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="group rounded-lg border border-border/50 bg-background/50 p-4 hover:border-[#61dafb]/50 hover:bg-[#61dafb]/5 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#61dafb]/10 p-2 group-hover:bg-[#61dafb]/20 transition-colors duration-200">
                      <reason.Icon className="h-4 w-4 text-[#61dafb]" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{reason.title}</h3>
                      <p className="text-sm text-muted-foreground">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hobbies & Interests Section */}
        <section
          className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          <h2 className="text-xl font-semibold mb-4">When I'm Not Coding</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hobbies.map((hobby) => (
              <div
                key={hobby.title}
                className="group rounded-lg border border-border bg-card p-5 hover:border-[#5773ff]/50 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#5773ff]/10 p-2.5 group-hover:bg-[#5773ff]/20 transition-colors duration-200">
                    <hobby.Icon className="h-4 w-4 text-[#5773ff]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{hobby.title}</h3>
                    <p className="text-sm text-muted-foreground">{hobby.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section
          className="animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '250ms', animationFillMode: 'both' }}
        >
          <h2 className="text-xl font-semibold mb-4">Connect With Me</h2>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-muted-foreground hover:text-foreground hover:border-[#e60067]/50 hover:bg-[#e60067]/5 transition-all duration-200"
              >
                <social.Icon className="h-5 w-5 group-hover:scale-110 group-hover:text-[#e60067] transition-all duration-200" />
                <span className="text-sm font-medium">{social.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
