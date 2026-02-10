import { cn } from '@/lib/twMerge';
import { STATS_DATA } from './contants';

const BottomStats = ({ isHidden }: { isHidden: boolean }) => (
  <div
    className={cn(
      'absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-black/20 backdrop-blur-md transition-transform duration-500',
      isHidden ? 'translate-y-full' : 'translate-y-0',
    )}
  >
    <div className='container mx-auto px-4 md:px-6'>
      <div className='grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4'>
        {STATS_DATA.map((stat, idx) => (
          <div key={idx} className='flex items-center gap-4 px-4 py-4 first:pl-0 md:px-8 md:py-6'>
            <div className='hidden h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white md:flex'>
              <stat.icon className='h-5 w-5' />
            </div>
            <div>
              <p className='mb-1.5 text-lg leading-none font-extrabold text-white md:text-xl'>{stat.value}</p>
              <p className='text-xs font-bold tracking-wider text-white/60 uppercase'>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default BottomStats;
