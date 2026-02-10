'use client'
import { IconButton } from '@mui/material';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import FilterFormContent from './formats';

const MobileFilterModal: React.FC<{ isOpen: boolean; onClose: () => void; mode: 'sale' | 'rent' }> = ({
  isOpen,
  onClose,
  mode,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-9998 bg-black/60 lg:hidden'
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed inset-0 z-9999 flex flex-col bg-white lg:hidden'
          >
            <div className='safe-area-top flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 py-4'>
              <IconButton onClick={onClose} className='-ml-2 p-2 text-gray-400 hover:text-gray-900'>
                <X className='h-6 w-6' />
              </IconButton>
              <h2 className='text-brand-primary text-lg font-extrabold'>Bộ lọc {mode === 'rent' ? 'cho thuê' : ''}</h2>
              <button className='text-brand-blue text-sm font-bold'>Đặt lại</button>
            </div>
            <div className='safe-area-bottom flex-1 overflow-y-auto overscroll-contain px-5 py-6'>
              <FilterFormContent mode={mode} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};
export default MobileFilterModal;
