'use client';
import { Bath, BedDouble, Building2, CheckCircle2, ChevronDown, ChevronUp, Compass, MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { RentalTerms } from './financial-calculator';
import { SpecItem } from './shared';

export default function PropertyInfo({ property, isRent }: any) {
  const [isDescExpanded, setDescExpanded] = useState(false);

  return (
    <>
      {/* Highlights */}
      <div className='mb-10'>
        <h3 className='text-brand-primary mb-4 flex items-center gap-2 text-lg font-bold'>
          <Star className='h-5 w-5 fill-yellow-500 text-yellow-500' /> Điểm nổi bật
        </h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {property.highlights.map((item: string, idx: number) => (
            <div key={idx} className='flex items-start gap-3 rounded-xl border border-green-100 bg-green-50/50 p-3'>
              <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-green-600' />
              <span className='text-brand-primary text-sm leading-snug font-medium'>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Specs */}
      <div className='mb-10 grid grid-cols-2 gap-4 md:grid-cols-4'>
        <SpecItem icon={BedDouble} label='Phòng ngủ' value={`${property.bedrooms} PN`} />
        <SpecItem icon={Bath} label='Vệ sinh' value={`${property.bathrooms} WC`} />
        <SpecItem icon={Compass} label='Hướng' value={property.direction} highlight />
        <SpecItem icon={Building2} label={isRent ? 'Tầng' : 'Kết cấu'} value={property.floors} />
      </div>

      {isRent && <RentalTerms data={property} />}

      {/* Description */}
      <div className='mb-10 border-b border-gray-200 pb-10'>
        <h3 className='text-brand-primary mb-4 text-lg font-bold'>Thông tin chi tiết</h3>
        <div
          className={`relative overflow-hidden transition-all duration-500 ${isDescExpanded ? 'max-h-500' : 'max-h-70'}`}
        >
          <p className='text-base leading-relaxed whitespace-pre-line text-gray-600'>{property.description}</p>
          {!isDescExpanded && (
            <div className='from-background via-background/90 absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent' />
          )}
        </div>
        <button
          onClick={() => setDescExpanded(!isDescExpanded)}
          className='text-primary mt-4 flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors hover:bg-blue-50'
        >
          {isDescExpanded ? (
            <>
              Thu gọn <ChevronUp className='h-4 w-4' />
            </>
          ) : (
            <>
              Xem thêm chi tiết <ChevronDown className='h-4 w-4' />
            </>
          )}
        </button>
      </div>

      {/* Amenities */}
      <div className='mb-10 border-b border-gray-200 pb-10'>
        <h3 className='text-brand-primary mb-6 text-lg font-bold'>Tiện ích đặc quyền</h3>
        <div className='space-y-6'>
          <div>
            <h4 className='mb-3 text-sm font-bold text-gray-500 uppercase'>Nội khu</h4>
            <div className='flex flex-wrap gap-3'>
              {property.amenities.internal.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className='rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className='mb-3 text-sm font-bold text-gray-500 uppercase'>Ngoại khu</h4>
            <div className='flex flex-wrap gap-3'>
              {property.amenities.external.map((item: string, idx: number) => (
                <span
                  key={idx}
                  className='rounded-full border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600'
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhood */}
      <div className='mb-10 border-b border-gray-200 pb-10'>
        <h3 className='text-brand-primary mb-6 flex items-center gap-2 text-lg font-bold'>
          <MapPin className='text-primary h-5 w-5' /> Vị trí & Kết nối
        </h3>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {property.nearby.map((place: any, idx: number) => (
            <div key={idx} className='flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4'>
              <div className='flex items-center gap-3'>
                <div className='text-primary flex h-10 w-10 items-center justify-center rounded-full bg-blue-50'>
                  <place.icon className='h-5 w-5' />
                </div>
                <div>
                  <p className='text-brand-primary text-sm font-bold'>{place.name}</p>
                  <p className='text-xs text-gray-500'>{place.distance}</p>
                </div>
              </div>
              <span className='text-secondary rounded bg-green-50 px-2 py-1 text-sm font-bold'>{place.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
