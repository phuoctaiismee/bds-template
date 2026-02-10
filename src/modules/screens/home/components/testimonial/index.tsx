import { Quote } from 'lucide-react';
import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section className='bg-brand-primary relative overflow-hidden py-24 text-white'>
      {/* Decor */}
      <div className="absolute top-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"/>
      <div className='bg-primary/20 absolute top-1/2 right-0 h-96 w-96 rounded-full blur-[100px]'/>

      <div className='relative z-10 container mx-auto px-6'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          {/* Image Side */}
          <div className='relative'>
            <div className='relative overflow-hidden rounded-3xl border-8 border-white/5 shadow-2xl'>
              <img
                src='https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=2787&auto=format&fit=crop'
                className='h-125 w-full object-cover'
              />
              <div className='from-brand-primary absolute inset-0 bg-linear-to-t via-transparent to-transparent'></div>

              <div className='absolute bottom-8 left-8'>
                <p className='text-xl font-bold text-white'>Gia đình anh Minh & chị Hoa</p>
                <p className='text-secondary text-sm'>Đã mua căn hộ tại The Metropole</p>
              </div>
            </div>

            {/* Floating Quote Icon */}
            <div className='bg-primary border-brand-primary absolute -top-6 -right-6 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-xl'>
              <Quote className='h-8 w-8 fill-white text-white' />
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className='text-secondary mb-4 block text-xs font-bold tracking-widest uppercase'>
              Câu chuyện khách hàng
            </span>
            <h2 className='mb-8 text-3xl leading-tight font-extrabold md:text-5xl'>
              "Hành trình tìm nhà <br /> chưa bao giờ <br />{' '}
              <span className='from-primary bg-linear-to-r to-white bg-clip-text text-transparent'>
                dễ dàng đến thế.
              </span>
              "
            </h2>
            <p className='border-primary mb-10 border-l-4 pl-6 text-lg leading-relaxed text-gray-400 italic'>
              "Chúng tôi đã mất 6 tháng tìm kiếm nhưng không ưng ý. Chỉ sau 2 tuần sử dụng nền tảng Aetheria và được hỗ
              trợ bởi chuyên gia tư vấn riêng, chúng tôi đã tìm thấy tổ ấm mơ ước với pháp lý minh bạch hoàn toàn."
            </p>

            <div className='flex gap-12 border-t border-white/10 pt-8'>
              <div>
                <p className='text-3xl font-extrabold text-white'>14</p>
                <p className='mt-1 text-xs text-gray-500 uppercase'>Ngày tìm kiếm</p>
              </div>
              <div>
                <p className='text-3xl font-extrabold text-white'>
                  5.2<span className='text-secondary text-lg'>Tỷ</span>
                </p>
                <p className='mt-1 text-xs text-gray-500 uppercase'>Giá trị giao dịch</p>
              </div>
              <div>
                <p className='text-3xl font-extrabold text-white'>100%</p>
                <p className='mt-1 text-xs text-gray-500 uppercase'>Hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
