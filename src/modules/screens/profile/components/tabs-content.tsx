import { Calculator, Compass, Grip, Landmark, Map, MapPin, ScrollText, Zap } from 'lucide-react';
import { MY_ASSETS, SAVED_LISTINGS, SCHEDULE } from '../constant';
import { CompactStats } from './widgets';

export const DashboardContent = ({ setActiveTab }: { setActiveTab: (tab: any) => void }) => (
  <div className='animate-in fade-in slide-in-from-bottom-4 duration-300'>
    <CompactStats />

    <div className='mb-4 flex items-center justify-between'>
      <h3 className='text-brand-primary text-lg font-bold'>Lịch trình</h3>
      <span className='text-primary cursor-pointer text-xs font-bold' onClick={() => setActiveTab('schedule')}>
        Xem tất cả
      </span>
    </div>

    <div className='scrollbar-hide -mx-4 mb-6 flex gap-3 overflow-x-auto px-4 pb-4'>
      {SCHEDULE.map((item: any) => (
        <div
          key={item.id}
          className='flex min-w-[240px] flex-shrink-0 gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'
        >
          <div className='text-primary flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50'>
            <span className='text-[10px] font-bold uppercase'>{item.date === 'Hôm nay' ? 'Nay' : 'Mai'}</span>
            <span className='text-lg leading-none font-extrabold'>{item.time.split(':')[0]}</span>
          </div>
          <div className='min-w-0'>
            <h4 className='text-brand-primary line-clamp-1 text-sm font-bold'>{item.title}</h4>
            <div className='mt-1 line-clamp-1 flex items-center gap-1 text-xs text-gray-500'>
              <MapPin className='h-3 w-3 flex-shrink-0' /> {item.location}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className='mb-4 flex items-center justify-between'>
      <h3 className='text-brand-primary text-lg font-bold'>Quan tâm gần đây</h3>
    </div>
    <div className='space-y-3'>
      {SAVED_LISTINGS.map((item) => (
        <div key={item.id} className='flex gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm'>
          <img src={item.image} className='h-20 w-20 flex-shrink-0 rounded-xl object-cover' />
          <div className='flex min-w-0 flex-1 flex-col justify-between'>
            <div>
              <h4 className='text-brand-primary line-clamp-2 text-sm leading-snug font-bold'>{item.title}</h4>
              <p className='mt-1 truncate text-xs text-gray-500'>{item.location}</p>
            </div>
            <div className='flex items-end justify-between'>
              <span className='text-primary font-extrabold'>{item.price}</span>
              {item.trend === 'down' && (
                <span className='rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-600'>Giảm giá</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ToolsContent = ({ router }: { router: any }) => (
  <div className='grid grid-cols-2 gap-3'>
    {[
      { icon: Map, label: 'Tra cứu Quy hoạch', color: 'text-blue-600 bg-blue-50', link: '/tools/planning' },
      { icon: Calculator, label: 'Tính lãi suất', color: 'text-green-600 bg-green-50', link: '/tools/loan' },
      { icon: Zap, label: 'Định giá AI', color: 'text-yellow-600 bg-yellow-50', link: '/coming-soon' },
      { icon: Compass, label: 'Phong thủy', color: 'text-red-600 bg-red-50', link: '/coming-soon' },
      { icon: ScrollText, label: 'Hợp đồng mẫu', color: 'text-cyan-600 bg-cyan-50', link: '/coming-soon' },
      { icon: Landmark, label: 'Vay ngân hàng', color: 'text-purple-600 bg-purple-50', link: '/coming-soon' },
    ].map((tool, i) => (
      <div
        key={i}
        onClick={() => router.push(tool.link)}
        className='hover:border-primary/30 flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-transform active:scale-95'
      >
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tool.color}`}>
          <tool.icon className='h-5 w-5' />
        </div>
        <span className='text-brand-primary text-center text-sm font-bold'>{tool.label}</span>
      </div>
    ))}
  </div>
);

export const AssetsContent = () => (
  <div className='space-y-4'>
    {MY_ASSETS.map((asset) => (
      <div key={asset.id} className='group relative aspect-video overflow-hidden rounded-2xl shadow-sm'>
        <img src={asset.image} className='h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent'></div>
        <div className='absolute bottom-0 left-0 w-full p-4'>
          <div className='flex items-end justify-between'>
            <h4 className='mr-4 line-clamp-1 flex-1 text-lg font-bold text-white'>{asset.title}</h4>
            <span
              className={`rounded px-2 py-1 text-[10px] font-bold ${asset.status === 'selling' ? 'bg-orange-500 text-white' : 'bg-green-600 text-white'}`}
            >
              {asset.status === 'selling' ? 'Đang bán' : 'Đang thuê'}
            </span>
          </div>
          <p className='text-secondary mt-1 text-xl font-extrabold'>{asset.price}</p>
        </div>
      </div>
    ))}
    <button className='hover:border-primary hover:text-primary flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-3 text-sm font-bold text-gray-400 transition-colors'>
      <Grip className='h-4 w-4' /> Thêm tài sản mới
    </button>
  </div>
);
