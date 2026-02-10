import { cn } from '@/lib/twMerge';
import { ArrowRight, Building2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_IMAGES } from './contants';
const SpotlightCard = ({ isHidden, data }: { isHidden: boolean; data: (typeof HERO_IMAGES)[0] }) => (
  <div
    className={cn(
      'hidden transition-all duration-700 lg:col-span-4 lg:block',
      isHidden ? 'translate-x-20 opacity-0' : 'translate-x-0 opacity-100',
    )}
  >
    <motion.div
      key={data.url} // Change key to trigger animation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='group ml-auto max-w-96 cursor-pointer rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md transition-colors hover:bg-white/15'
    >
      <div className='mb-4 flex items-start justify-between'>
        <span className='bg-primary/90 rounded px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase'>
          Spotlight
        </span>
        <button className='hover:text-primary flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white'>
          <ArrowRight className='h-4 w-4 -rotate-45' />
        </button>
      </div>

      <h3 className='group-hover:text-primary mb-2 text-2xl leading-tight font-bold text-white transition-colors'>
        {data.title}
      </h3>

      <div className='mb-6 flex items-center gap-2 text-sm text-white/80'>
        <MapPin className='h-4 w-4' />
        {data.location}
      </div>

      <div className='flex items-end justify-between border-t border-white/10 pt-4'>
        <div>
          <p className='mb-1 text-xs font-bold tracking-wider text-white/60 uppercase'>Giá khởi điểm</p>
          <p className='text-xl font-bold text-white'>{data.price}</p>
        </div>
        <div className='flex h-10 w-10 items-center justify-center rounded-full border border-white/30'>
          <Building2 className='h-5 w-5 text-white' />
        </div>
      </div>
    </motion.div>
  </div>
);

export default SpotlightCard;
