'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className='bg-primary z-9999 fixed top-0 right-0 left-0 h-1 origin-left' style={{ scaleX }} />;
}
