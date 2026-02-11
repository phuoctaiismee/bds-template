'use client';

import { Link } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import { useAuthStore } from '@/stores/auth';
import { Badge, BadgeProps, CardActionArea, IconButton } from '@mui/material';
import { Bell, MessageCircle, User } from 'lucide-react';
import { FC, memo, useMemo } from 'react';
import { NAV_LINKS } from '../layout.config';
import { useLayoutControl } from '../use-layout-control';

// --- 1. STYLES & THEME CONFIG ---

/** Tạo bộ class style dựa trên trạng thái Transparent */
const getHeaderTheme = (isTransparent: boolean) => ({
  text: isTransparent ? 'text-white hover:text-white/90' : 'text-gray-600 hover:text-primary',
  activeText: isTransparent ? 'text-white font-bold border-b-2 border-white' : 'text-primary font-bold',
  logoText: isTransparent ? 'text-white' : 'text-brand-primary',
  logoBg: isTransparent ? 'text-primary bg-white' : 'bg-gradient-to-tr from-primary to-secondary text-white',
  navContainer: isTransparent ? 'border-white/10 bg-black/10 backdrop-blur-sm' : 'border-gray-200 bg-gray-100/50',
  authBtn: isTransparent
    ? 'border-white/20 bg-transparent text-white hover:bg-white/20'
    : 'text-brand-primary border-gray-200',
});

/** Cấu hình Badge Material UI cho gọn code */
const BADGE_CONFIG: Partial<BadgeProps> = {
  variant: 'dot',
  color: 'error',
  slotProps: {
    badge: { className: 'top-2.5 right-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 animate-pulse' },
  },
};

// --- 2. SUB-COMPONENTS (Tách nhỏ để dễ đọc và quản lý) ---

const HeaderLogo: FC<{ theme: ReturnType<typeof getHeaderTheme> }> = memo(({ theme }) => (
  <Link href='/' className='group z-50 flex w-fit items-center gap-2 rounded-md'>
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg text-xl font-bold transition-all md:h-9 md:w-9',
        theme.logoBg,
      )}
    >
      A
    </div>
    <span className={cn('text-lg font-bold tracking-tight transition-colors md:text-xl', theme.logoText)}>
      Aetheria.vn
    </span>
  </Link>
));
HeaderLogo.displayName = 'HeaderLogo';

const DesktopNav: FC<{
  theme: ReturnType<typeof getHeaderTheme>;
  isScrolled: boolean;
  isLinkActive: (href: string, query?: Record<string, string>) => boolean;
}> = memo(({ theme, isScrolled, isLinkActive }) => (
  <div
    className={cn(
      'hidden items-center gap-8 rounded-full border px-6 py-2 transition-all md:flex',
      theme.navContainer,
      // Fix: Khi ở trang chủ chưa scroll thì ẩn nền đi cho đẹp
    //   !isScrolled && theme.navContainer.includes('bg-black') && 'border-transparent bg-transparent',
    )}
  >
    {NAV_LINKS.desktop.map((link) => {
      const isActive = isLinkActive(link.href, link.query);
      const href = link.query ? `${link.href}?${new URLSearchParams(link.query)}` : link.href;

      return (
        <Link
          key={`${link.href}-${link.label}`}
          href={href}
          className={cn('text-sm font-semibold transition-colors', isActive ? theme.activeText : theme.text)}
        >
          {link.label}
        </Link>
      );
    })}
  </div>
));
DesktopNav.displayName = 'DesktopNav';

const HeaderActions: FC<{
  theme: ReturnType<typeof getHeaderTheme>;
  isAuthenticated: boolean;
  user: any;
}> = memo(({ theme, isAuthenticated, user }) => (
  <div className='z-50 flex items-center gap-2 md:gap-4'>
    <div className='flex items-center gap-1 md:gap-2'>
      <Badge invisible={!isAuthenticated} {...BADGE_CONFIG}>
        <IconButton LinkComponent={Link} href='/messages' className={cn('relative p-2 bg-transparent', theme.text)}>
          <MessageCircle className='h-5 w-5' />
        </IconButton>
      </Badge>
      <Badge invisible={!isAuthenticated} {...BADGE_CONFIG}>
        <IconButton LinkComponent={Link} href='/notifications' className={cn('relative p-2 bg-transparent', theme.text)}>
          <Bell className='h-5 w-5' />
        </IconButton>
      </Badge>
    </div>

    {isAuthenticated ? (
      <CardActionArea
        LinkComponent={Link}
        href='/profile'
        className={cn(
          'hidden cursor-pointer items-center gap-2 rounded-full border py-1 pr-4 pl-1 transition-all hover:shadow-md md:flex',
          theme.authBtn,
        )}
      >
        <img
          src={user?.avatar || 'https://i.pravatar.cc/150?u=default'}
          alt={user?.first_name}
          className='h-8 w-8 rounded-full border border-white object-cover'
        />
        <span className={cn('max-w-25 truncate text-xs font-bold', theme.logoText)}>{user?.first_name}</span>
      </CardActionArea>
    ) : (
      <CardActionArea
        LinkComponent={Link}
        href='/login'
        className={cn('hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold md:flex', theme.authBtn)}
      >
        <User className='h-4 w-4' />
        Đăng nhập
      </CardActionArea>
    )}
  </div>
));
HeaderActions.displayName = 'HeaderActions';

// --- 3. MAIN COMPONENT ---

const AppHeader: FC = () => {
  // Logic lấy từ Hook (đã bao gồm Scroll logic từ Framer Motion)
  const { showHeader, isHomePage, isLinkActive, isScrolled } = useLayoutControl();
  const { user } = useAuthStore();

  // Tính toán Theme
  const isTransparent = isHomePage && !isScrolled;
  const theme = useMemo(() => getHeaderTheme(isTransparent), [isTransparent]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white/95 py-3 shadow-sm backdrop-blur-md' : 'bg-transparent py-4 md:py-6',
          !showHeader && '-translate-y-full',
        )}
      >
        <div className='container mx-auto flex items-center justify-between px-4 md:px-6'>
          <HeaderLogo theme={theme} />
          <DesktopNav theme={theme} isScrolled={isScrolled} isLinkActive={isLinkActive} />
          <HeaderActions theme={theme} isAuthenticated={!!user} user={user} />
        </div>
      </nav>

      {/* Spacer (chỉ hiện khi không ở Home và Header đang hiển thị) */}
      {!isHomePage && showHeader && <div className='h-20' />}
    </>
  );
};

export default AppHeader;
