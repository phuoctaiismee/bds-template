import { CalendarClock } from 'lucide-react';

export default function ImageGallery({ images, isRent, moveInDate }: any) {
  return (
    <div className='container mx-auto mb-8 px-0 md:px-6'>
      <div className='group relative grid h-75 cursor-pointer grid-cols-1 gap-2 overflow-hidden rounded-none shadow-lg md:h-125 md:grid-cols-4 md:grid-rows-2 md:rounded-3xl'>
        <div className='relative md:col-span-2 md:row-span-2 overflow-hidden'>
          <img
            src={images[0]}
            className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
            alt='Main'
          />
          <div className='absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur md:hidden'>
            1/{images.length}
          </div>
          {isRent && (
            <div className='absolute top-4 left-4 flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-md'>
              <CalendarClock className='h-3 w-3' /> {moveInDate}
            </div>
          )}
        </div>
        {images.slice(1, 5).map((img: string, idx: number) => (
          <div key={idx} className='relative hidden md:block overflow-hidden'>
            <img
              src={img}
              className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
              alt={`Sub ${idx}`}
            />
            {idx === (images.length > 4 ? 3 : images.length - 1) && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/20'>
                <span className='rounded-lg border-2 border-white px-4 py-2 text-lg font-bold text-white backdrop-blur-sm'>
                  + Xem tất cả
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
