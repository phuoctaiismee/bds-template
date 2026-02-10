import { motion, Variants } from 'framer-motion';
import { ArrowRight, Bath, BedDouble, Heart, Image as ImageIcon, MapPin, Maximize } from 'lucide-react';
import React from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Peninsula Đà Nẵng',
    location: 'Sông Hàn, Đà Nẵng',
    price: '5.2 Tỷ',
    priceUnit: 'Tổng giá',
    specs: { bed: 2, bath: 2, area: '84m²' },
    type: 'Dự án VIP',
    images: 10,
    liked: false,
    image: 'https://images.unsplash.com/photo-1576375801517-45814f908aa4?q=80&w=687&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sun Symphony Residence',
    location: 'Trần Hưng Đạo, Đà Nẵng',
    price: '7.8 Tỷ',
    priceUnit: 'Tổng giá',
    specs: { bed: 3, bath: 2, area: '118m²' },
    type: 'Hot',
    images: 12,
    liked: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2970&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Biệt thự Đảo Ngọc',
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    price: '120 Triệu',
    priceUnit: '/m²',
    specs: { bed: 4, bath: 5, area: '320m²' },
    type: 'Dự án VIP',
    images: 24,
    liked: false,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Penthouse The Royal',
    location: 'Bạch Đằng, Đà Nẵng',
    price: '22 Tỷ',
    priceUnit: 'Tổng giá',
    specs: { bed: 3, bath: 3, area: '210m²' },
    type: null,
    images: 18,
    liked: false,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000&auto=format&fit=crop',
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

export const ProjectGrid: React.FC = () => {
  return (
    <section className='bg-brand-bg relative py-12 md:py-24'>
      <div className='relative z-10 container mx-auto px-4 md:px-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end'
        >
          <div>
            <span className='text-primary mb-2 block text-xs font-bold tracking-wider uppercase'>Cơ hội đầu tư</span>
            <h2 className='text-3xl font-extrabold md:text-4xl'>
              Dự án{' '}
              <span className='from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent'>
                nổi bật nhất
              </span>
            </h2>
          </div>

          <button className='hover:text-primary group flex items-center gap-2 text-sm font-bold text-gray-500 transition-colors'>
            Xem tất cả dự án <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </button>
        </motion.div>

        {/* Grid/Scroll Container */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-4 pb-8 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:px-0 lg:grid-cols-4'
        >
          {PROJECTS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className='group hover:shadow-primary/10 flex min-w-70 cursor-pointer snap-center flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-2xl md:min-w-0'
            >
              {/* Image Container */}
              <div className='relative aspect-4/3 overflow-hidden'>
                {/* Image Zoom Effect bằng CSS thuần cho mượt */}
                <img
                  src={item.image}
                  className='h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110'
                  loading='lazy'
                  alt={item.title}
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60'></div>

                {/* Badges */}
                {item.type && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className='text-brand-primary absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold shadow-sm backdrop-blur'
                  >
                    <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-red-500'></span>
                    {item.type}
                  </motion.span>
                )}

                <button className='absolute top-4 right-4 flex h-8 w-8 transform items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-red-500 active:scale-95'>
                  <Heart className={`h-4 w-4 ${item.liked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <div className='absolute right-4 bottom-4 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md'>
                  <ImageIcon className='h-3 w-3' /> {item.images}
                </div>

                <div className='absolute bottom-4 left-4 text-white'>
                  <p className='text-xl font-extrabold tracking-tight'>{item.price}</p>
                  <p className='text-[10px] opacity-80'>{item.priceUnit}</p>
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-1 flex-col p-4 md:p-5'>
                <h3 className='text-brand-primary group-hover:text-primary mb-2 line-clamp-1 text-lg leading-snug font-bold transition-colors duration-300'>
                  {item.title}
                </h3>
                <div className='mb-4 flex items-center gap-1 text-xs text-gray-500'>
                  <MapPin className='h-3 w-3 shrink-0' />
                  <span className='truncate'>{item.location}</span>
                </div>

                {/* Specs Divider */}
                <div className='mt-auto flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-500'>
                  <div className='flex items-center gap-1.5'>
                    <BedDouble className='text-primary h-4 w-4' />
                    <span>{item.specs.bed}</span>
                  </div>
                  <div className='h-3 w-px bg-gray-200'></div>
                  <div className='flex items-center gap-1.5'>
                    <Bath className='text-primary h-4 w-4' />
                    <span>{item.specs.bath}</span>
                  </div>
                  <div className='h-3 w-px bg-gray-200'></div>
                  <div className='flex items-center gap-1.5'>
                    <Maximize className='text-primary h-4 w-4' />
                    <span>{item.specs.area}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
