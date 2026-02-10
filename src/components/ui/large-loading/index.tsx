'use client';
import { cn } from '@/lib/twMerge';
import { ComponentProps, FC } from 'react';
import CircleLoading from '../circle-loading';

type LargeLoadingUIProps = ComponentProps<'div'>;

const LargeLoadingUI: FC<LargeLoadingUIProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden', className)}
      {...props}
    >
      <CircleLoading />
    </div>
  );
};

export default LargeLoadingUI;
