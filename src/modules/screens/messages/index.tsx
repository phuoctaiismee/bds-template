'use client'
import { Link } from '@/lib/navigation';
import { X } from 'lucide-react';
import { MessageCenter } from './components/message-center';

const MessagesScreen = () => {
  return (
    <div className='flex h-dvh flex-col overflow-hidden bg-white'>
      {/* Standalone Minimal Header */}
      <div className='z-20 flex h-16 flex-none items-center justify-between border-b border-gray-100 bg-white px-4 md:px-6'>
        <Link href='/' className='group flex items-center gap-2'>
          <div className='from-primary to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-tr text-lg font-bold text-white shadow-md transition-transform group-hover:scale-105'>
            A
          </div>
          <span className='text-brand-primary text-lg font-extrabold tracking-tight'>Aetheria Chat</span>
        </Link>

        <Link
          href='/'
          className='hover:text-brand-primary rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100'
          title='Quay lại trang chủ'
        >
          <X className='h-6 w-6' />
        </Link>
      </div>

      {/* Full Height Message Center */}
      <div className='relative flex-1 overflow-hidden'>
        <MessageCenter />
      </div>
    </div>
  );
};

export default MessagesScreen;
