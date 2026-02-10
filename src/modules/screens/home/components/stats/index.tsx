import React from 'react';

const STATS = [
  {
    value: '99.9%',
    title: 'Khách hàng hài lòng',
    desc: 'Niềm tin từ hàng nghìn giao dịch thành công.',
    color: 'text-primary',
  },
  {
    value: '500+',
    title: 'Dự án phân phối',
    desc: 'Đa dạng phân khúc từ căn hộ đến nghỉ dưỡng.',
    color: 'text-brand-primary',
  },
  {
    value: '10+',
    title: 'Tỉnh thành phố',
    desc: 'Mạng lưới rộng khắp các trung tâm kinh tế.',
    color: 'text-brand-primary',
  },
  {
    value: '24/7',
    title: 'Hỗ trợ pháp lý',
    desc: 'Đội ngũ chuyên gia luôn sẵn sàng tư vấn.',
    color: 'text-brand-primary',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className='bg-background border-t border-gray-100 py-12 md:py-24'>
      <div className='container mx-auto px-6'>
        {/* MOBILE: Grid 2 Columns (Vertical Scroll) | DESKTOP: Grid 4 Columns */}
        <div className='grid grid-cols-2 gap-4 md:gap-12 lg:grid-cols-4'>
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className='group rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg md:border-none md:bg-transparent md:p-6'
            >
              <div className={`mb-2 flex items-baseline text-3xl font-extrabold md:text-5xl ${stat.color}`}>
                {stat.value}
              </div>
              <div className='group-hover:bg-secondary mb-3 h-1 w-8 bg-gray-200 transition-colors duration-500 md:mb-4 md:w-12' />
              <h4 className='mb-2 text-sm font-bold md:text-lg'>{stat.title}</h4>
              <p className='text-xs leading-relaxed text-gray-500 md:text-sm'>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
