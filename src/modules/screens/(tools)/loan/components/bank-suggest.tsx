import { Building2 } from 'lucide-react';

export default function BankSuggestion() {
  return (
    <div className='flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-6'>
      <div className='flex items-center gap-4'>
        <div className='text-primary flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm'>
          <Building2 className='h-6 w-6' />
        </div>
        <div>
          <h4 className='text-brand-primary font-bold'>Cần tư vấn gói vay tốt nhất?</h4>
          <p className='text-sm text-gray-600'>Kết nối với chuyên gia tài chính Aetheria.</p>
        </div>
      </div>
      <button className='bg-primary rounded-lg px-5 py-2.5 font-bold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-700'>
        Đăng ký
      </button>
    </div>
  );
}
