'use client';
import { AppTopbar } from '@/lib/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@mui/material';
import { FC } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <AppTopbar title='Đã xảy ra lỗi' />

      <div className='flex min-h-[calc(100dvh-80px)] flex-col items-center justify-center gap-4 px-6 pb-[80px]'>
        <div className='text-error flex size-50 items-center justify-center rounded-full bg-black/20'>
          <ExclamationCircleIcon className='size-20' />
        </div>

        <div className='text-center'>
          <p className='text-2xl font-semibold'>{error.name}</p>
          <p className='text-lg'>{error.message}</p>
        </div>

        <Button onClick={reset} fullWidth className='bg-white/10 text-white'>
          Thử lại
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
