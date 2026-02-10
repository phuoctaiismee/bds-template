'use client';

import { AppTopbar, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import { IconButton, IconButtonProps } from '@mui/material';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

// --- 1. Main Component ---
interface AppBarScrollableProps {
  isScrolled: boolean;
  left?: React.ReactNode;
  center?: React.ReactNode;
  bottom?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  onBack?: () => void;
}

export const AppBarScrollable: React.FC<AppBarScrollableProps> = ({
  isScrolled,
  left,
  center,
  bottom,
  right,
  className,
  onBack,
}) => {
  const router = useRouter();
  const handleBack = onBack ?? router.back;
  const leftComp = left ? (
    left
  ) : (
    <ScrollableIconButton isScrolled={isScrolled} onClick={handleBack}>
      <ChevronLeft size={20} />
    </ScrollableIconButton>
  );
  return (
    <AppTopbar
      withSpacing={false}
      className={cn(
        'transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-base-950/90 border-b border-white/5 shadow-md backdrop-blur-xl'
          : 'border-b-0 border-transparent bg-transparent backdrop-blur-none',
        className,
      )}
      left={leftComp}
      center={
        <div
          className={cn(
            'flex flex-col items-center transition-opacity duration-300 ease-in-out',
            isScrolled ? 'opacity-100' : 'opacity-0',
          )}
        >
          {center}
        </div>
      }
      right={right}
      bottom={bottom}
    />
  );
};

// --- 2. Helper Component cho Button ---
// Giúp tự động đổi style nút khi scroll mà không cần viết lại class
interface ScrollableIconButtonProps extends IconButtonProps {
  isScrolled: boolean;
}

export const ScrollableIconButton: React.FC<ScrollableIconButtonProps> = ({
  isScrolled,
  className,
  children,
  ...props
}) => {
  return (
    <IconButton
      className={cn(
        'size-10 rounded-full transition-all duration-300 ease-in-out active:scale-95',
        // Style khi Scrolled (Nền tối, viền nhẹ)
        isScrolled
          ? 'bg-base-900 border border-white/10 text-white hover:bg-white/10'
          : // Style khi Top (Trong suốt, mờ nhẹ)
            'border-transparent bg-black/20 text-white backdrop-blur-md hover:bg-black/40',
        className,
      )}
      {...props}
    >
      {children}
    </IconButton>
  );
};
