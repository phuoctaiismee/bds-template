import { CardActionArea } from '@mui/material';
import { Calculator, ChevronRight, FileSearch, Map, Scale } from 'lucide-react';
import React from 'react';

const TOOLS = [
  {
    icon: Map,
    title: 'Tra cứu quy hoạch',
    desc: 'Kiểm tra thông tin quy hoạch đất đai mới nhất trên toàn quốc.',
    color: 'bg-blue-100 text-blue-600',
    link: 'Tra cứu ngay',
    url: '/tools/planning',
  },
  {
    icon: Calculator,
    title: 'Tính lãi suất vay',
    desc: 'Ước tính khoản trả hàng tháng và hạn mức vay phù hợp thu nhập.',
    color: 'bg-green-100 text-green-600',
    link: 'Tính toán',
    url: '/tools/loan',
  },
  {
    icon: FileSearch,
    title: 'Định giá BĐS AI',
    desc: 'Nhận báo cáo định giá sơ bộ dựa trên dữ liệu thị trường thực.',
    color: 'bg-orange-100 text-orange-600',
    link: 'Định giá',
    url: '/coming-soon',
  },
  {
    icon: Scale,
    title: 'Tư vấn pháp lý',
    desc: 'Kết nối với luật sư và chuyên gia để rà soát hồ sơ mua bán.',
    color: 'bg-purple-100 text-purple-600',
    link: 'Liên hệ',
    url: '/coming-soon',
  },
];

export const ToolsSection: React.FC = () => {
  return (
    <section className='bg-brand-bg py-12 md:py-20'>
      <div className='container mx-auto px-6'>
        <div className='mb-6 flex items-end justify-between md:mb-10'>
          <h2 className='text-2xl font-extrabold md:text-3xl'>
            Công cụ <span className='text-primary'>hỗ trợ</span>
          </h2>
          <a href='#' className='hover:text-primary hidden text-sm font-bold text-gray-500 md:block'>
            Xem tất cả công cụ
          </a>
        </div>

        {/* MOBILE: Horizontal Scroll | DESKTOP: Grid */}
        <div className='scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:px-0 md:py-2 lg:grid-cols-4'>
          {TOOLS.map((tool, idx) => (
            <CardActionArea
              key={idx}
            //   LinkComponent={Link}
            //   href={tool.url}
              className='group flex h-full min-w-70 cursor-pointer snap-center flex-col items-start rounded-2xl border border-gray-100 bg-white hover:bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 md:min-w-0'
            >
              <div className={`h-12 w-12 ${tool.color} mb-6 flex items-center justify-center rounded-xl`}>
                <tool.icon className='h-6 w-6' />
              </div>
              <h3 className='mb-2 text-lg font-bold'>{tool.title}</h3>
              <p className='mb-6 min-h-[40px] flex-1 text-sm leading-relaxed text-gray-500'>{tool.desc}</p>
              <div className='group-hover:text-primary flex items-center gap-2 text-sm font-bold transition-colors'>
                {tool.link} <ChevronRight className='h-4 w-4' />
              </div>
            </CardActionArea>
          ))}
        </div>
      </div>
    </section>
  );
};
