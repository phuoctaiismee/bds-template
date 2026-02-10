import { Clock, MapPin } from 'lucide-react';
import React from 'react';

const EVENTS = [
  {
    id: 1,
    day: '15',
    month: 'TH11',
    title: 'Lễ mở bán The Global City - Giai đoạn 2',
    time: '08:30 - 11:30',
    location: 'The Global City Sales Gallery, TP. Thủ Đức',
    type: 'Offline',
    image:
      'https://images.unsplash.com/photo-1710611296324-e4e71240aaf2?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    day: '20',
    month: 'TH11',
    title: 'Webinar: Dòng tiền BĐS cuối năm 2024',
    time: '20:00 - 21:30',
    location: 'Zoom Online',
    type: 'Online',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop',
  },
];

export const EventsSection: React.FC = () => {
  return (
    <section className='bg-white py-12 md:py-24'>
      <div className='container mx-auto px-6'>
        <div className='mb-8 text-center md:mb-16'>
          <span className='text-primary mb-2 block text-xs font-bold tracking-wider uppercase'>Kết nối cộng đồng</span>
          <h2 className='text-3xl font-extrabold md:text-4xl'>
            Sự kiện <span className='text-secondary'>Aetheria</span>
          </h2>
        </div>

        {/* MOBILE: Horizontal Scroll | DESKTOP: Grid */}
        <div className='scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-2 md:gap-12 md:px-0 md:pb-0'>
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className='group flex min-w-[85vw] cursor-pointer snap-center flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-xl md:min-w-0 md:flex-row'
            >
              {/* Image */}
              <div className='relative h-48 overflow-hidden md:h-auto md:max-h-60 md:w-2/5'>
                <img
                  src={event.image}
                  className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute top-4 left-4 rounded-lg bg-white/90 px-4 py-2 text-center shadow-lg backdrop-blur-sm'>
                  <span className='block text-2xl leading-none font-extrabold'>{event.day}</span>
                  <span className='block text-xs font-bold text-gray-500 uppercase'>{event.month}</span>
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col justify-center p-6 md:w-3/5'>
                <div className='mb-3 flex items-center gap-2'>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${event.type === 'Online' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {event.type}
                  </span>
                  <span className='flex items-center gap-1 text-xs text-gray-400'>
                    <Clock className='h-3 w-3' /> {event.time}
                  </span>
                </div>
                <h3 className='group-hover:text-primary mb-3 text-lg leading-snug font-bold transition-colors'>
                  {event.title}
                </h3>
                <div className='mb-6 flex items-center gap-2 text-sm text-gray-500'>
                  <MapPin className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{event.location}</span>
                </div>
                <button className='border-brand-primary hover:bg-brand-primary w-full rounded-lg border py-2 text-sm font-bold transition-colors hover:text-white'>
                  Đăng ký tham gia
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-6 text-center md:mt-12'>
          <a
            href='#'
            className='hover:text-primary hover:border-primary border-b border-gray-300 pb-1 text-sm font-bold text-gray-500 transition-all'
          >
            Xem tất cả sự kiện sắp tới
          </a>
        </div>
      </div>
    </section>
  );
};
