'use client';

import { cn } from '@/lib/twMerge';
import { Button, CardActionArea } from '@mui/material';
import { Search, Star } from 'lucide-react';
import React, { useState } from 'react'; // Import useEffect cho hooks
import HeroBackground from './back-ground';
import BottomStats from './bottom-stats';
import { HERO_IMAGES, POPULAR_TAGS } from './contants';
import SearchModal from './search-modal';
import SpotlightCard from './spotlight-card';
import { useHeroCarousel, useScrollLock } from './use-hero';

// --- MAIN COMPONENT ---
export const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buy');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 1. Logic Carousel gọn gàng
  const { currentIndex, currentData } = useHeroCarousel(HERO_IMAGES, isSearchFocused);

  // 2. Logic Scroll Lock
  useScrollLock(isSearchFocused);

  return (
    <section className='relative flex h-svh w-full touch-pan-y flex-col justify-center overflow-hidden'>
      {/* 1. Background Slider */}
      <HeroBackground currentIndex={currentIndex} />

      {/* 2. Main Center Content */}
      <div className='relative z-10 container mx-auto flex flex-1 flex-col justify-center px-4 md:px-6'>
        <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12'>
          {/* Left Column */}
          <div className='lg:col-span-8'>
            {/* Headline */}
            <div
              className={cn(
                'mb-8 text-center transition-all duration-500 lg:text-left',
                isSearchFocused ? 'pointer-events-none translate-y-10 opacity-0' : 'translate-y-0 opacity-100',
              )}
            >
              <div className='mb-4 inline-flex cursor-default items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase shadow-lg backdrop-blur-md transition-colors hover:bg-white/20 md:mb-6 md:px-4 md:py-1.5 md:text-xs'>
                <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                <span>Bộ sưu tập Aetheria Luxury 2024</span>
              </div>

              <h1 className='text-4xl leading-[1.1] font-extrabold tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl'>
                {currentData.title}
              </h1>
              <p className='mx-auto mt-3 max-w-2xl text-base font-medium text-gray-200 drop-shadow-lg md:mt-4 md:text-xl lg:mx-0 lg:text-2xl'>
                {currentData.subtitle}
              </p>
            </div>

            {/* Static Trigger Box */}
            <div
              className={cn(
                'transition-all duration-500',
                isSearchFocused ? 'pointer-events-none opacity-0' : 'opacity-100',
              )}
            >
              <CardActionArea
                onClick={() => setIsSearchFocused(true)}
                className='group pointer-events-auto relative z-20 mx-auto max-w-3xl cursor-pointer rounded-2xl border border-white/40 bg-white/95 p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-3 lg:mx-0'
              >
                <div className='flex items-center gap-2 md:gap-3'>
                  <div className='group-hover:border-primary/30 flex h-12 flex-1 items-center rounded-xl border border-gray-100 bg-gray-50 px-4 transition-all group-hover:bg-white md:h-14'>
                    <Search className='group-hover:text-primary mr-3 h-5 w-5 text-gray-400' />
                    <span className='group-hover:text-primary text-sm font-bold text-gray-500 md:text-base'>
                      Tìm bất động sản, dự án, khu vực...
                    </span>
                  </div>
                  <div className='bg-primary hidden h-12 items-center justify-center rounded-xl px-6 font-bold text-white shadow-lg shadow-blue-500/20 transition-all group-hover:bg-blue-600 md:flex md:h-14'>
                    Tìm kiếm
                  </div>
                  <div className='bg-primary flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg shadow-blue-500/20 md:hidden'>
                    <Search className='h-5 w-5' />
                  </div>
                </div>
              </CardActionArea>

              <div className='mt-6 flex flex-wrap justify-center gap-2 lg:justify-start'>
                <span className='mr-2 py-1.5 text-xs font-bold tracking-wider text-white/70 uppercase'>Xu hướng:</span>
                {POPULAR_TAGS.map((tag, idx) => (
                  <Button
                    key={idx}
                    variant='contained'
                    color='inherit'
                    className='h-fit rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/20'
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Floating Card */}
          <SpotlightCard isHidden={isSearchFocused} data={currentData} />
        </div>
      </div>

      {/* 3. Bottom Stats */}
      <BottomStats isHidden={isSearchFocused} />

      {/* 4. Full Screen Search Modal */}
      <SearchModal
        isOpen={isSearchFocused}
        onClose={() => setIsSearchFocused(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};
