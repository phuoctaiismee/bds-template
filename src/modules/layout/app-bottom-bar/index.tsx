'use client';

import { Link } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import { motion } from 'framer-motion';
import React from 'react';
import { NAV_LINKS } from '../layout.config';
import { useLayoutControl } from '../use-layout-control';

export const MobileBottomNav: React.FC = () => {
  const { showMobileNav, isLinkActive } = useLayoutControl();

  return (
    <div
      className={cn(
        'pointer-events-none fixed right-0 bottom-6 left-0 z-[100] flex justify-center transition-transform duration-500 md:hidden',
        !showMobileNav && 'translate-y-[200%]',
      )}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='pointer-events-auto flex items-center gap-6 rounded-full border border-white/10 bg-[#1a1a1a] px-6 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md'
      >
        {NAV_LINKS.mobile.map((item) => {
          const isActive = isLinkActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className='group relative flex h-10 w-10 items-center justify-center'
            >
              {/* Active Background Glow */}
              {isActive && (
                <motion.div
                  layoutId='nav-glow'
                  className='bg-primary/30 absolute inset-0 rounded-full blur-md'
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  color: isActive ? '#ffffff' : '#888888',
                }}
                className='relative z-10 transition-colors duration-300'
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-6 w-6',
                      isActive ? 'stroke-[2.5px] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'stroke-[1.5px]',
                    )}
                  />
                )}

                {/* Unread Badge for Messages (Ví dụ) */}
                {item.href === '/messages' && (
                  <div className='absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#1a1a1a] bg-red-500' />
                )}
              </motion.div>

              {/* Active Dot */}
              {isActive && (
                <motion.div
                  layoutId='nav-dot'
                  className='bg-primary absolute -bottom-1 h-1 w-1 rounded-full shadow-[0_0_5px_#3b82f6]'
                />
              )}
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
