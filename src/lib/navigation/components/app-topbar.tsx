'use client';
import { useNetworkState } from '@/hooks';
import { cn } from '@/lib/twMerge';
import { IconButton, LinearProgress, Typography } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import { ChevronLeft, Home } from 'lucide-react';
import React, { ComponentProps, FC } from 'react';
import { useRouter } from '../hooks';
import Link from './link';

interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface AppTopbarProps extends ComponentProps<'div'> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  bottom?: React.ReactNode;
  right?: React.ReactNode | false;
  canBack?: boolean;
  canGoHome?: boolean;
  position?: 'fixed' | 'relative';
  breadcrumbs?: Array<BreadcrumbItem>;
  onBack?: () => void;
  centerClassName?: string;
  withSpacing?: boolean;
}

const AppTopbar: FC<AppTopbarProps> = ({
  center: centerFromProps,
  left: leftFromProps,
  right: rightFromProps,
  bottom: bottomFromProps,
  className,
  canBack = true,
  canGoHome = true,
  position = 'fixed',
  onBack,
  title,
  breadcrumbs,
  withSpacing = true,
  centerClassName,
  ...props
}) => {
  const router = useRouter();
  const handleBack = onBack ?? router.back;

  const { isOnline } = useNetworkState();

  const center = centerFromProps ? (
    centerFromProps
  ) : title ? (
    <Typography className='text-content-1 font-medium'>{title}</Typography>
  ) : null;

  const left = leftFromProps ? (
    leftFromProps
  ) : canBack ? (
    <IconButton
      onClick={handleBack}
      className='bg-base-900 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-transform hover:bg-white/10'
    >
      <ChevronLeft size={20} className='text-accent-foreground' />
    </IconButton>
  ) : null;

  const right = rightFromProps ? (
    rightFromProps
  ) : typeof rightFromProps !== 'boolean' && canGoHome ? (
    <IconButton
      component={Link}
      href='/'
      className='bg-base-900 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-transform hover:bg-white/10'
    >
      <Home size={20} className='text-accent-foreground' />
    </IconButton>
  ) : null;

  const isFetching = useIsFetching();
  const hasBreadcrumbs = !!breadcrumbs?.length;

  return (
    <>
      {position === 'fixed' && (
        <div
          className={cn('h-14xl', {
            'h-28': hasBreadcrumbs,
            'h-0!': !withSpacing,
          })}
        />
      )}

      <header
        className={cn(
          'pt-safe-top bg-base-950/80 top-0 left-0 z-100 w-full border-b border-white/5 px-4 backdrop-blur-xl',
          {
            fixed: position === 'fixed',
            relative: position === 'relative',
          },
          className,
        )}
        {...props}
      >
        <div className='h-14xl relative flex items-center justify-between gap-2'>
          <div>{left}</div>

          <div
            className={cn(
              'absolute top-1/2 left-1/2 w-[calc(100%-140px)] -translate-1/2',
              {
                'left-[calc(50%-35px)] w-[calc(100%-70px)] px-6': !left,
              },
              centerClassName,
            )}
          >
            {center}
          </div>

          <div>{right}</div>
        </div>
        {bottomFromProps}
      </header>

      {hasBreadcrumbs && (
        <div className='bg-background fixed top-[80px] left-0 z-100 flex h-8 w-full items-center border-b border-white/10 px-4'>
          <nav className='flex-1'>
            <ul className='flex items-center'>
              {breadcrumbs?.map((breadcrumb) => (
                <li key={breadcrumb.url} className='text-neutral-1 text-xs'>
                  {breadcrumb.label}
                </li>
              ))}
            </ul>
          </nav>

          <span
            className={cn('text-primary text-[10px] font-semibold uppercase', {
              'text-error': !isOnline,
            })}
          >
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      )}

      {isFetching > 0 && <LinearProgress className='fixed top-[80px] left-0 z-1000 w-full' />}
    </>
  );
};

export default AppTopbar;
