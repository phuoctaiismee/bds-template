import { useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FULLSCREEN_PATHS, HEADER_HIDDEN_PREFIXES, MOBILE_HIDDEN_PREFIXES } from './layout.config';

export const useLayoutControl = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // --- 1. SCROLL LOGIC (Powered by Framer Motion) ---
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isOverThreshold = latest > 20; // Ngưỡng scroll 20px
    if (isOverThreshold !== isScrolled) {
      setIsScrolled(isOverThreshold);
    }
  });

  // --- 2. VISIBILITY LOGIC ---
  const visibility = useMemo(() => {
    const isFullScreen = FULLSCREEN_PATHS.includes(pathname);
    const isMobileHiddenLevel2 = MOBILE_HIDDEN_PREFIXES.some(prefix => pathname.startsWith(prefix));
    const isHeaderHiddenSpecial = HEADER_HIDDEN_PREFIXES.some(prefix => pathname.startsWith(prefix));

    return {
      showHeader: !isFullScreen && !isHeaderHiddenSpecial,
      showFooter: !isFullScreen,
      showMobileNav: !isFullScreen && !isMobileHiddenLevel2,
      isHomePage: pathname === '/',
    };
  }, [pathname]);

  // --- 3. ACTIVE LINK HELPER ---
  const isLinkActive = (href: string, query?: Record<string, string>) => {
    if (query) {
      return Object.entries(query).every(([key, value]) => searchParams.get(key) === value);
    }
    if (href === '/' && pathname !== '/') return false;
    return pathname.startsWith(href) && (!query ? !searchParams.toString() : true);
  };

  return {
    ...visibility,
    isScrolled,
    isLinkActive,
  };
};