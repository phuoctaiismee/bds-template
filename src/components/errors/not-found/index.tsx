'use client';
import { Link } from '@/lib/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { FC } from 'react';

type NotFoundErrorProps = object;

const NotFoundError: FC<NotFoundErrorProps> = () => {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-white'>
      {/* Background Decor */}
      <div className='absolute top-0 right-0 z-0 h-full w-2/3 skew-x-12 bg-gray-50'></div>
      <div className='bg-primary/5 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl'></div>

      <div className='relative z-10 container mx-auto px-6 text-center'>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className='text-brand-primary/5 text-[12rem] leading-none font-extrabold select-none md:text-[16rem]'>
            404
          </h1>

          <div className='relative -mt-20 md:-mt-32'>
            <h2 className='text-brand-primary mb-6 text-3xl font-extrabold md:text-5xl'>
              Không tìm thấy địa điểm này.
            </h2>
            <p className='mx-auto mb-10 max-w-2xl text-lg text-gray-500 md:text-xl'>
              Có vẻ như bất động sản bạn đang tìm kiếm đã bị ẩn hoặc đường dẫn không còn tồn tại. Hãy quay lại trang chủ
              để khám phá những không gian sống đẳng cấp khác.
            </p>

            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Link
                href='/'
                className='bg-brand-primary hover:bg-primary hover:shadow-primary/30 flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold text-white transition-all hover:shadow-lg'
              >
                <Home className='h-5 w-5' />
                Về Trang Chủ
              </Link>
              <button
                onClick={() => window.history.back()}
                className='text-brand-primary flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 font-bold transition-all hover:bg-gray-50'
              >
                <ArrowLeft className='h-5 w-5' />
                Quay lại
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundError;
