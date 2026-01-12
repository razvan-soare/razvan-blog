'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'theme-preference';

export type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return 'dark';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
  }

  return 'dark';
}

function saveThemeToStorage(theme: Theme): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
}

function applyTheme(theme: Theme, withTransition = false): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (withTransition) {
    // Add transition class for smooth color change
    root.classList.add('theme-transition');

    // Remove transition class after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
  }

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

const subscribers = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  subscribers.add(callback);

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);

  return () => {
    subscribers.delete(callback);
    window.removeEventListener('storage', storageHandler);
  };
}

function notifySubscribers(): void {
  subscribers.forEach((callback) => callback());
}

export function useTheme(): UseThemeReturn {
  const getSnapshot = useCallback(() => getThemeFromStorage(), []);
  const getServerSnapshot = useCallback((): Theme => 'dark', []);

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    saveThemeToStorage(newTheme);
    applyTheme(newTheme, true);
    notifySubscribers();
  }, []);

  const toggleTheme = useCallback(() => {
    const currentTheme = getThemeFromStorage();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [setTheme]);

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
}

// Initialize theme on first load (client-side only)
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;

  const theme = getThemeFromStorage();
  applyTheme(theme);
}
