import { cn } from '@/lib/twMerge';
import { CircularProgress, Typography } from '@mui/material';
import { ComponentProps, FC } from 'react';

type CircleLoadingProps = ComponentProps<'div'> & {
  message?: string;
};

const CircleLoading: FC<CircleLoadingProps> = ({ className, message, ...props }) => {
  return (
    <div {...props} className={cn('flex min-h-50 flex-col items-center justify-center gap-2', className)}>
      <CircularProgress color='primary' />
      {message && <Typography className='text-neutral-2 text-center font-normal'>{message}</Typography>}
    </div>
  );
};

export default CircleLoading;
