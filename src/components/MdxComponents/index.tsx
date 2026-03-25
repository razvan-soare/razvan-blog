'use client';

import React from 'react';

const variantColors: Record<string, { bg: string; border: string }> = {
  success: { bg: 'var(--color-text-block-success)', border: 'var(--color-text-block-border-success)' },
  warning: { bg: 'var(--color-text-block-warning)', border: 'var(--color-text-block-border-warning)' },
  danger: { bg: 'var(--color-text-block-danger)', border: 'var(--color-text-block-border-danger)' },
  info: { bg: 'var(--color-text-block-info)', border: 'var(--color-text-block-border-info)' },
  primary: { bg: 'var(--color-text-block-primary)', border: 'var(--color-text-block-border-primary)' },
};

const InfoIcon = () => (
  <svg viewBox="0 0 330 330" fill="currentColor" width="20" height="20">
    <path d="M165,0C74.019,0,0,74.02,0,165.001C0,255.982,74.019,330,165,330s165-74.018,165-164.999C330,74.02,255.981,0,165,0z M165,300c-74.44,0-135-60.56-135-134.999C30,90.562,90.56,30,165,30s135,60.562,135,135.001C300,239.44,239.439,300,165,300z"/>
    <path d="M164.998,70c-11.026,0-19.996,8.976-19.996,20.009c0,11.023,8.97,19.991,19.996,19.991 c11.026,0,19.996-8.968,19.996-19.991C184.994,78.976,176.024,70,164.998,70z"/>
    <path d="M165,140c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-90C180,146.716,173.284,140,165,140z"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const DangerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
  </svg>
);

const icons: Record<string, React.ReactNode> = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
  info: <InfoIcon />,
  primary: <InfoIcon />,
};

function TextBlock({ variant, children }: { variant: string; children: React.ReactNode }) {
  const colors = variantColors[variant] || variantColors.info;

  return (
    <div
      className="border-l-[3px] border-solid rounded-[6px_6px_6px_3px] text-[17px] leading-relaxed font-light mb-16 mt-12 py-6 px-8 relative transition-[background-color,border-color] duration-theme [&>*:last-child]:mb-0"
      style={{ borderColor: colors.border, background: colors.bg }}
    >
      <div
        className="bg-background rounded-full flex items-center justify-center absolute left-0 top-0 p-[5px] -translate-x-1/2 -translate-y-1/2 transition-[background-color] duration-theme"
        style={{ color: colors.border }}
      >
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
