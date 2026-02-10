'use client';
import { Link } from '@/lib/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, HardHat } from 'lucide-react';
import React from 'react';

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
}

export const ComingSoonScreen: React.FC<ComingSoonProps> = ({
  title = 'Tính năng đang phát triển',
  subtitle = 'Chúng tôi đang nỗ lực hoàn thiện trang này để mang lại trải nghiệm tốt nhất cho bạn.',
}) => {
  return (
    <div className='bg-brand-primary relative flex min-h-screen items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop'
          alt='Building'
          className='h-full w-full object-cover opacity-20'
        />
        <div className='from-brand-primary via-brand-primary/80 absolute inset-0 bg-linear-to-t to-transparent' />
      </div>

      <div className='relative z-10 container mx-auto px-6 text-center text-white'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className='mx-auto max-w-3xl'
        >
          <div className='bg-primary shadow-primary/30 mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl'>
            <HardHat className='h-10 w-10 text-white' />
          </div>

          <h1 className='mb-6 text-4xl leading-tight font-extrabold md:text-6xl'>
            Excellence takes time.
            <br />
            <span className='from-secondary bg-linear-to-r to-blue-400 bg-clip-text text-transparent'>{title}</span>
          </h1>

          <p className='mb-12 text-lg leading-relaxed text-gray-400 md:text-xl'>
            {subtitle} <br />
            Đăng ký để nhận thông báo ngay khi tính năng này ra mắt.
          </p>

          <div className='mx-auto mb-12 flex max-w-112 flex-col gap-2 sm:flex-row'>
            <input
              type='email'
              placeholder='Email của bạn...'
              className='focus:border-primary flex-1 rounded-xl border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-gray-500 backdrop-blur-sm focus:outline-none'
            />
            <button className='bg-primary rounded-xl px-8 py-4 font-bold text-white transition-colors hover:bg-blue-600'>
              Thông báo
            </button>
          </div>

          <Link
            href='/'
            className='inline-flex items-center gap-2 font-semibold text-gray-400 transition-colors hover:text-white'
          >
            Khám phá trang chủ <ArrowRight className='h-4 w-4' />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
