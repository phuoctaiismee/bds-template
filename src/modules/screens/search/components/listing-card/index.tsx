import { Link } from '@/lib/navigation';
import { IconButton } from '@mui/material';
import {
    Armchair,
    Banknote,
    Building2,
    CalendarClock,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Compass,
    Grid,
    Heart,
    MapPin,
    MessageCircle,
    Phone,
    Ruler,
    Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Listing } from '../../contants';

const ImageCarousel: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='group relative h-full w-full'>
      <img
        src={images[currentIndex]}
        alt={alt}
        className='h-full w-full object-cover transition-transform duration-500'
      />
      {images.length > 1 && (
        <>
          <IconButton
            onClick={prevImage}
            className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60'
          >
            <ChevronLeft className='h-4 w-4' />
          </IconButton>
          <IconButton
            onClick={nextImage}
            className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/30 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60'
          >
            <ChevronRight className='h-4 w-4' />
          </IconButton>
          <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-1.5 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const isDiamond = listing.tier === 'diamond';
  const isRent = listing.type === 'rent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 md:flex-row lg:flex-col 2xl:flex-row ${
        isDiamond
          ? 'border-primary/30 shadow-[0_0_20px_rgba(30,64,175,0.1)] hover:shadow-[0_0_30px_rgba(30,64,175,0.2)]'
          : 'border-gray-200 hover:shadow-lg'
      }`}
    >
      {/* Link wrapper */}
      <Link href={`/property/${listing.id}?type=${listing.type}`} className='absolute inset-0 z-0' />

      {/* Tier Badge / Ribbons */}
      {isDiamond && (
        <div className='from-primary absolute top-0 left-0 z-20 flex items-center gap-1 rounded-br-lg bg-linear-to-r to-purple-600 px-3 py-1 text-[10px] font-bold text-white uppercase shadow-md'>
          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' /> Tin Vip
        </div>
      )}

      {/* Image Section */}
      <div className='pointer-events-none relative z-10 h-64 w-full shrink-0 overflow-hidden md:pointer-events-auto md:h-auto md:w-70 lg:w-full 2xl:w-[320px]'>
        <ImageCarousel images={listing.images} alt={listing.title} />

        <div className='pointer-events-auto absolute top-3 right-3 z-10 flex gap-2'>
          <button className='rounded-full bg-black/30 p-2 text-white backdrop-blur-md transition-colors hover:bg-red-500'>
            <Heart className='h-4 w-4' />
          </button>
        </div>

        <div className='absolute bottom-3 left-3 z-10 flex flex-wrap gap-2'>
          {isRent && (
            <span className='bg-secondary rounded px-2 py-1 text-[10px] font-bold text-white uppercase shadow-sm'>
              Cho thuê
            </span>
          )}
          <span className='flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[10px] font-bold text-white uppercase backdrop-blur'>
            <Grid className='h-3 w-3' /> {listing.images.length}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className='pointer-events-none relative flex flex-1 flex-col p-4 md:pointer-events-auto md:p-5'>
        {/* Title */}
        <div className='mb-2'>
          <Link
            href={`/property/${listing.id}`}
            className={`hover:text-primary pointer-events-auto line-clamp-2 cursor-pointer text-base leading-snug font-bold transition-colors md:text-lg ${isDiamond ? 'text-brand-primary' : 'text-gray-800'}`}
          >
            {isDiamond && <span className='mr-1 inline-block text-red-500'>🔥</span>}
            {listing.title}
          </Link>
        </div>

        {/* Location */}
        <div className='mb-4 flex items-center gap-1 text-xs text-gray-500 md:text-sm'>
          <MapPin className='h-3.5 w-3.5 shrink-0' />
          <span className='truncate'>{listing.location}</span>
        </div>

        {/* RENT SPECIFIC DETAILS */}
        {isRent ? (
          <div className='mb-4 flex flex-wrap gap-x-4 gap-y-2 rounded-lg border border-gray-100 bg-gray-50 p-2 text-xs font-medium text-gray-600'>
            <div className='flex items-center gap-1.5' title='Diện tích'>
              <Ruler className='h-3.5 w-3.5 text-gray-400' />
              <span>{listing.area} m²</span>
            </div>
            <div className='flex items-center gap-1.5' title='Phòng ngủ'>
              <Building2 className='h-3.5 w-3.5 text-gray-400' />
              <span>{listing.beds} PN</span>
            </div>
            {listing.furnitureDisplay && (
              <div className='flex items-center gap-1.5' title='Nội thất'>
                <Armchair className='text-primary h-3.5 w-3.5' />
                <span>{listing.furnitureDisplay}</span>
              </div>
            )}
            {listing.moveIn && (
              <div className='flex items-center gap-1.5 text-green-700' title='Thời gian trống'>
                <CalendarClock className='h-3.5 w-3.5' />
                <span>{listing.moveIn}</span>
              </div>
            )}
          </div>
        ) : (
          /* SALE SPECIFIC DETAILS */
          <div className='mb-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700'>
            <div className='flex items-center gap-1.5' title='Diện tích'>
              <Ruler className='h-4 w-4 text-gray-400' />
              <span className='font-bold'>{listing.area} m²</span>
            </div>
            <div className='flex items-center gap-1.5' title='Phòng ngủ'>
              <Building2 className='h-4 w-4 text-gray-400' />
              <span className='font-bold'>{listing.beds} PN</span>
            </div>
            <div className='flex items-center gap-1.5' title='Hướng nhà'>
              <Compass className='h-4 w-4 text-gray-400' />
              <span className='font-medium text-gray-600'>{listing.direction || 'KXĐ'}</span>
            </div>
            {listing.legal && (
              <div className='flex items-center gap-1.5' title='Pháp lý'>
                <CheckCircle2 className='h-4 w-4 text-green-500' />
                <span className='text-xs font-medium text-green-700'>{listing.legal}</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {listing.tags && listing.tags.length > 0 && (
          <div className='mb-4 flex flex-wrap gap-2'>
            {listing.tags.map((tag) => (
              <span
                key={tag}
                className='rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600'
              >
                {tag}
              </span>
            ))}
            {/* Show Deposit Badge for Renters explicitly */}
            {isRent && listing.deposit && (
              <span className='text-primary flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold'>
                <Banknote className='h-3 w-3' /> {listing.deposit}
              </span>
            )}
          </div>
        )}

        {/* Bottom: Price & Call Actions */}
        <div className='mt-auto flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center'>
          <div>
            <div className='flex items-baseline gap-2'>
              <span className='text-brand-primary text-xl font-extrabold md:text-2xl'>{listing.priceDisplay}</span>
              <span className='text-xs font-medium text-gray-400 md:text-sm'>
                {listing.pricePerUnit && `• ${listing.pricePerUnit}`}
              </span>
            </div>
            <div className='mt-0.5 flex items-center gap-1 text-[11px] text-gray-400'>
              <Clock className='h-3 w-3' /> {listing.postedTime}
            </div>
          </div>

          <div className='pointer-events-auto flex items-center gap-2'>
            <button className='text-secondary border-secondary/30 hover:bg-secondary z-20 flex flex-1 items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-bold transition-all hover:text-white sm:flex-none'>
              <MessageCircle className='h-4 w-4' /> Zalo
            </button>
            <button className='bg-brand-primary hover:bg-primary shadow-brand-primary/20 z-20 flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-lg transition-all sm:flex-none'>
              <Phone className='h-4 w-4' /> {isRent ? 'Xem nhà' : 'Liên hệ'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ListingCard;
