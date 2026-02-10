import { Link } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, MessageSquare, Search, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';

const NAV_ITEMS = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/messages', icon: MessageSquare, label: 'Chat' },
  { path: '/projects', icon: LayoutGrid, label: 'Projects' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  // 1. Pages where Header, Footer, and Nav are completely hidden (Standalone pages)
  const fullScreenPages = ['/coming-soon', '/404', '/login', '/500', '/maintenance', '/messages', '/tools/planning'];
  const isFullScreen = fullScreenPages.includes(pathname);

  // 2. Level 2 Pages: Hide ONLY the MobileBottomNav
  const isLevel2Page =
    pathname.startsWith('/property/') ||
    pathname.startsWith('/projects/') ||
    pathname.startsWith('/agent/') ||
    pathname.startsWith('/news/') ||
    pathname.startsWith('/tools/') ||
    pathname === '/post';

  const showMobileNav = !isFullScreen && !isLevel2Page;

  return (
    <div
      className={cn('pointer-events-none fixed right-0 bottom-6 left-0 z-100 flex justify-center md:hidden', {
        'translate-y-[200%]': !showMobileNav,
      })}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className='pointer-events-auto flex items-center gap-6 rounded-full border border-white/10 bg-[#1a1a1a] px-6 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md'
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              href={item.path}
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
                <item.icon
                  className={`h-6 w-6 ${isActive ? 'stroke-[2.5px] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'stroke-[1.5px]'}`}
                />

                {/* Unread Badge for Messages */}
                {item.path === '/messages' && (
                  <div className='absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-[#1a1a1a] bg-red-500'></div>
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
