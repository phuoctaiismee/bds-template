'use client';

import { Link } from '@/lib/navigation'; // Hoặc import từ 'next/link'
import { cn } from '@/lib/twMerge';
import { IconButton } from '@mui/material';
import { FC, memo } from 'react';
import { FOOTER_SECTIONS, SOCIAL_LINKS } from '../layout.config';
import { useLayoutControl } from '../use-layout-control';

const FooterColumn: FC<{ title: string; links: { label: string; href: string }[] }> = memo(({ title, links }) => (
  <div>
    <h4 className='text-brand-primary mb-4 font-bold'>{title}</h4>
    <ul className='space-y-2 text-sm text-gray-500'>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className='hover:text-primary transition-colors'>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
));
FooterColumn.displayName = 'FooterColumn';

// 2. Nhóm Social Media Icons
const SocialGroup: FC = memo(() => (
  <div className='flex gap-3'>
    {SOCIAL_LINKS.map(({ icon: Icon, href, colorClass }, index) => (
      <IconButton
        key={index}
        component='a' // Render thẻ a để tốt cho SEO
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors',
          colorClass,
        )}
        size='small'
      >
        <Icon className='h-4 w-4' />
      </IconButton>
    ))}
  </div>
));
SocialGroup.displayName = 'SocialGroup';

// --- MAIN COMPONENT ---

export const AppFooter: FC = () => {
  const { showFooter } = useLayoutControl();

  if (!showFooter) return null;

  return (
    <footer className='border-t border-gray-100 bg-white pt-12 pb-8 md:pt-16'>
      <div className='container mx-auto px-6'>
        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4'>
          {/* Cột 1: Branding & Info */}
          <div className='md:col-span-1'>
            <Link href='/' className='group mb-4 flex w-fit items-center gap-2'>
              <div className='from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr font-bold text-white transition-opacity group-hover:opacity-90'>
                A
              </div>
              <span className='text-brand-primary text-xl font-bold'>Aetheria.vn</span>
            </Link>
            <p className='mb-4 text-sm leading-relaxed text-gray-500'>
              Nền tảng công nghệ bất động sản tiên phong, mang lại trải nghiệm tìm kiếm và giao dịch tốt nhất.
            </p>
          </div>

          {/* Cột 2 & 3: Render Dynamic từ Config */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterColumn key={section.title} title={section.title} links={section.links} />
          ))}

          {/* Cột 4: Kết nối */}
          <div>
            <h4 className='text-brand-primary mb-4 font-bold'>Kết nối</h4>
            <div className='mb-4'>
              <SocialGroup />
            </div>
            <p className='text-xs text-gray-400'>Đăng ký nhận tin tức mới nhất</p>
          </div>
        </div>

        {/* Copyright */}
        <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-center text-xs text-gray-500 md:flex-row md:gap-0 md:text-left'>
          <p>© {new Date().getFullYear()} Aetheria Vietnam. All rights reserved.</p>
          <p>Thiết kế bởi Đội ngũ Aetheria.</p>
        </div>
      </div>
    </footer>
  );
};
