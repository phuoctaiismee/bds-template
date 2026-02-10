'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ContactForm from '../components/contact-form';
import { ProtectedContactButton, useAuth } from './shared';

export default function MobileActions({ property, isRent }: any) {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleStartChat = () => {
    if (!isAuthenticated) return router.push('/login');
    router.push(`/messages?chatWith=${property.agent.id}&ref=${property.id}`);
  };

  return (
    <>
      <div className='safe-area-bottom fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white p-4 pb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] lg:hidden'>
        <div className='flex gap-3'>
          <div className='flex flex-1 flex-col justify-center'>
            <span className='text-xs font-bold text-gray-500 uppercase'>{isRent ? 'Giá thuê' : 'Giá tốt'}</span>
            <span className='text-brand-primary text-xl font-extrabold'>
              {property.price} {property.priceUnit}
            </span>
          </div>
          <ProtectedContactButton
            phone={property.agent.phone}
            type='zalo'
            className='text-brand-blue flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 font-bold transition-transform active:scale-95'
            label=' '
          />
          <button
            onClick={() => setContactModalOpen(true)}
            className='bg-brand-primary shadow-brand-primary/30 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 font-bold text-white shadow-lg transition-transform active:scale-95'
          >
            <MessageSquare className='h-5 w-5' /> {isRent ? 'Chat ngay' : 'Tư vấn'}
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isContactModalOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='fixed inset-0 z-[60] bg-black/60 lg:hidden'
                  onClick={() => setContactModalOpen(false)}
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className='safe-area-bottom fixed right-0 bottom-0 left-0 z-[70] rounded-t-3xl bg-white p-6 lg:hidden'
                >
                  <div className='mb-6 flex items-center justify-between'>
                    <h3 className='text-brand-primary text-lg font-bold'>Liên hệ môi giới</h3>
                    <button
                      onClick={() => setContactModalOpen(false)}
                      className='rounded-full bg-gray-100 p-2 text-gray-500'
                    >
                      <X className='h-5 w-5' />
                    </button>
                  </div>
                  <div className='mb-6 flex items-center gap-4 border-b border-gray-100 pb-6'>
                    <img
                      src={property.agent.avatar}
                      className='h-14 w-14 rounded-full border border-gray-100'
                      alt='Agent'
                    />
                    <div>
                      <h4 className='text-brand-primary font-bold'>{property.agent.name}</h4>
                      <p className='text-xs text-gray-500'>{property.agent.role}</p>
                      <div className='mt-1 flex w-fit items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-[10px] text-green-700'>
                        <ShieldCheck className='h-3 w-3' /> Đã xác thực
                      </div>
                    </div>
                  </div>
                  <div className='mb-6 grid grid-cols-2 gap-3'>
                    <ProtectedContactButton
                      phone={property.agent.phone}
                      type='call'
                      className='flex flex-col items-center justify-center rounded-xl border border-green-100 bg-green-50 p-3 font-bold text-green-700'
                      label='Gọi ngay'
                    />
                    <button
                      onClick={handleStartChat}
                      className='text-brand-blue flex flex-col items-center justify-center rounded-xl border border-blue-100 bg-blue-50 p-3 font-bold'
                    >
                      <MessageSquare className='mb-1 h-5 w-5' /> Chat trực tiếp
                    </button>
                  </div>
                  <div className='text-brand-primary mb-3 text-sm font-bold'>Hoặc để lại thông tin:</div>
                  <ContactForm type={isRent ? 'viewing' : 'info'} onSuccess={() => setContactModalOpen(false)} />
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
