'use client';

import { useRouter } from '@/lib/navigation';
import { IconButton } from '@mui/material';
import { ArrowLeft, MapPin, Search } from 'lucide-react';

export default function PlanningHeader() {
  const router = useRouter();
  return (
    <header className='z-20 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm'>
      <div className='flex items-center gap-4'>
        <IconButton onClick={() => router.back()} className='rounded-full p-2 transition-colors hover:bg-gray-100'>
          <ArrowLeft className='h-5 w-5 text-gray-600' />
        </IconButton>
        <h1 className='text-brand-primary hidden text-lg font-bold md:block'>Tra cứu quy hoạch</h1>

        {/* Search Bar */}
        <div className='group relative'>
          <input
            type='text'
            placeholder='Nhập tọa độ, số tờ/thửa, địa chỉ...'
            className='focus:border-primary w-64 rounded-xl border border-transparent bg-gray-100 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:bg-white md:w-96'
          />
          <Search className='group-focus-within:text-brand-primary absolute top-2.5 left-3 h-4 w-4 text-gray-400' />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <button className='bg-brand-primary hover:bg-primary hidden items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors md:flex'>
          <MapPin className='h-4 w-4' /> Vị trí của tôi
        </button>
      </div>
    </header>
  );
}
