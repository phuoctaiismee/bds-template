import { CheckCircle2, FileCheck, HardHat, Info } from 'lucide-react';
import { TimelineEvent } from '../../mock';

// Helper component nhỏ (local)
const TimelineItem = ({ item, isLast }: { item: TimelineEvent; isLast: boolean }) => {
  const getIcon = () => {
    if (item.status === 'completed') return <CheckCircle2 className='h-5 w-5 text-white' />;
    if (item.status === 'in-progress') return <HardHat className='h-5 w-5 text-white' />;
    return <div className='h-2.5 w-2.5 rounded-full bg-gray-300' />;
  };

  const getBg = () => {
    if (item.status === 'completed') return 'bg-green-500';
    if (item.status === 'in-progress') return 'bg-primary';
    return 'bg-gray-100 border-2 border-gray-300';
  };

  return (
    <div className='relative flex gap-4'>
      {!isLast && <div className='absolute top-10 bottom-0 left-4.75 w-[2px] bg-gray-100'></div>}
      <div className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getBg()}`}>
        {getIcon()}
      </div>
      <div className='pb-8'>
        <span
          className={`mb-1 inline-block rounded px-2 py-0.5 text-xs font-bold ${item.status === 'completed' ? 'bg-green-100 text-green-700' : item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
        >
          {item.year}
        </span>
        <h4 className={`font-bold ${item.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>{item.title}</h4>
      </div>
    </div>
  );
};

export function LegalTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <section className='rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8'>
      <div className='mb-8 flex items-center gap-3'>
        <div className='bg-brand-primary flex h-10 w-10 items-center justify-center rounded-lg text-white'>
          <FileCheck className='h-5 w-5' />
        </div>
        <div>
          <h3 className='text-lg font-bold text-gray-900'>Pháp lý & Tiến độ</h3>
          <p className='text-xs text-gray-500'>Cập nhật mới nhất T11/2024</p>
        </div>
      </div>

      <div className='pl-2'>
        {timeline.map((item, idx) => (
          <TimelineItem key={idx} item={item} isLast={idx === timeline.length - 1} />
        ))}
      </div>

      <div className='mt-6 flex gap-3 rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-sm text-yellow-800'>
        <Info className='mt-0.5 h-5 w-5 shrink-0' />
        <p>
          Thông tin pháp lý được tổng hợp từ công bố của CĐT và cơ quan chức năng. Khách hàng nên liên hệ trực tiếp để
          xem hồ sơ gốc.
        </p>
      </div>
    </section>
  );
}
