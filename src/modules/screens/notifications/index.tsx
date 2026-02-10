'use client';

import { Link, useRouter } from '@/lib/navigation';
import { ArrowLeft, Bell, CheckCheck, ChevronRight, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import NotificationIcon from './components/notification-icon';
import { NOTIFICATIONS } from './contants';
const NotificationScreen = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'promotion' | 'system'>('all');
  const [data, setData] = useState(NOTIFICATIONS);
  const router = useRouter();

  const handleMarkAllRead = () => {
    setData((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !item.isRead;
    return (
      item.type === activeFilter ||
      (activeFilter === 'promotion' && (item.type === 'price_drop' || item.type === 'new_listing'))
    );
  });
  return (
    <div className='min-h-screen bg-white pt-4 pb-20 md:bg-gray-50'>
      <div className='container mx-auto max-w-3xl px-0 md:px-6'>
        {/* Header Desktop */}
        <div className='mb-6 hidden items-end justify-between md:flex'>
          <div>
            <h1 className='text-brand-primary mb-2 text-3xl font-extrabold'>Thông báo</h1>
            <p className='text-sm text-gray-500'>Cập nhật tin tức mới nhất dành cho bạn</p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className='text-primary hover:border-primary flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold transition-colors hover:underline'
          >
            <CheckCheck className='h-4 w-4' /> Đánh dấu đã đọc
          </button>
        </div>

        {/* Header Mobile (Sticky) */}
        <div className='sticky top-16 z-30 border-b border-gray-100 bg-white/95 backdrop-blur md:hidden'>
          <div className='flex items-center justify-between px-4 py-4'>
            <div className='flex items-center gap-3'>
              <button onClick={() => router.back()} className='-ml-2 rounded-full p-2 text-gray-600 hover:bg-gray-100'>
                <ArrowLeft className='h-5 w-5' />
              </button>
              <h1 className='text-brand-primary text-xl font-extrabold'>Thông báo</h1>
            </div>
            <button onClick={handleMarkAllRead} className='text-primary p-2'>
              <CheckCheck className='h-5 w-5' />
            </button>
          </div>

          {/* Filters */}
          <div className='scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-3'>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'unread', label: 'Chưa đọc' },
              { id: 'promotion', label: 'Ưu đãi & Tin tức' },
              { id: 'system', label: 'Hệ thống' },
            ].map((f) => (
              <button
                key={f.id}
                // @ts-ignore
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === f.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className='min-h-125 md:overflow-hidden md:rounded-2xl md:border md:border-gray-200 md:bg-white md:shadow-sm'>
          {/* Desktop Filters */}
          <div className='hidden border-b border-gray-100 bg-gray-50/50 p-2 md:flex'>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'unread', label: 'Chưa đọc' },
              { id: 'promotion', label: 'Ưu đãi & Tin tức' },
              { id: 'system', label: 'Hệ thống' },
            ].map((f) => (
              <button
                key={f.id}
                // @ts-ignore
                onClick={() => setActiveFilter(f.id)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  activeFilter === f.id
                    ? 'text-primary bg-white shadow-sm'
                    : 'hover:text-brand-primary text-gray-500 hover:bg-white/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className='divide-y divide-gray-100'>
            <AnimatePresence mode='popLayout'>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`group relative p-4 transition-colors hover:bg-gray-50 md:p-6 ${!item.isRead ? 'bg-blue-50/40' : 'bg-white'}`}
                  >
                    <div className='flex gap-4'>
                      <NotificationIcon type={item.type} isRead={item.isRead} />

                      <div className='min-w-0 flex-1'>
                        <div className='mb-1 flex items-start justify-between'>
                          <h3
                            className={`text-sm md:text-base ${!item.isRead ? 'text-brand-primary font-extrabold' : 'font-bold text-gray-700'}`}
                          >
                            {item.title}
                          </h3>
                          <span className='mt-0.5 ml-2 text-[10px] whitespace-nowrap text-gray-400 md:text-xs'>
                            {item.time}
                          </span>
                        </div>

                        <p
                          className={`mb-3 text-sm leading-relaxed ${!item.isRead ? 'font-medium text-gray-800' : 'text-gray-500'}`}
                        >
                          {item.desc}
                        </p>

                        {/* Context Area (Image + Link) */}
                        {(item.image || item.actionLabel) && (
                          <div className='mt-3 flex items-center gap-4'>
                            {item.image && (
                              <Link
                                href={item.link || '#'}
                                className='block h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 md:h-14 md:w-20'
                              >
                                <img src={item.image} className='h-full w-full object-cover' alt='Context' />
                              </Link>
                            )}
                            {item.actionLabel && (
                              <Link
                                href={item.link || '#'}
                                className='text-primary inline-flex items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold transition-colors hover:underline md:text-sm'
                              >
                                {item.actionLabel} <ChevronRight className='h-3 w-3 md:h-4 md:w-4' />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Delete Action (Hover) */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                      className='absolute top-4 right-4 hidden rounded-full border border-gray-200 bg-white p-2 text-gray-400 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 md:flex'
                      title='Xóa thông báo'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center py-20 text-center'>
                  <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50'>
                    <Bell className='h-8 w-8 text-gray-300' />
                  </div>
                  <h3 className='font-bold text-gray-700'>Chưa có thông báo nào</h3>
                  <p className='mt-1 text-sm text-gray-400'>Khi có tin tức mới, chúng sẽ xuất hiện tại đây.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
