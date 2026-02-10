'use client';

import { ArrowLeft, ArrowRight, Eye, Radio } from 'lucide-react';
import React, { useState } from 'react';

// 1. Import Swiper
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const STORIES = [
  {
    id: 1,
    type: 'live',
    user: 'Aetheria.vn',
    views: '2.4k',
    title: 'Nhấn để xem live',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2971&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 2,
    type: 'story',
    time: '2h trước',
    user: 'Aetheria.vn',
    title: 'Biệt thự liền kề mới tại Quận 9',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 3,
    type: 'story',
    time: '4h trước',
    user: 'Aetheria.vn',
    title: 'Căn hộ view sông Sài Gòn',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 4,
    type: 'story',
    time: '5h trước',
    user: 'Aetheria.vn',
    title: 'Shophouse thương mại trung tâm',
    image:
      'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    verified: true,
  },
  {
    id: 5,
    type: 'story',
    time: '1 ngày trước',
    user: 'Aetheria.vn',
    title: 'Khởi công dự án Grand Marina',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop',
    verified: true,
  },
  {
    id: 6,
    type: 'story',
    time: '2 ngày trước',
    user: 'Aetheria.vn',
    title: 'Sự kiện mở bán The Global City',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2896&auto=format&fit=crop',
    verified: true,
  },
];

export const StorySection: React.FC = () => {
  // State để lưu instance của swiper nhằm điều khiển bằng nút bên ngoài
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <h2 className='text-3xl font-extrabold'>
              Khám phá <span className='text-secondary italic'>sự kiện Aetheria.vn</span>
            </h2>
            <div className='border-secondary mt-4 flex flex-col gap-2 border-l-2 pl-4 text-sm text-gray-500'>
              <p>Hơn 2 triệu đánh giá tốt nhất từ nền tảng mạng xã hội.</p>
              <p>128k tài khoản mạng xã hội hoạt động.</p>
              <p>Mạng xã hội bao gồm người dùng, người thuê và chủ đầu tư.</p>
            </div>
            <button className='border-primary text-primary hover:bg-primary mt-6 rounded-lg border px-6 py-2 font-bold transition-colors hover:text-white'>
              Xem nhiều hơn
            </button>
          </div>

          {/* Navigation Buttons (Custom) */}
          <div className='hidden gap-2 md:flex'>
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className='hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:text-white'
              aria-label='Previous slide'
            >
              <ArrowLeft className='h-5 w-5' />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className='hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors hover:text-white'
              aria-label='Next slide'
            >
              <ArrowRight className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className='w-full'>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2} // Mobile hiển thị 1 phần card sau để gợi ý scroll
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 4.5, // Hiển thị 4.5 card trên màn hình lớn
              },
            }}
            className='pb-4!' // Thêm padding bottom để shadow không bị cắt
          >
            {STORIES.map((story) => (
              <SwiperSlide key={story.id}>
                <div className='group relative h-87.5 w-full cursor-pointer overflow-hidden rounded-2xl shadow-md'>
                  <img
                    src={story.image}
                    alt={story.title}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  {/* Overlay Gradient */}
                  <div className='absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/80'></div>

                  {/* Top Badge */}
                  <div className='absolute top-4 right-4 z-10'>
                    {story.type === 'live' ? (
                      <div className='flex gap-2'>
                        <span className='flex animate-pulse items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white'>
                          <Radio className='h-3 w-3' /> Live
                        </span>
                        <span className='flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur'>
                          <Eye className='h-3 w-3' /> {story.views}
                        </span>
                      </div>
                    ) : (
                      <span className='rounded-lg bg-white/20 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md'>
                        {story.time}
                      </span>
                    )}
                  </div>

                  {/* Bottom Info */}
                  <div className='absolute right-0 bottom-0 left-0 p-4'>
                    <div className='mb-2 flex items-center gap-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-lg bg-white'>
                        <div className='bg-secondary h-4 w-4 rounded-sm'></div>
                      </div>
                      <span className='text-xs font-bold text-white'>{story.user}</span>
                      {story.verified && (
                        <span className='bg-secondary flex h-3 w-3 items-center justify-center rounded-full text-[8px] text-white'>
                          ✓
                        </span>
                      )}
                    </div>
                    <p className='line-clamp-2 text-sm leading-snug font-medium text-white'>{story.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
