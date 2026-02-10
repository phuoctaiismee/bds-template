import { Building2, Lock, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

// Mock Auth (Tạm thời để đây hoặc import từ context)
export const useAuth = () => ({ isAuthenticated: true });

export const SpecItem = ({ icon: Icon, label, value, highlight }: any) => (
  <div className='hover:border-primary/30 flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 p-3 transition-colors md:p-4'>
    <div className='flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-500 uppercase md:text-xs'>
      <Icon className='h-3.5 w-3.5' /> {label}
    </div>
    <div className={`text-sm font-bold md:text-lg ${highlight ? 'text-primary' : 'text-brand-primary'}`}>
      {value}
    </div>
  </div>
);

export const LegalBadge = ({ type }: { type: string }) => (
  <div className='text-primary inline-flex items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold tracking-wide uppercase'>
    <Building2 className='h-3.5 w-3.5' /> {type}
  </div>
);

export const ProtectedContactButton = ({ phone, type, className, label }: any) => {
  const { isAuthenticated } = useAuth();

  const maskedPhone = phone.slice(0, 4) + ' *** ***';
  const displayPhone = isAuthenticated ? phone : maskedPhone;

  const href = type === 'call' ? `tel:${phone.replace(/\s/g, '')}` : 'https://zalo.me';

  return (
    <Link
      href={!isAuthenticated ? '/login' : href}
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
    </Link>
  );
};
