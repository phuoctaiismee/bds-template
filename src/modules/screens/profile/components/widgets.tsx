import { ArrowUpRight, Briefcase, Calculator, Calendar, Grip, Heart, Map, ScrollText, Wallet, Zap } from 'lucide-react';

export const QuickActions = ({ navigate, activeTab }: { navigate: any; activeTab: string }) => {
  const actions = [
    { id: 'assets', icon: Briefcase, label: 'Tài sản', color: 'bg-purple-50 text-purple-600', link: '?tab=assets' },
    { id: 'schedule', icon: Calendar, label: 'Lịch hẹn', color: 'bg-orange-50 text-orange-600', link: '?tab=schedule' },
    { id: 'collection', icon: Heart, label: 'Đã lưu', color: 'bg-red-50 text-red-600', link: '?tab=collection' },
    { id: 'loan', icon: Calculator, label: 'Lãi suất', color: 'bg-green-50 text-green-600', link: '/tools/loan' },
    { id: 'planning', icon: Map, label: 'Quy hoạch', color: 'bg-blue-50 text-blue-600', link: '/tools/planning' },
    { id: 'valuation', icon: Zap, label: 'Định giá', color: 'bg-yellow-50 text-yellow-600', link: '/coming-soon' },
    { id: 'contract', icon: ScrollText, label: 'Hợp đồng', color: 'bg-cyan-50 text-cyan-600', link: '/coming-soon' },
    { id: 'more', icon: Grip, label: 'Tiện ích', color: 'bg-gray-50 text-gray-600', link: '?tab=tools' },
  ];

  return (
    <div className='mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm'>
      <div className='grid grid-cols-4 gap-x-2 gap-y-6'>
        {actions.map((act) => (
          <div
            key={act.id}
            onClick={() => navigate(act.link)}
            className='group flex cursor-pointer flex-col items-center gap-2'
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${act.color} shadow-sm transition-transform group-active:scale-90`}
            >
              <act.icon className='h-6 w-6 stroke-[1.5px]' />
            </div>
            <span className='group-hover:text-brand-primary line-clamp-1 text-center text-[11px] leading-tight font-bold text-gray-600'>
              {act.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompactStats = () => (
  <div className='bg-brand-primary relative mb-6 overflow-hidden rounded-2xl p-5 text-white shadow-lg'>
    <div className='relative z-10 flex items-start justify-between'>
      <div>
        <p className='mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase'>Tổng tài sản (Ước tính)</p>
        <h3 className='text-2xl font-extrabold tracking-tight'>
          45.2 Tỷ <span className='text-sm font-medium text-gray-400'>VNĐ</span>
        </h3>
        <div className='mt-4 flex gap-4 text-xs font-medium'>
          <span className='text-secondary flex items-center gap-1 rounded bg-white/10 px-2 py-1'>
            +5.2% <ArrowUpRight className='h-3 w-3' />
          </span>
          <span className='py-1 text-gray-400'>So với tháng trước</span>
        </div>
      </div>
      <div className='text-secondary flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10'>
        <Wallet className='h-5 w-5' />
      </div>
    </div>
    <div className='bg-primary/30 absolute -right-4 -bottom-10 h-32 w-32 rounded-full blur-2xl'></div>
  </div>
);
