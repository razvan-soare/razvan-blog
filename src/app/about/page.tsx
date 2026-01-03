import Link from 'next/link';
import { Github, Linkedin, Instagram, Heart, Code2, BookOpen, Bike, Gamepad2, Wind } from 'lucide-react';
import { AboutHeroCharacter } from './AboutClient';

const socialLinks = [
  { href: 'https://github.com/razvansoare', label: 'GitHub', Icon: Github },
  { href: 'https://linkedin.com/in/razvansoare', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://instagram.com/razvansoare', label: 'Instagram', Icon: Instagram },
];

const hobbies = [
  {
    Icon: BookOpen,
    title: 'Reading Tech Articles',
    description: 'Staying up-to-date with the latest in web development, JavaScript ecosystem, and emerging technologies.',
  },
  {
    Icon: Bike,
    title: 'Longboarding',
    description: 'Cruising around on my longboard and electric board - nothing beats the feeling of gliding through the streets.',
  },
  {
    Icon: Wind,
    title: 'Running',
    description: 'Keeping active with regular runs. It helps clear my mind and keeps me energized for coding sessions.',
  },
  {
    Icon: Gamepad2,
    title: 'Video Gaming',
    description: 'Huge Assassin\'s Creed fan! Love immersing myself in open-world adventures and historical settings.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-24 animate-in fade-in duration-300">
        {/* Hero Section with Greeting */}
        <section className="mb-16 text-center animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:text-left">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hey there! I'm Razvan
              </h1>
              <p className="text-xl text-muted-foreground">
                Nice to meet you! Let me tell you a bit about myself.
              </p>
            </div>
            <div className="flex-shrink-0">
              <AboutHeroCharacter />
            </div>
          </div>
        </section>

        {/* Personal Bio Section */}
        <section
          className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '100ms', animationFillMode: 'both' }}
        >
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              About Me
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-foreground font-medium">27-year-old Front End Engineer</span> based in the <span className="text-foreground font-medium">United Kingdom</span>.
                Building beautiful, performant, and accessible web experiences is not just my job - it's my passion.
              </p>
              <p>
                I'm a passionate developer who genuinely <span className="text-foreground font-medium">loves coding</span> and the <span className="text-foreground font-medium">web platform</span>.
                There's something magical about crafting interfaces that people interact with every day.
                From the first line of code to the final polish, I find joy in every step of the development process.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source,
                or sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </section>

        {/* Why I Love React Section */}
        <section
          className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '150ms', animationFillMode: 'both' }}
        >
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Why I Love React
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                React has been my go-to framework for years, and for good reason. Its component-based architecture
                makes building complex UIs feel like assembling LEGO blocks - each piece fits together perfectly to create something amazing.
              </p>
              <p>
                What I love most about React is its <span className="text-foreground font-medium">flexibility</span> and the incredible <span className="text-foreground font-medium">ecosystem</span> around it.
                Whether I'm building a simple landing page or a complex web application, React gives me the tools I need to bring my ideas to life.
              </p>
              <p>
                The React community is also fantastic - always pushing boundaries, sharing knowledge, and making web development more accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Hobbies & Interests Section */}
        <section
          className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Hobbies & Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hobbies.map((hobby, index) => (
              <div
                key={hobby.title}
                className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <hobby.Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{hobby.title}</h3>
                    <p className="text-sm text-muted-foreground">{hobby.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social Links Section */}
        <section
          className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDelay: '250ms', animationFillMode: 'both' }}
        >
          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out! I'm always happy to chat about web development, React, or just say hello.
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <social.Icon className="h-5 w-5" />
                <span>{social.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
