'use client';
import { useEffect, useState } from 'react';

export const useNetworkState = () => {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.navigator.onLine;
  });
  const [showBanner, setShowBanner] = useState(!isOnline);

  useEffect(() => {
    const onlineHandler = () => {
      setIsOnline(true);
      setTimeout(() => setShowBanner(false), 1_000); // hide offline banner after 1s
    };
    const offlineHandler = () => {
      setIsOnline(false);
      setShowBanner(true); // show offline banner
    };

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  return {
    isOnline,
    showBanner,
  };
};
