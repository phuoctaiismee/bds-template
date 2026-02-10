'use client';
import { cn } from '@/lib/twMerge';
import { usePathname } from 'next/navigation';
import React from 'react';

export const AppFooter: React.FC = () => {
  const pathname = usePathname();
  const fullScreenPages = ['/coming-soon', '/404', '/login', '/500', '/maintenance', '/messages', '/tools/planning'];
  const isFullScreen = fullScreenPages.includes(pathname);
  const shouldShow = !isFullScreen;

  return (
    <footer className={cn('border-t border-gray-100 bg-white pt-12 pb-8 md:pt-16', !shouldShow && 'hidden')}>
      <div className='container mx-auto px-6'>
        <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4'>
          <div className='md:col-span-1'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr font-bold text-white'>
                A
              </div>
              <span className='text-brand-primary text-xl font-bold'>Aetheria.vn</span>
            </div>
            <p className='mb-4 text-sm leading-relaxed text-gray-500'>
              Nền tảng công nghệ bất động sản tiên phong, mang lại trải nghiệm tìm kiếm và giao dịch tốt nhất cho người
              dùng.
            </p>
          </div>

          <div>
            <h4 className='text-brand-primary mb-4 font-bold'>Về chúng tôi</h4>
            <ul className='space-y-2 text-sm text-gray-500'>
              <li>
                <a href='#' className='hover:text-primary'>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Quy chế hoạt động
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-brand-primary mb-4 font-bold'>Hỗ trợ khách hàng</h4>
            <ul className='space-y-2 text-sm text-gray-500'>
              <li>
                <a href='#' className='hover:text-primary'>
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Quy định đăng tin
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Giải quyết khiếu nại
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-primary'>
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-brand-primary mb-4 font-bold'>Kết nối</h4>
            <div className='mb-4 flex gap-3'>
              <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white'>
                f
              </div>
              <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-sky-500 hover:text-white'>
                in
              </div>
              <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-red-500 hover:text-white'>
                yt
              </div>
            </div>
            <p className='text-xs text-gray-400'>Đăng ký nhận tin tức mới nhất</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 text-center text-xs text-gray-500 md:flex-row md:gap-0 md:text-left'>
          <p>© 2024 Aetheria Vietnam. All rights reserved.</p>
          <p>Thiết kế bởi Đội ngũ Aetheria.</p>
        </div>
      </div>
    </footer>
  );
};
