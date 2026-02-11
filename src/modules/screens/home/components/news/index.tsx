import { ArrowRight, Calendar, TrendingUp } from 'lucide-react';
import React from 'react';

export const NewsSection: React.FC = () => {
  return (
    <section className='border-t border-gray-50 bg-white py-12 md:py-24'>
      <div className='container mx-auto px-6'>
        <div className='mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end'>
          <div>
            <span className='text-secondary mb-2 block text-xs font-bold tracking-wider uppercase'>
              Góc nhìn chuyên gia
            </span>
            <h2 className='text-3xl font-extrabold md:text-4xl'>
              Thông tin <span className='text-primary'>thị trường</span>
            </h2>
          </div>
          <button className='flex items-center gap-2 rounded-full bg-gray-50 px-5 py-2.5 text-sm font-bold transition-all hover:bg-gray-100'>
            Xem tất cả bài viết <ArrowRight className='h-4 w-4' />
          </button>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Main Featured Article - STATIC (Full Width on Mobile) */}
          <div className='group cursor-pointer lg:col-span-2'>
            <div className='relative mb-6 aspect-video overflow-hidden rounded-2xl'>
              <img
                src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='bg-primary absolute top-4 left-4 rounded-md px-3 py-1 text-xs font-bold text-white'>
                Phân tích
              </div>
            </div>
            <div className='mb-3 flex items-center gap-4 text-xs font-bold tracking-wider text-gray-400 uppercase'>
              <span className='flex items-center gap-1'>
                <Calendar className='h-3 w-3' /> 12 Tháng 10, 2023
              </span>
              <span>•</span>
              <span>Bởi: Lê Hoàng</span>
            </div>
            <h3 className='group-hover:text-primary mb-3 text-2xl leading-tight font-extrabold transition-colors md:text-3xl'>
              Dự báo thị trường BĐS Quý 4/2024: Dòng tiền đang chảy về đâu?
            </h3>
            <p className='line-clamp-2 leading-relaxed text-gray-500'>
              Phân tích chi tiết về sự dịch chuyển của dòng vốn đầu tư nước ngoài và sự trỗi dậy của bất động sản công
              nghiệp tại các tỉnh phía Bắc.
            </p>
          </div>

          {/* Side Articles & Widget - HORIZONTAL SCROLL on Mobile */}
          <div className='scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 lg:mx-0 lg:flex-col lg:gap-8 lg:px-0 lg:pb-0'>
            {/* Article 2 */}
            <div className='group flex min-w-70 cursor-pointer snap-center items-start gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm lg:min-w-0 lg:border-none lg:p-0 lg:shadow-none'>
              <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl lg:h-24 lg:w-24'>
                <img
                  src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop'
                  className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <div>
                <span className='text-secondary mb-1 block text-[10px] font-bold uppercase'>Luật & Pháp lý</span>
                <h4 className='group-hover:text-primary mb-2 line-clamp-2 leading-snug font-bold transition-colors'>
                  Những điểm mới trong Luật Đất đai sửa đổi 2024
                </h4>
                <span className='text-xs text-gray-400'>5 phút đọc</span>
              </div>
            </div>

            {/* Article 3 */}
            <div className='group flex min-w-70 cursor-pointer snap-center items-start gap-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm lg:min-w-0 lg:border-none lg:p-0 lg:shadow-none'>
              <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl lg:h-24 lg:w-24'>
                <img
                  src='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop'
                  className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
              </div>
              <div>
                <span className='mb-1 block text-[10px] font-bold text-orange-500 uppercase'>Phong cách sống</span>
                <h4 className='group-hover:text-primary mb-2 line-clamp-2 leading-snug font-bold transition-colors'>
                  Xu hướng Green Living: Khi thiên nhiên là tiêu chuẩn xa xỉ mới
                </h4>
                <span className='text-xs text-gray-400'>3 phút đọc</span>
              </div>
            </div>

            {/* Market Data Widget */}
            <div className='bg-background min-w-70 snap-center rounded-xl border border-gray-100 p-6 lg:min-w-0'>
              <div className='mb-4 flex items-center gap-2'>
                <div className='bg-brand-primary rounded-lg p-1.5 text-white'>
                  <TrendingUp className='h-4 w-4' />
                </div>
                <span className='text-sm font-bold'>Chỉ số giá</span>
              </div>
              <div className='space-y-3'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-gray-500'>Căn hộ TP.HCM</span>
                  <span className='font-bold text-green-600'>+2.5%</span>
                </div>
                <div className='h-1 w-full overflow-hidden rounded-full bg-gray-200'>
                  <div className='h-full w-[60%] bg-green-500'></div>
                </div>
                <div className='flex items-center justify-between pt-2 text-sm'>
                  <span className='text-gray-500'>Nhà phố Hà Nội</span>
                  <span className='font-bold text-red-500'>-0.8%</span>
                </div>
                <div className='h-1 w-full overflow-hidden rounded-full bg-gray-200'>
                  <div className='h-full w-[40%] bg-red-500'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
