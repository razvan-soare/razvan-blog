'use client';

import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'site-likes';

interface UseSiteLikesReturn {
  likes: number;
  isLiked: boolean;
  toggleLike: () => void;
}

function getLikesFromStorage(): number {
  if (typeof window === 'undefined') return 0;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading site likes from localStorage:', error);
  }

  return 0;
}

function saveLikesToStorage(likes: number): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, likes.toString());
    window.dispatchEvent(new StorageEvent('storage', { key: STORAGE_KEY }));
  } catch (error) {
    console.error('Error saving site likes to localStorage:', error);
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

export function useSiteLikes(): UseSiteLikesReturn {
  const getSnapshot = useCallback(() => getLikesFromStorage(), []);
  const getServerSnapshot = useCallback(() => 0, []);

  const likes = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleLike = useCallback(() => {
    const currentLikes = getLikesFromStorage();
    const newLikes = currentLikes > 0 ? 0 : 1;
    saveLikesToStorage(newLikes);
    notifySubscribers();
  }, []);

  return {
    likes,
    isLiked: likes > 0,
    toggleLike,
  };
}
