import { CheckCircle2, Clock, MapPin } from 'lucide-react';
import { LegalBadge } from './shared';

export default function PropertyHeader({ property, isRent }: any) {
  return (
    <div className='mb-8'>
      <div className='mb-3 flex flex-wrap gap-2'>
        <LegalBadge type={property.legal} />
        <span className='inline-flex items-center gap-1 rounded-lg border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold tracking-wide text-green-700 uppercase'>
          <CheckCircle2 className='h-3.5 w-3.5' /> Đã xác thực
        </span>
        <span className='inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600'>
          <Clock className='h-3.5 w-3.5' /> {property.postedTime}
        </span>
      </div>
      <h1 className='text-brand-primary mb-3 text-2xl leading-tight font-extrabold md:text-3xl'>{property.title}</h1>
      <div className='mb-6 flex items-center gap-2 text-sm text-gray-500 md:text-base'>
        <MapPin className='text-primary h-5 w-5 shrink-0' />{' '}
        <span className='font-medium text-gray-700'>{property.address}</span>
      </div>
      <div className='from-brand-primary relative mb-8 overflow-hidden rounded-2xl bg-linear-to-r to-[#1e293b] p-6 text-white shadow-xl'>
        <div className='pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl'></div>
        <div className='relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
          <div>
            <p className='mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase'>
              {isRent ? 'Giá thuê / Tháng' : 'Giá bán (Có thương lượng)'}
            </p>
            <div className='flex items-baseline gap-2'>
              <span className='text-4xl font-extrabold text-white'>
                {property.price} {property.priceUnit}
              </span>
              {isRent ? (
                <span className='rounded bg-white/10 px-2 py-1 text-sm font-bold text-green-400'>
                  <CheckCircle2 className='mr-1 inline h-3 w-3' /> {property.pricePerUnit}
                </span>
              ) : (
                <span className='rounded bg-white/10 px-2 py-1 text-sm font-medium text-gray-300'>
                  ~ {property.pricePerUnit}
                </span>
              )}
            </div>
          </div>
          <div className='text-left sm:text-right'>
            <p className='mb-1 text-xs font-bold tracking-wider text-gray-400 uppercase'>Diện tích</p>
            <span className='text-2xl font-bold text-white'>{property.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
