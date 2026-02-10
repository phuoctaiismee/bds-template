'use client';
import { useRouter as useNextRouter } from 'next/navigation';

export const useRouter = (): ReturnType<typeof useNextRouter> => {
  const router = useNextRouter();
  return {
    ...router,
    back() {
      if (window.history.length <= 2) {
        router.replace('/');
        return;
      }

      if (document.referrer) {
        const referrer = new URL(document.referrer);
        if (referrer.host !== window.location.host) {
          return router.replace('..');
        }
      }
      router.back();
    },
  };
};
