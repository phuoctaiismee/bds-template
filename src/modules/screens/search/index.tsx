'use client';
import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { ChevronDown, Ellipsis, Filter, Info, Mail, TrendingUp } from 'lucide-react';
import { FC, useState } from 'react';
import AdWidget from './components/ad-widget';
import DesktopFilterSidebar from './components/filters';
import MobileFilterModal from './components/filters/mobile-filter';
import ListingCard from './components/listing-card';
import { NoResults } from './components/no-result';
import { Listing, LISTINGS } from './contants';

type SearchScreenProps = {
  keyword: string;
  type?: string;
};
const SearchScreen: FC<SearchScreenProps> = ({ keyword, type }) => {
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const mode = type === 'rent' ? 'rent' : 'sale';

  const displayedListings = LISTINGS.filter((item) => {
    if (item.type === 'ad') return true;
    return item.type === mode;
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 1. Mobile Filter Toggle (Sticky) */}
      <div className='scrollbar-hide sticky top-16 z-30 flex gap-3 overflow-x-auto border-b border-gray-200 bg-white px-4 py-3 md:top-20 lg:hidden'>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className='bg-brand-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-md transition-transform active:scale-95'
        >
          <Filter className='h-4 w-4' /> Bộ lọc
        </button>
        <button className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700'>
          Khu vực
        </button>
        <button className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700'>
          {mode === 'rent' ? 'Giá thuê' : 'Mức giá'}
        </button>
        {mode === 'rent' && (
          <button className='rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700'>
            Nội thất
          </button>
        )}
      </div>

      <div className='container mx-auto px-4 py-6 md:px-6 md:py-8'>
        <div className='flex items-start gap-8'>
          {/* 2. Desktop Sidebar */}
          <DesktopFilterSidebar mode={mode} />
          {/* 3. Mobile Filter Modal */}
          <MobileFilterModal isOpen={isMobileFilterOpen} onClose={() => setMobileFilterOpen(false)} mode={mode} />
          {/* 4. Main Feed Area */}
          <div className='min-w-0 flex-1'>
            {/* Header Stats & Context */}
            <div className='mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
              <div>
                <h1 className='text-brand-primary text-xl font-extrabold md:text-2xl'>
                  {mode === 'rent' ? 'Thuê nhà & Căn hộ tại TP. Thủ Đức' : 'Mua bán nhà đất tại TP. Thủ Đức'}
                </h1>
                <div className='mt-2 flex items-center gap-3 text-sm text-gray-500'>
                  <span className='text-brand-primary font-bold'>
                    {displayedListings.filter((i) => i.type !== 'ad').length} kết quả
                  </span>
                  <span className='h-1 w-1 rounded-full bg-gray-300'></span>
                  {/* Market Pulse Micro-Insight */}
                  <span className='flex items-center gap-1 rounded border border-green-100 bg-green-50 px-2 py-0.5 text-green-700'>
                    <TrendingUp className='h-3 w-3' />
                    {mode === 'rent' ? 'Giá phổ biến: 12 - 25 Triệu' : 'Giá tăng 2.5%'}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-3 self-end md:self-auto whitespace-nowrap'>
                <span className='hidden text-sm text-gray-500 md:inline'>Sắp xếp:</span>
                <div className='group relative'>
                  <button className='hover:border-primary flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold transition-colors'>
                    Mới nhất <ChevronDown className='h-4 w-4' />
                  </button>
                  <div className='absolute top-full right-0 z-20 mt-2 hidden w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl group-hover:block'>
                    <button className='w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50'>Mới nhất</button>
                    <button className='w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50'>Giá thấp đến cao</button>
                    <button className='w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50'>Giá cao đến thấp</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed Content */}
            <div className='space-y-6'>
              {displayedListings.map((item, index) => {
                if (item.type === 'ad') {
                  return <AdWidget key={item.id} />;
                }
                return <ListingCard key={item.id} listing={item as Listing} />;
              })}

              {displayedListings.length === 0 && (
                <NoResults
                  onReset={() => console.log('Reset filters')}
                  message='Thử nới lỏng bộ lọc hoặc tìm khu vực lân cận để có nhiều kết quả hơn.'
                />
              )}
            </div>

            {/* Pagination */}
            {displayedListings.length > 0 && (
              <div className='mt-12 flex justify-center'>
                <Pagination
                  count={10}
                  shape='rounded'
                  variant='outlined'
                  renderItem={(item) => {
                    // --- CHIÊU CUỐI: XỬ LÝ RIÊNG CÁI DẤU ... ---
                    if (item.type === 'start-ellipsis' || item.type === 'end-ellipsis') {
                      return (
                        <span className='text-foreground/30 flex h-10 w-10 items-center justify-center text-lg leading-none font-bold select-none'>
                          <Ellipsis size={16} />
                        </span>
                      );
                    }

                    // --- CÁC NÚT CÒN LẠI (SỐ, PREV, NEXT) GIỮ NGUYÊN ---
                    return (
                      <PaginationItem
                        {...item}
                        sx={{
                          borderColor: '#e5e7eb', // Border xám
                          color: '#1f2937', // Chữ đen xám
                          width: 40,
                          height: 40,
                          fontWeight: 600,
                          transition: 'all 0.2s',

                          // Active: Nền đen, chữ trắng
                          '&.Mui-selected': {
                            backgroundColor: 'black !important',
                            color: 'white',
                            borderColor: 'black',
                            '&:hover': {
                              backgroundColor: '#333 !important',
                            },
                          },

                          // Hover thường
                          '&:hover': {
                            backgroundColor: '#f3f4f6',
                            borderColor: '#d1d5db',
                          },
                        }}
                      />
                    );
                  }}
                />
              </div>
            )}
            {/* SEO Content */}
            <div className='mt-16 border-t border-gray-200 pt-8'>
              <h2 className='text-brand-primary mb-4 text-lg font-bold'>
                {mode === 'rent' ? 'Kinh nghiệm thuê nhà tại TP. Thủ Đức' : 'Tổng quan thị trường BĐS Thủ Đức'}
              </h2>
              <p className='mb-4 text-sm leading-relaxed text-gray-500'>
                {mode === 'rent'
                  ? 'Thị trường cho thuê tại Thủ Đức đang rất sôi động với nhiều lựa chọn từ căn hộ studio đến biệt thự cao cấp. Khu vực Thảo Điền và An Phú là điểm nóng cho người nước ngoài và chuyên gia. Giá thuê trung bình căn hộ 2PN dao động từ 15 - 25 triệu/tháng...'
                  : 'Thị trường mua bán nhà đất tại TP. Thủ Đức đang diễn ra sôi động với nhiều dự án mới. Giá trung bình hiện tại dao động từ 85 - 120 triệu/m² tùy khu vực. Các khu vực nóng nhất bao gồm Thảo Điền, An Phú và Thủ Thiêm...'}
              </p>
              <div className='flex gap-4'>
                <button className='text-primary text-sm font-bold hover:underline'>Xem biểu đồ giá</button>
                <button className='text-primary text-sm font-bold hover:underline'>
                  {mode === 'rent' ? 'Mẫu hợp đồng thuê nhà' : 'Hướng dẫn mua nhà an toàn'}
                </button>
              </div>
            </div>
          </div>
          {/* 5. Right Sidebar (Widgets) */}
          <div className='sticky top-24 hidden h-fit w-80 shrink-0 space-y-6 xl:block'>
            {/* Email Signup */}
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='text-primary mb-4 flex items-center gap-2'>
                <Mail className='h-5 w-5' />
                <h3 className='text-sm font-bold tracking-wider uppercase'>
                  {mode === 'rent' ? 'Thông báo nhà mới' : 'Cơ hội đầu tư'}
                </h3>
              </div>
              <p className='mb-4 text-xs text-gray-500'>
                {mode === 'rent'
                  ? 'Nhận tin ngay khi có căn hộ/nhà phố cho thuê phù hợp tiêu chí. Không bỏ lỡ deal tốt.'
                  : 'Nhận email ngay khi có BĐS phù hợp tiêu chí tìm kiếm của bạn. Không bỏ lỡ cơ hội ngon.'}
              </p>
              <div className='space-y-3'>
                <input
                  type='email'
                  placeholder='Email của bạn'
                  className='focus:border-primary w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none'
                />
                <button className='bg-brand-primary hover:bg-primary w-full rounded-lg py-2.5 text-sm font-bold text-white transition-colors'>
                  Đăng ký nhận tin
                </button>
              </div>
            </div>

            {/* Tips Widget */}
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='mb-4 flex items-center gap-2 text-orange-500'>
                <Info className='h-5 w-5' />
                <h3 className='text-sm font-bold tracking-wider uppercase'>
                  Lưu ý khi {mode === 'rent' ? 'thuê' : 'mua'}
                </h3>
              </div>
              <ul className='space-y-3'>
                {[
                  mode === 'rent' ? 'Kiểm tra kỹ hợp đồng thuê & tiền cọc' : 'Kiểm tra quy hoạch tại cơ quan chức năng',
                  mode === 'rent'
                    ? 'Xác nhận tình trạng nội thất trước khi nhận'
                    : 'Không chuyển cọc nếu chưa gặp chủ nhà',
                  mode === 'rent' ? 'Hỏi kỹ phí quản lý và điện nước' : 'Tham khảo giá giao dịch khu vực lân cận',
                ].map((tip, i) => (
                  <li key={i} className='flex items-start gap-2 text-xs text-gray-600'>
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300'></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Agent Spotlight */}
            <div className='group relative cursor-pointer overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 p-6 text-white'>
              <div className='bg-primary absolute top-0 right-0 h-24 w-24 rounded-full opacity-50 blur-2xl'></div>
              <h3 className='relative z-10 mb-2 text-lg font-bold'>Cần tư vấn chuyên sâu?</h3>
              <p className='relative z-10 mb-4 text-xs text-gray-400'>Kết nối với Top 10 chuyên gia khu vực Thủ Đức.</p>
              <div className='relative z-10 mb-4 flex -space-x-2'>
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    className='h-8 w-8 rounded-full border-2 border-gray-800'
                  />
                ))}
                <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-700 text-[10px]'>
                  +5
                </div>
              </div>
              <button className='relative z-10 w-full rounded-lg border border-white/20 bg-white/10 py-2 text-sm font-bold backdrop-blur transition-colors hover:bg-white hover:text-black'>
                Tìm môi giới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
