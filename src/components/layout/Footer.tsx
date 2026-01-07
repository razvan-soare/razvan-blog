import Link from 'next/link';
import { Github, Linkedin, Instagram, MessageSquarePlus } from 'lucide-react';
import { SiteLikeButton } from '@/components/like-button';

const socialLinks = [
  { href: 'https://github.com/razvansoare', label: 'GitHub', icon: Github },
  { href: 'https://linkedin.com/in/razvansoare', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://instagram.com/razvansoare', label: 'Instagram', icon: Instagram },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Razvan Soare. All rights reserved.
          </p>

          {/* Center Section: Like & Feedback */}
          <div className="flex items-center gap-4">
            <SiteLikeButton />
            <Link
              href="/feedback"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Feedback</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
