'use client';

import { Link } from '@/lib/navigation';
import { cn } from '@/lib/twMerge'; // Utility merge class
import { useAuthStore } from '@/stores/auth';
import { Bell, MessageCircle, User } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

// 1. Tách cấu hình Menu ra ngoài để dễ bảo trì
export const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/search', label: 'Mua bán' },
  { href: '/search?type=rent', label: 'Cho thuê', matchParams: { type: 'rent' } },
  { href: '/projects', label: 'Dự án' },
  { href: '/news', label: 'Tin tức' },
];

export type AppHeaderProps = object;

const AppHeader: FC<AppHeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();

  const isAuthenticated = !!user;
  const isHomePage = pathname === '/';

  // 2. Xử lý Scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Chỉ update state khi trạng thái thực sự thay đổi để giảm re-render
      setIsScrolled((prev) => (offset > 20 ? true : false));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Logic xác định Style giao diện (Transparent vs Solid)
  const isTransparent = isHomePage && !isScrolled;
  const fullScreenPages = ['/coming-soon', '/404', '/login', '/500', '/maintenance', '/messages', '/tools/planning'];
  const isFullScreen = fullScreenPages.includes(pathname) || pathname.startsWith('/projects/');
  const shouldShow = !isFullScreen;

  // Class styles cơ bản
  const baseTextColor = isTransparent ? 'text-white hover:text-white/90' : 'text-gray-600 hover:text-primary';
  const activeTextColor = isTransparent ? 'text-white font-bold border-b-2 border-white' : 'text-primary font-bold';
  const logoColor = isTransparent ? 'text-white' : 'text-brand-primary';

  // Helper check active link
  const isLinkActive = (path: string, matchParams?: Record<string, string>) => {
    // Check params (ví dụ: ?type=rent)
    if (matchParams) {
      return Object.entries(matchParams).every(([key, value]) => searchParams.get(key) === value);
    }
    // Check path chính xác (hoặc startsWith nếu muốn highlight menu con)
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path) && !searchParams.toString();
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white/95 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-4 md:py-6',
          !shouldShow && '-translate-y-full',
        )}
      >
        <div className='container mx-auto flex items-center justify-between px-4 md:px-6'>
          {/* --- LOGO --- */}
          <Link href='/' className='group z-50 flex items-center gap-2'>
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg text-xl font-bold transition-transform group-hover:scale-110 md:h-9 md:w-9',
                isTransparent ? 'text-primary bg-white' : 'from-primary to-secondary bg-linear-to-tr text-white',
              )}
            >
              A
            </div>
            <span className={cn('text-lg font-bold tracking-tight transition-colors md:text-xl', logoColor)}>
              Aetheria.vn
            </span>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <div
            className={cn(
              'hidden items-center gap-8 rounded-full px-6 py-2 transition-all md:flex',
              isScrolled
                ? 'border border-gray-200 bg-gray-100/50'
                : isTransparent && 'border border-white/10 bg-black/10 backdrop-blur-sm',
            )}
          >
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href, link.matchParams);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('text-sm font-semibold transition-colors', isActive ? activeTextColor : baseTextColor)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className='z-50 flex items-center gap-2 md:gap-4'>
            {/* Icons Group */}
            <div className='flex items-center gap-1 md:gap-2'>
              <Link
                href='/messages'
                className={cn('relative p-2 transition-colors', baseTextColor)}
                aria-label='Tin nhắn'
              >
                <MessageCircle className='h-5 w-5' />
                {isAuthenticated && (
                  <span className='absolute top-1 right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500' />
                )}
              </Link>

              <Link
                href='/notifications'
                className={cn('relative p-2 transition-colors', baseTextColor)}
                aria-label='Thông báo'
              >
                <Bell className='h-5 w-5' />
                {isAuthenticated && (
                  <span className='absolute top-2 right-2 h-2 w-2 rounded-full border border-white bg-red-500' />
                )}
              </Link>
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Link
                href='/profile'
                className={cn(
                  'hidden cursor-pointer items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-all hover:shadow-md md:flex',
                  isTransparent
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'text-brand-primary border-gray-200 bg-white',
                )}
              >
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?u=default'}
                  alt={user?.first_name || 'User'}
                  className='h-8 w-8 rounded-full border border-white object-cover'
                />
                <span
                  className={cn(
                    'max-w-25 truncate text-xs font-bold',
                    isTransparent ? 'text-white' : 'text-brand-primary',
                  )}
                >
                  {user?.first_name}
                </span>
              </Link>
            ) : (
              <Link
                href='/login'
                className={cn(
                  'hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all md:flex',
                  isTransparent ? 'text-white hover:bg-white/20' : 'text-brand-primary hover:bg-gray-100',
                )}
              >
                <User className='h-4 w-4' />
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer để tránh nội dung bị che mất khi header fixed (chỉ hiện khi không ở trang chủ) */}
      {!isHomePage && (
        <div
          className={cn('h-20', {
            'h-0': !shouldShow,
          })}
        />
      )}
    </>
  );
};

export default AppHeader;
