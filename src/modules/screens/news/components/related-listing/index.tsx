import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function RelatedListings({ location, count }: { location: string; count: number }) {
  const listings = [
    {
      title: 'The Global City - Soho',
      price: '42.5 Tỷ',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop',
    },
    {
      title: 'Penthouse Empire City',
      price: '68 Tỷ',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200&auto=format&fit=crop',
    },
    {
      title: 'Biệt thự Thảo Điền',
      price: '120 Tỷ',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop',
    },
  ];

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm'>
      <div className='border-b border-gray-100 bg-gray-50/50 p-5'>
        <div className='text-brand-blue mb-1 flex items-center gap-2 text-xs font-bold tracking-wider uppercase'>
          <MapPin className='h-3.5 w-3.5' />
          <span>Thị trường thực tế</span>
        </div>
        <h3 className='text-brand-primary text-sm font-bold'>Bất động sản tại {location}</h3>
      </div>

      <div className='divide-y divide-gray-100'>
        {listings.map((item, idx) => (
          <Link href='/search' key={idx} className='group flex gap-3 p-4 transition-colors hover:bg-gray-50'>
            <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'>
              <img src={item.img} className='h-full w-full object-cover' alt={item.title} />
            </div>
            <div>
              <h4 className='text-brand-primary group-hover:text-brand-blue mb-1 line-clamp-2 text-sm font-bold'>
                {item.title}
              </h4>
              <p className='text-brand-primary text-xs font-bold'>{item.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className='p-4'>
        <Link
          href='/search'
          className='bg-brand-primary hover:bg-brand-blue shadow-brand-blue/20 block w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-lg transition-colors'
        >
          Xem {count}+ tin đăng khác
        </Link>
      </div>
    </div>
  );
}
