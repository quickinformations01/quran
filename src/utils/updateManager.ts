export const APP_VERSION = 'v3.2.0';

export interface UpdateInfo {
  hasUpdate: boolean;
  version: string;
}

export const checkForAppUpdates = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  // Check if saved version matches current APP_VERSION
  const savedVersion = localStorage.getItem('alquran_app_version');
  if (!savedVersion) {
    localStorage.setItem('alquran_app_version', APP_VERSION);
    return false;
  }

  return savedVersion !== APP_VERSION;
};

export const forceAppUpdateAndClearCache = async (clearLocalStorage = true) => {
  try {
    // 1. Unregister Service Workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('[SW] Service Worker unregistered for update');
      }
    }

    // 2. Clear all cache storages
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
        console.log('[SW] Cache deleted:', key);
      }
    }

    // 3. Explicitly clear localStorage if requested
    if (clearLocalStorage) {
      localStorage.clear();
    }

    // Update version in localStorage
    localStorage.setItem('alquran_app_version', APP_VERSION);

    // 4. Force hard reload via window.location.reload(true)
    try {
      (window.location as any).reload(true);
    } catch {
      window.location.reload();
    }
  } catch (err) {
    console.error('Error clearing app cache and updating:', err);
    try {
      (window.location as any).reload(true);
    } catch {
      window.location.reload();
    }
  }
};
