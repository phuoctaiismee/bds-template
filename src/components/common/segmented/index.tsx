'use client';

import { cn } from '@/lib/twMerge';
import { animated, config, useSpring } from '@react-spring/web';
import React from 'react';

interface Option {
  value: string | number;
  label: string | React.ReactNode;
}

interface SegmentedControlProps {
  options: (Option | string)[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  itemClassName?: string;
  itemActiveClassNam?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className,
  itemClassName,
  itemActiveClassNam,
}) => {
  const items = options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));
  const activeIndex = items.findIndex((item) => item.value === value);

  const [springProps] = useSpring(
    () => ({
      width: `calc((100% - 8px) / ${items.length})`,
      left: `calc(4px + ${activeIndex} * (100% - 8px) / ${items.length})`,

      config: { ...config.stiff, clamp: true },
    }),
    [activeIndex, items.length],
  );

  return (
    <div className={cn('bg-base-900 relative flex w-full rounded-lg p-1', className)}>
      {/* Animated Background */}
      <animated.div
        className='absolute top-1 bottom-1 rounded-md bg-white/10 shadow-sm'
        style={{
          left: springProps.left,
          width: springProps.width,
          zIndex: 0,
        }}
      />

      {/* Button Items */}
      {items.map((item) => {
        const isActive = value === item.value;
        return (
          <button
            key={item.value}
            type='button'
            onClick={() => onChange(item.value)}
            className={cn(
              'relative z-10 min-w-0 whitespace-nowrap flex-1 py-2 text-xs font-bold transition-colors duration-200 outline-none',
              isActive ? 'text-white' : 'text-accent-foreground/80 hover:text-white/60',
              itemClassName,
              {
                [itemActiveClassNam || '']: isActive,
              },
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
