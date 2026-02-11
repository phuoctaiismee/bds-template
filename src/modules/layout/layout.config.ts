import { Facebook, Home, LayoutGrid, Linkedin, LucideIcon, MessageSquare, Search, User, Youtube } from 'lucide-react';


interface NavItem {
  href: string;
  icon?: LucideIcon;
  label: string;
  query?: Record<string, string>;
}
// --- DANH SÁCH MENU ---
export const NAV_LINKS: Record<'desktop' | 'mobile', NavItem[]> = {
  desktop: [
    { href: '/', label: 'Trang chủ' },
    { href: '/search', label: 'Mua bán' },
    { href: '/search', label: 'Cho thuê', query: { type: 'rent' } },
    { href: '/projects', label: 'Dự án' },
    { href: '/news', label: 'Tin tức' },
  ],
  mobile: [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/messages', icon: MessageSquare, label: 'Chat' },
    { href: '/projects', icon: LayoutGrid, label: 'Projects' },
    { href: '/profile', icon: User, label: 'Profile' },
  ],
} as const;

// --- CẤU HÌNH ẨN HIỆN ---
// 1. Các trang Fullscreen (Ẩn tất cả Header/Footer/MobileNav)
export const FULLSCREEN_PATHS = [
  '/coming-soon',
  '/404',
  '/login',
  '/500',
  '/maintenance',
  '/messages',
  '/tools/planning',
];

// 2. Các trang Level 2 (Chỉ ẩn Mobile Nav, vẫn hiện Header/Footer)
// Dùng startsWith để check
export const MOBILE_HIDDEN_PREFIXES = ['/property/', '/projects/', '/agent/', '/news/', '/tools/', '/post'];

// 3. Các trang Header cần ẩn (ngoài fullscreen)
export const HEADER_HIDDEN_PREFIXES = [
  '/projects/', // Ví dụ: trang chi tiết dự án muốn custom header riêng
];



export const FOOTER_SECTIONS = [
  {
    title: 'Về chúng tôi',
    links: [
      { label: 'Giới thiệu', href: '/about' },
      { label: 'Tuyển dụng', href: '/careers' },
      { label: 'Quy chế hoạt động', href: '/terms' },
      { label: 'Chính sách bảo mật', href: '/privacy' },
    ],
  },
  {
    title: 'Hỗ trợ khách hàng',
    links: [
      { label: 'Trung tâm trợ giúp', href: '/help-center' },
      { label: 'Quy định đăng tin', href: '/posting-rules' },
      { label: 'Giải quyết khiếu nại', href: '/complaints' },
      { label: 'Liên hệ', href: '/contact' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { 
    icon: Facebook, 
    href: 'https://facebook.com', 
    colorClass: 'hover:bg-blue-600 hover:text-white' 
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com', 
    colorClass: 'hover:bg-sky-500 hover:text-white' 
  },
  { 
    icon: Youtube, 
    href: 'https://youtube.com', 
    colorClass: 'hover:bg-red-500 hover:text-white' 
  },
];