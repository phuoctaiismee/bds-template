import { AppTopbar } from '@/lib/navigation';
import { Dialog, Slide, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, Key, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ImageItem {
  src: string;
  alt: string;
  key: Key;
}

interface PreviewImagesProps {
  images: Array<ImageItem>;
  initialSlide?: number;
  open?: boolean;
  title?: string;
  onClose?: () => void;
}

const PreviewImages: FC<PreviewImagesProps> = ({ images, initialSlide = 0, open = false, title, onClose }) => {
  const [realIndex, setRealIndex] = useState(() => initialSlide);

  return (
    <Dialog open={open} slots={{ transition: Slide }} slotProps={{ transition: { direction: 'left' } }}>
      <div className='bg-positive/90 fixed top-0 left-0 z-[100] flex size-full flex-col'>
        <AppTopbar
          className='text-negative bg-transparent'
          onBack={onClose}
          center={<Typography className='line-clamp-1 text-xs font-normal'>{title}</Typography>}
        />

        <div className='flex-1'>
          <Swiper
            style={{ width: '100%', height: '100%' }}
            slidesPerView={1}
            initialSlide={realIndex}
            onRealIndexChange={(swiper) => setRealIndex(swiper.realIndex)}
          >
            {images.map((image) => (
              <SwiperSlide key={image.key} style={{ height: '100%', width: '100%' }}>
                <div className='relative size-full'>
                  <Image src={image.src} alt={image.alt} fill className='object-contain' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='flex items-center gap-2 px-2 py-4'>
          <div className='bg-positive/90 text-negative flex items-center gap-1 rounded-full px-3 py-1 text-xs'>
            <span>{realIndex + 1}</span>
            <span>/</span>
            <span className='text-negative/50'>{images.length}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PreviewImages;
