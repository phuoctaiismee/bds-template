import { Building2, Download, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';

interface ExpertProps {
  name: string;
  role: string;
  avatar: string;
  phone: string;
}

export function Sidebar({ expert }: { expert: ExpertProps }) {
  return (
    <div className='sticky top-24 space-y-6'>
      {/* Expert Card */}
      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-900/5'>
        <div className='mb-6 flex items-center gap-4'>
          <div className='relative h-16 w-16'>
            <Image
              src={expert.avatar}
              alt={expert.name}
              fill
              className='rounded-full border-2 border-white object-cover shadow-md'
            />
            <div className='absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500'></div>
          </div>
          <div>
            <p className='text-xs font-bold text-gray-500 uppercase'>Phụ trách dự án</p>
            <h3 className='text-lg font-bold text-slate-900'>{expert.name}</h3>
            <div className='mt-1 flex items-center gap-1 text-xs font-bold text-primary'>
              <Building2 className='h-3 w-3' /> Aetheria Premium
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <button className='flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-primary'>
            <Phone className='h-4 w-4' /> Liên hệ tư vấn
          </button>
          <button className='flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-bold text-slate-900 transition-colors hover:bg-gray-50'>
            <MessageCircle className='h-4 w-4' /> Nhắn Zalo
          </button>
        </div>

        <div className='mt-6 border-t border-gray-100 pt-6'>
          <p className='text-center text-xs leading-relaxed text-gray-400'>
            Cam kết bảo mật thông tin. Tư vấn trung thực, khách quan.
          </p>
        </div>
      </div>

      {/* Docs */}
      <div className='rounded-2xl border border-gray-100 bg-slate-50 p-6'>
        <h4 className='mb-4 font-bold text-slate-900'>Tài liệu dự án</h4>
        <ul className='space-y-3'>
          {['Brochure dự án (PDF)', 'Mặt bằng tầng (PDF)', 'Chính sách bán hàng (PDF)'].map((doc, i) => (
            <li key={i} className='group flex cursor-pointer items-center justify-between text-sm'>
              <span className='text-gray-600 transition-colors group-hover:text-primary'>{doc}</span>
              <Download className='h-4 w-4 text-gray-400 group-hover:text-primary' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
