'use client'
import { useEffect, useRef, useState } from 'react';

/**
 * Hook theo dõi sự kiện scroll của một phần tử
 * @param threshold Ngưỡng pixel để kích hoạt trạng thái isScrolled (mặc định 50px)
 */
export const useScrollObserver = <T extends HTMLElement = HTMLDivElement>(threshold = 50) => {
  const scrollRef = useRef<T>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const handleScroll = () => {
      // Tối ưu: Chỉ set state khi giá trị thực sự thay đổi để hạn chế re-render
      const isOverThreshold = element.scrollTop > threshold;
      setIsScrolled((prev) => (prev !== isOverThreshold ? isOverThreshold : prev));
    };

    element.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollRef, isScrolled };
};
