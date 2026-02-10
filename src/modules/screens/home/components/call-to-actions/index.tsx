import React from 'react';

export const CallToAction: React.FC = () => {
  return (
    <section className='bg-white py-24'>
      <div className='container mx-auto px-6'>
        <div className='from-brand-primary relative overflow-hidden rounded-[3rem] bg-linear-to-br to-[#0f2444] p-8 shadow-2xl md:p-16'>
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"/>
          <div className='bg-secondary/20 absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl'/>

          <div className='relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
            <div className='text-center lg:text-left'>
              <h2 className='mb-6 text-3xl font-extrabold text-white md:text-5xl'>
                Trải nghiệm mượt mà hơn trên ứng dụng di động.
              </h2>
              <p className='mb-8 text-lg text-gray-400'>
                Nhận thông báo về dự án mới nhất, chat trực tiếp với chuyên gia và quản lý danh mục đầu tư mọi lúc mọi
                nơi.
              </p>

              <div className='flex flex-col justify-center gap-4 sm:flex-row lg:justify-start'>
                <button className='text-brand-primary flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-bold transition-colors hover:bg-gray-100'>
                  <div className='rounded bg-black p-1 text-white'>
                    <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.29-1.23 3.57-.59.7.36 1.16.88 1.57 1.48-.99.63-1.64 1.77-1.64 3.03 0 2.37 1.95 3.39 2.05 3.44-.01.03-.01.08-.03.14-.42 1.41-1.37 3.4-2.6 4.73zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.17 2.29-2.08 4.34-3.74 4.25z' />
                    </svg>
                  </div>
                  <div className='text-left'>
                    <p className='text-[10px] font-bold text-gray-500 uppercase'>Download on the</p>
                    <p className='text-sm leading-none'>App Store</p>
                  </div>
                </button>

                <button className='flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition-colors hover:bg-white/20'>
                  <div className='rounded bg-white p-1 text-black'>
                    <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-1.081.045.996.996 0 0 1-.529-.894V2.85c0-.38.216-.73.551-.894a.997.997 0 0 1 .529-.142.999.999 0 0 1 .529.142zM15.19 13.398l5.881 3.337-2.31 2.31-3.571-5.647zM22.518 15.93l-4.274-2.424L15.19 10.6l3.054-3.055 4.274 2.424c.919.522.919 1.365 0 1.886zM15.19 10.6l3.571-5.647 2.31 2.31-5.881 3.337z' />
                    </svg>
                  </div>
                  <div className='text-left'>
                    <p className='text-[10px] font-bold text-gray-300 uppercase'>Get it on</p>
                    <p className='text-sm leading-none'>Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Phone Mockup (CSS only) */}
            <div className='relative flex justify-center lg:justify-end'>
              <div className='relative h-[580px] w-[280px] rotate-6 transform overflow-hidden rounded-[3rem] border-8 border-gray-800 bg-black shadow-2xl transition-transform duration-500 hover:rotate-0'>
                <div className='absolute top-0 z-20 h-8 w-full rounded-b-xl bg-black'></div>
                <img
                  src='https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=1000&auto=format&fit=crop'
                  className='h-full w-full object-cover'
                />
                <div className='absolute right-4 bottom-10 left-4 rounded-xl bg-white/90 p-4 backdrop-blur'>
                  <div className='mb-2 flex items-center gap-2'>
                    <div className='bg-brand-primary h-8 w-8 rounded-full'></div>
                    <div className='h-2 w-20 rounded bg-gray-200'></div>
                  </div>
                  <div className='h-12 w-full rounded bg-gray-100'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
