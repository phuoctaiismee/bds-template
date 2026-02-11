import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

export const LocationHighlights: React.FC = () => {
  return (
    <section className='bg-white py-12 md:py-24'>
      <div className='container mx-auto px-6'>
        <div className='mx-auto mb-8 max-w-2xl text-center md:mb-12'>
          <h2 className='mb-2 text-2xl font-extrabold md:mb-4 md:text-4xl'>
            Khám phá theo <span className='text-primary'>khu vực</span>
          </h2>
          <p className='text-sm text-gray-500 md:text-base'>
            Tìm kiếm bất động sản tại các thành phố năng động và phát triển nhất Việt Nam.
          </p>
        </div>

        {/* MOBILE: Horizontal Scroll | DESKTOP: Bento Grid */}
        <div className='scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:h-125 md:grid-cols-3 md:grid-rows-2 md:gap-6 md:px-0 md:pb-0'>
          {/* Large Item - HCM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className='group relative h-87.5 min-w-75 cursor-pointer snap-center overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 md:h-auto md:min-w-0'
          >
            <img
              src='https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2940&auto=format&fit=crop'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent'></div>
            <div className='absolute bottom-0 left-0 p-6 md:p-8'>
              <h3 className='mb-2 text-2xl font-bold text-white md:text-3xl'>TP. Hồ Chí Minh</h3>
              <p className='mb-4 text-xs text-white/80 md:text-sm'>Trung tâm kinh tế sầm uất nhất cả nước</p>
              <span className='inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-brand-primary'>
                2,400+ Dự án <ArrowUpRight className='h-3 w-3' />
              </span>
            </div>
          </motion.div>

          {/* Small Item - Hanoi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className='group relative h-87.5 min-w-65 cursor-pointer snap-center overflow-hidden rounded-3xl md:h-auto md:min-w-0'
          >
            <img
              src='https://images.unsplash.com/photo-1710611296324-e4e71240aaf2?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent'></div>
            <div className='absolute bottom-0 left-0 p-6'>
              <h3 className='mb-1 text-xl font-bold text-white'>Hà Nội</h3>
              <p className='text-xs text-white/70'>Thủ đô ngàn năm văn hiến</p>
            </div>
          </motion.div>

          {/* Small Item - Da Nang */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className='group relative h-87.5 min-w-65 cursor-pointer snap-center overflow-hidden rounded-3xl md:h-auto md:min-w-0'
          >
            <img
              src='https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2800&auto=format&fit=crop'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent'></div>
            <div className='absolute bottom-0 left-0 p-6'>
              <h3 className='mb-1 text-xl font-bold text-white'>Đà Nẵng</h3>
              <p className='text-xs text-white/70'>Thành phố đáng sống nhất</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
