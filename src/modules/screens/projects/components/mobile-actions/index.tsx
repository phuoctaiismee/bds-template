'use client';
import { Phone } from 'lucide-react';

export function MobileActionBar() {
  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white p-4 pb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] lg:hidden'>
      <div className='flex gap-3'>
        <button className='flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 leading-none font-bold text-blue-600 transition-transform active:scale-95'>
          <span className='text-xs font-normal'>Tải bảng giá</span>
          <span>Tháng 11</span>
        </button>
        <button className='flex flex-2 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white shadow-lg transition-transform active:scale-95'>
          <Phone className='h-5 w-5' /> Liên hệ tư vấn
        </button>
      </div>
    </div>
  );
}
