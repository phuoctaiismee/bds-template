import { cn } from '@/lib/twMerge';
import Image from 'next/image';
import { ComponentProps, FC } from 'react';

interface BannerProps extends ComponentProps<'div'> {
  src: string;
}

const Banner: FC<BannerProps> = ({ src, className, style, ...props }) => {
  return (
    <div
      className={cn('relative overflow-hidden rounded-lg', className)}
      style={{
        background: `url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ...style,
      }}
      {...props}
    >
      <div className='absolute top-0 left-0 size-full bg-black/10 backdrop-blur-sm' />
      <Image src={src} alt='' fill className='object-contain' />
    </div>
  );
};

export default Banner;
