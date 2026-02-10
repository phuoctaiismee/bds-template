import { BarChart3, TrendingUp } from 'lucide-react';
import React from 'react';

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Đất nền KCN Becamex',
    location: 'Bình Phước',
    roi: '15 - 20%',
    price: '950 Triệu',
    tag: 'Lãi vốn',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Condotel The Coastal',
    location: 'Nha Trang',
    roi: '12% / năm',
    price: '2.1 Tỷ',
    tag: 'Dòng tiền',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Shophouse Mega Grand',
    location: 'Hưng Yên',
    roi: 'X2 tài sản',
    price: '8.5 Tỷ',
    tag: 'Kinh doanh',
    image:
      'https://images.unsplash.com/photo-1710611296324-e4e71240aaf2?q=80&w=714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const InvestmentSection: React.FC = () => {
  return (
    <section className='bg-brand-primary relative overflow-hidden py-12 text-white md:py-24'>
      {/* Background Ambience */}
      <div className='bg-primary/10 pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]'></div>

      <div className='relative z-10 container mx-auto px-6'>
        <div className='mb-8 flex flex-col items-end justify-between gap-6 md:mb-12 md:flex-row'>
          <div>
            <div className='text-secondary mb-2 flex items-center gap-2 text-xs font-bold tracking-wider uppercase'>
              <TrendingUp className='h-4 w-4' />
              <span>Góc nhìn nhà đầu tư</span>
            </div>
            <h2 className='text-3xl leading-tight font-extrabold md:text-5xl'>
              Cơ hội{' '}
              <span className='from-primary bg-linear-to-r to-white bg-clip-text text-transparent'>sinh lời cao</span>
            </h2>
            <p className='mt-4 max-w-xl text-sm text-gray-400 md:text-lg'>
              Danh sách các dự án được bộ phận phân tích của Aetheria đánh giá cao về tiềm năng tăng giá vốn hoặc tạo
              dòng tiền ổn định.
            </p>
          </div>

          <button className='flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20 active:scale-95'>
            Xem báo cáo thị trường <BarChart3 className='h-4 w-4' />
          </button>
        </div>

        {/* MOBILE: Horizontal Scroll | DESKTOP: Grid */}
        <div className='scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:px-0 md:pb-0'>
          {OPPORTUNITIES.map((item, idx) => (
            <div
              key={item.id}
              className='group min-w-75 cursor-pointer snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] md:min-w-0'
            >
              <div className='relative h-56 overflow-hidden'>
                <img
                  src={item.image}
                  className='h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100'
                />
                <div className='from-brand-primary absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-80'></div>

                <div className='absolute top-4 left-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold text-white uppercase backdrop-blur-md'>
                  {item.tag}
                </div>
              </div>
              <div className='relative p-6'>
                {/* Glow effect on hover */}
                <div className='bg-primary/20 pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100'></div>

                <h3 className='group-hover:text-secondary mb-1 text-2xl font-bold transition-colors'>{item.title}</h3>
                <p className='mb-6 flex items-center gap-1 text-sm text-gray-400'>
                  <span className='h-1.5 w-1.5 rounded-full bg-gray-500'></span>
                  {item.location}
                </p>

                <div className='flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 p-4 transition-colors group-hover:border-white/10'>
                  <div>
                    <p className='text-[10px] font-bold tracking-wider text-gray-500 uppercase'>Giá khởi điểm</p>
                    <p className='text-lg font-bold'>{item.price}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-secondary text-[10px] font-bold tracking-wider uppercase'>Kỳ vọng</p>
                    <p className='text-secondary text-lg font-bold'>{item.roi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
