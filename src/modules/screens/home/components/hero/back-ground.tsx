import { AnimatePresence, motion } from 'motion/react';
import { HERO_IMAGES } from './contants';
const HeroBackground = ({ currentIndex }: { currentIndex: number }) => (
  <div className='pointer-events-none absolute inset-0 z-0 select-none'>
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentIndex}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className='absolute inset-0 h-full w-full'
      >
        <img src={HERO_IMAGES[currentIndex].url} alt='Luxury Real Estate' className='h-full w-full object-cover' />
        <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/70' />
      </motion.div>
    </AnimatePresence>
  </div>
);

export default HeroBackground;
