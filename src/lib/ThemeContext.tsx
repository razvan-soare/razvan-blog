'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  isLightTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isLightTheme: false,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isLight = saved === 'light';
    setIsLightTheme(isLight);
    document.documentElement.classList.toggle('light', isLight);
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsLightTheme(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'light' : 'dark');
      document.documentElement.classList.toggle('light', next);
      return next;
    });
  }, []);

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ isLightTheme: false, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
