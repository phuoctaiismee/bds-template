import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { InventoryItem } from '../../mock';

export function InventoryList({ inventory }: { inventory: InventoryItem[] }) {
  return (
    <section>
      <div className='mb-6 flex items-end justify-between'>
        <div>
          <h3 className='text-xl font-bold text-slate-900'>Sản phẩm đang bán</h3>
          <p className='mt-1 text-sm text-gray-500'>Các tin đăng chuyển nhượng & giỏ hàng CĐT</p>
        </div>
        <Link
          href='/search'
          className='hidden items-center gap-1 text-sm font-bold text-primary hover:underline md:flex'
        >
          Xem tất cả <ChevronRight className='h-4 w-4' />
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {inventory.map((item) => (
          <div
            key={item.id}
            className='group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg'
          >
            <div className='relative h-48'>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute top-3 left-3 rounded bg-slate-900 px-2 py-1 text-xs font-bold text-white'>
                {item.price}
              </div>
            </div>
            <div className='p-4'>
              <h4 className='mb-2 line-clamp-2 font-bold text-slate-900 transition-colors group-hover:text-primary'>
                {item.title}
              </h4>
              <p className='text-xs text-gray-500'>{item.specs}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href='/search'
        className='mt-6 block w-full rounded-xl bg-gray-50 py-3 text-center text-sm font-bold text-gray-600 md:hidden'
      >
        Xem tất cả tin đăng
      </Link>
    </section>
  );
}
