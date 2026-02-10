import { useEffect, useMemo, useState } from 'react';
import { FilterState, INITIAL_FILTERS } from './contants';

export const useFilterLogic = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const handleSingleSelect = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key: 'direction' | 'legal' | 'amenities', value: string) => {
    setFilters((prev) => {
      const list = prev[key];
      return list.includes(value)
        ? { ...prev, [key]: list.filter((item) => item !== value) }
        : { ...prev, [key]: [...list, value] };
    });
  };

  const handlePriceQuickSelect = (min: string, max: string) => {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const activeFilterCount = useMemo(
    () =>
      Object.values(filters)
        .flat()
        .filter((v) => v !== '' && v !== 'any').length,
    [filters],
  );

  return { filters, handleSingleSelect, handleMultiSelect, handlePriceQuickSelect, resetFilters, activeFilterCount };
};

export const useHeroCarousel = <T,>(items: T[], isPaused: boolean, interval = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, isPaused, interval]);

  return { currentIndex, currentData: items[currentIndex] };
};


export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
};