'use client';

import React from 'react';

const variantColors: Record<string, { bg: string; border: string }> = {
  success: { bg: 'var(--color-text-block-success)', border: 'var(--color-text-block-border-success)' },
  warning: { bg: 'var(--color-text-block-warning)', border: 'var(--color-text-block-border-warning)' },
  danger: { bg: 'var(--color-text-block-danger)', border: 'var(--color-text-block-border-danger)' },
  info: { bg: 'var(--color-text-block-info)', border: 'var(--color-text-block-border-info)' },
  primary: { bg: 'var(--color-text-block-primary)', border: 'var(--color-text-block-border-primary)' },
};

const icons: Record<string, string> = {
  success: '\u2705',
  warning: '\u26A0\uFE0F',
  danger: '\uD83D\uDED1',
  info: '\u2139\uFE0F',
  primary: '\u2139\uFE0F',
};

function TextBlock({ variant, children }: { variant: string; children: React.ReactNode }) {
  const colors = variantColors[variant] || variantColors.info;

  return (
    <div
      className="border-l-[3px] border-solid rounded-[6px_6px_6px_3px] text-[17px] leading-relaxed font-light mb-16 mt-12 py-6 px-8 relative transition-[background-color,border-color] duration-theme [&>*:last-child]:mb-0"
      style={{ borderColor: colors.border, background: colors.bg }}
    >
      <div className="bg-background rounded-full block absolute left-0 top-0 p-[7px] -translate-x-1/2 -translate-y-1/2 transition-[background-color] duration-theme text-xl">
        {icons[variant] || icons.info}
      </div>
      {children}
    </div>
  );
}

export function Primary({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="primary">{children}</TextBlock>;
}

export function Info({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="info">{children}</TextBlock>;
}

export function Success({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="success">{children}</TextBlock>;
}

export function Warning({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="warning">{children}</TextBlock>;
}

export function Danger({ children }: { children: React.ReactNode }) {
  return <TextBlock variant="danger">{children}</TextBlock>;
}

export function U({ children }: { children: React.ReactNode }) {
  return <span className="relative border-b-2 border-solid">{children}</span>;
}
