import { useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Key = keyof typeof breakpoints;

export const useBreakpoint = (): Record<Key, number> => {
  const { width } = useWindowSize();

  return useMemo(
    () =>
      Object.keys(breakpoints).reduce(
        (prev, current) => ({
          ...prev,
          [current]: width > breakpoints[current as Key],
        }),
        {},
      ),
    [width],
  ) as Record<Key, number>;
};
