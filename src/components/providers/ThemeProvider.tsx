'use client';

import { useEffect } from 'react';
import { initializeTheme } from '@/lib/hooks';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <>{children}</>;
}
