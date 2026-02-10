'use client';
import { CheckCircle2, Loader2, Lock, LogIn, Send, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => ({ isAuthenticated: true, user: { name: 'Test User', phone: '0909000111' } });

export default function ContactForm({
  type = 'viewing',
  onSuccess,
}: {
  type?: 'viewing' | 'info';
  onSuccess?: () => void;
}) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!name || !phone) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      if (onSuccess) setTimeout(onSuccess, 2000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className='animate-in fade-in zoom-in rounded-xl border border-green-100 bg-green-50 p-6 text-center duration-300'>
        <div className='mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600'>
          <CheckCircle2 className='h-6 w-6' />
        </div>
        <h4 className='text-brand-primary mb-1 font-bold'>Đã gửi yêu cầu!</h4>
        <p className='text-xs text-gray-500'>Môi giới sẽ liên hệ với bạn trong vòng 15 phút.</p>
        <button onClick={() => setStatus('idle')} className='text-primary mt-4 text-xs font-bold hover:underline'>
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='relative space-y-3'>
      {!isAuthenticated && (
        <div className='absolute inset-0 z-20 flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white/60 p-4 text-center backdrop-blur-sm'>
          <Lock className='text-brand-primary mb-2 h-8 w-8 opacity-50' />
          <p className='mb-3 text-xs font-bold text-gray-600'>Đăng nhập để đặt lịch & bảo vệ quyền lợi</p>
          <button
            type='button'
            onClick={() => router.push('/login')}
            className='bg-brand-primary hover:bg-primary flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-bold text-white transition-colors'
          >
            <LogIn className='h-4 w-4' /> Đăng nhập ngay
          </button>
        </div>
      )}
      <div className={!isAuthenticated ? 'pointer-events-none opacity-60 blur-[2px]' : ''}>
        <div className='space-y-3'>
          <input
            type='text'
            placeholder='Họ tên của bạn'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-all outline-none focus:bg-white'
            required
            readOnly={!!user}
          />
          <input
            type='tel'
            placeholder='Số điện thoại liên hệ'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-all outline-none focus:bg-white'
            required
            readOnly={!!user}
          />
          {type === 'viewing' && (
            <div className='relative'>
              <input
                type='date'
                className='focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-all outline-none focus:bg-white'
              />
            </div>
          )}
        </div>
      </div>
      <button
        disabled={status === 'loading' || !isAuthenticated}
        className='bg-brand-primary hover:bg-primary shadow-brand-primary/20 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-lg transition-all disabled:opacity-70'
      >
        {status === 'loading' ? (
          <Loader2 className='h-5 w-5 animate-spin' />
        ) : (
          <>
            {type === 'viewing' ? 'Đặt lịch xem ngay' : 'Nhận thông tin'} <Send className='h-4 w-4' />
          </>
        )}
      </button>
      <div className='mt-2 flex items-center justify-center gap-1.5 text-[10px] text-gray-400'>
        <ShieldCheck className='h-3 w-3' /> Thông tin của bạn được bảo mật tuyệt đối
      </div>
    </form>
  );
}
