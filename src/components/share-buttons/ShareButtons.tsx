'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'inline' | 'sidebar';
}

// Twitter/X icon
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// LinkedIn icon
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Copy/Link icon
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// Check icon for copied state
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ShareButtons({
  url,
  title,
  description = '',
  className,
  variant = 'inline',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const shareToTwitter = useCallback(() => {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420'
    );
  }, [title, url]);

  const shareToLinkedIn = useCallback(() => {
    const shareUrl = encodeURIComponent(url);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer,width=550,height=420'
    );
  }, [url]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, action: () => void) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        action();
      }
    },
    []
  );

  const isInline = variant === 'inline';
  const isSidebar = variant === 'sidebar';

  const buttonBaseClass = cn(
    'relative flex items-center justify-center rounded-lg transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    isInline && 'h-10 px-4 gap-2 bg-card/50 border border-border/50 hover:bg-card/80 hover:border-border',
    isSidebar && 'h-10 w-10 bg-card/50 border border-border/50 hover:bg-card/80 hover:border-border'
  );

  const iconClass = cn(
    'flex-shrink-0',
    isInline ? 'h-4 w-4' : 'h-5 w-5'
  );

  return (
    <div
      className={cn(
        'flex gap-2',
        isInline && 'flex-wrap items-center',
        isSidebar && 'flex-col',
        className
      )}
      role="group"
      aria-label="Share this article"
    >
      {/* Label for inline variant */}
      {isInline && (
        <span className="text-sm text-muted-foreground mr-2">Share:</span>
      )}

      {/* Twitter/X Button */}
      <motion.button
        type="button"
        onClick={shareToTwitter}
        onKeyDown={(e) => handleKeyDown(e, shareToTwitter)}
        className={cn(buttonBaseClass, 'hover:text-[#1DA1F2]')}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label="Share on Twitter/X"
        title="Share on Twitter/X"
      >
        <TwitterIcon className={iconClass} />
        {isInline && <span className="text-sm">Twitter</span>}
      </motion.button>

      {/* LinkedIn Button */}
      <motion.button
        type="button"
        onClick={shareToLinkedIn}
        onKeyDown={(e) => handleKeyDown(e, shareToLinkedIn)}
        className={cn(buttonBaseClass, 'hover:text-[#0A66C2]')}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <LinkedInIcon className={iconClass} />
        {isInline && <span className="text-sm">LinkedIn</span>}
      </motion.button>

      {/* Copy Link Button */}
      <motion.button
        type="button"
        onClick={copyToClipboard}
        onKeyDown={(e) => handleKeyDown(e, copyToClipboard)}
        className={cn(
          buttonBaseClass,
          copied && 'text-green-400 border-green-500/50 bg-green-500/10'
        )}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
        title={copied ? 'Copied!' : 'Copy link'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <CheckIcon className={iconClass} />
              {isInline && <span className="text-sm">Copied!</span>}
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <LinkIcon className={iconClass} />
              {isInline && <span className="text-sm">Copy link</span>}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
