'use client';
import { Lock, MessageCircle, MessageSquare, Phone, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ContactForm from './contact-form';
// Mock Auth Hook
const useAuth = () => ({ isAuthenticated: true });

const ProtectedContactButton = ({ phone, type, className, label }: any) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const maskedPhone = phone.slice(0, 4) + ' *** ***';
  const displayPhone = isAuthenticated ? phone : maskedPhone;
  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/login');
    }
  };
  const href = type === 'call' ? `tel:${phone.replace(/\s/g, '')}` : 'https://zalo.me';

  return (
    <a
      href={href}
      onClick={handleClick}
      target={type === 'zalo' && isAuthenticated ? '_blank' : undefined}
      className={className}
    >
      {type === 'call' && <Phone className='h-5 w-5' />}
      {type === 'zalo' && <MessageCircle className='h-5 w-5' />}
      <span>{label || (type === 'call' ? displayPhone : 'Chat Zalo')}</span>
      {!isAuthenticated && type === 'call' && (
        <span className='ml-1 text-[10px] font-normal opacity-80'>(Hiện số)</span>
      )}
      {!isAuthenticated && <Lock className='ml-1 h-3 w-3' />}
    </a>
  );
};

export default function AgentSidebar({ property, isRent, handleStartChat }: any) {
  return (
    <div className='shadow-primary/10 sticky top-24 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl'>
      <div className='bg-brand-primary p-4 text-center text-white'>
        <h3 className='text-lg font-bold'>Liên hệ tư vấn</h3>
        <p className='text-xs text-gray-300 opacity-90'>
          {isRent ? 'Hỏi thông tin & xem nhà miễn phí' : 'Nhận báo giá & hồ sơ pháp lý ngay'}
        </p>
      </div>
      <div className='p-6'>
        <div className='mb-6 flex items-center gap-4'>
          <div className='relative'>
            <img
              src={property.agent.avatar}
              alt={property.agent.name}
              className='h-14 w-14 rounded-full border-2 border-white object-cover shadow-md'
            />
            <div className='absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500'></div>
          </div>
          <div>
            <Link
              href={`/agent/${property.agent.id}`}
              className='text-brand-primary hover:text-primary block text-base font-bold transition-colors'
            >
              {property.agent.name}
            </Link>
            <p className='mb-1 text-xs font-medium text-gray-500'>{property.agent.role}</p>
            <div className='flex w-fit items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold'>
              <Star className='h-3 w-3 fill-yellow-500 text-yellow-500' /> {property.agent.rating}
            </div>
          </div>
        </div>
        <div className='mb-6 space-y-3'>
          <ProtectedContactButton
            phone={property.agent.phone}
            type='call'
            className='bg-secondary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-lg shadow-green-500/20 transition-colors hover:bg-green-600'
          />
          <button
            onClick={handleStartChat}
            className='text-brand-primary hover:border-primary hover:text-primary flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-100 bg-white py-3 font-bold transition-colors'
          >
            <MessageSquare className='h-5 w-5' /> Chat trực tiếp
          </button>
        </div>
        <div className='border-t border-gray-100 pt-6'>
          <h4 className='text-brand-primary mb-3 text-sm font-bold'>
            {isRent ? 'Đặt lịch xem nhà' : 'Yêu cầu tư vấn'}
          </h4>
          <ContactForm type={isRent ? 'viewing' : 'info'} />
        </div>
      </div>
    </div>
  );
}
