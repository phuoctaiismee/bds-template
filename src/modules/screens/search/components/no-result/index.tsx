import { RotateCcw, SearchX } from 'lucide-react';
import React from 'react';

interface NoResultsProps {
  onReset?: () => void;
  message?: string;
}

export const NoResults: React.FC<NoResultsProps> = ({
  onReset,
  message = 'Không tìm thấy kết quả phù hợp với tiêu chí của bạn.',
}) => {
  return (
    <div className='flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white px-4 py-20 text-center'>
      <div className='relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50'>
        <SearchX className='h-10 w-10 text-gray-400' />
        <div className='absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-red-100 text-xl shadow-sm'>
          🤔
        </div>
      </div>
      <h3 className='text-brand-primary mb-2 text-xl font-bold'>Chưa tìm thấy kết quả</h3>
      <p className='mb-8 max-w-sm text-gray-500'>{message}</p>

      <div className='flex gap-3'>
        {onReset && (
          <button
            onClick={onReset}
            className='bg-brand-primary hover:bg-brand-blue shadow-brand-primary/20 flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-colors'
          >
            <RotateCcw className='h-4 w-4' /> Xóa bộ lọc
          </button>
        )}
      </div>

      <div className='mt-8 w-full max-w-md border-t border-gray-100 pt-8'>
        <p className='mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase'>Gợi ý tìm kiếm</p>
        <div className='flex flex-wrap justify-center gap-2'>
          {['Căn hộ Quận 2', 'Nhà phố giá 5 tỷ', 'Penthouse View sông', 'Masteri Centre Point'].map((tag) => (
            <span
              key={tag}
              className='cursor-pointer rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
