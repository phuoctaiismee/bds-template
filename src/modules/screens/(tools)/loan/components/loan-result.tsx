import { PieChart } from 'lucide-react';
import { formatShort } from '../../utils';

interface LoanResultsProps {
  monthlyPay: number;
  loanAmount: number;
  totalInterest: number;
  totalPayment: number;
}

export default function LoanResults({ monthlyPay, loanAmount, totalInterest, totalPayment }: LoanResultsProps) {
  return (
    <div className='bg-brand-primary sticky top-24 rounded-3xl p-6 text-white shadow-2xl md:p-8'>
      <h3 className='mb-6 flex items-center gap-2 text-lg font-bold'>
        <PieChart className='text-secondary h-5 w-5' /> Kết quả ước tính
      </h3>

      <div className='space-y-6'>
        <div className='rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-sm'>
          <p className='mb-1 text-sm font-bold tracking-wider text-gray-300 uppercase'>
            Trả tháng đầu tiên (Gốc + Lãi)
          </p>
          <p className='text-secondary text-4xl font-extrabold tracking-tight md:text-5xl'>
            {formatShort(monthlyPay)}
          </p>
          <p className='mt-2 text-xs text-gray-400'>Giảm dần các tháng sau</p>
        </div>

        <div className='space-y-4 border-t border-white/10 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-300'>Số tiền vay</span>
            <span className='text-xl font-bold'>{formatShort(loanAmount)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-300'>Tổng lãi phải trả</span>
            <span className='text-xl font-bold'>{formatShort(totalInterest)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-300'>Tổng gốc + lãi</span>
            <span className='text-xl font-bold'>{formatShort(totalPayment)}</span>
          </div>
        </div>

        <button className='text-brand-primary mt-4 w-full rounded-xl bg-white py-4 font-extrabold transition-colors hover:bg-gray-100'>
          Xem lịch trả nợ chi tiết
        </button>

        <p className='px-4 text-center text-[10px] leading-relaxed text-gray-400'>
          *Kết quả chỉ mang tính chất tham khảo. Lãi suất thực tế có thể thay đổi tùy thuộc vào chính sách của từng ngân
          hàng và hồ sơ tín dụng của khách hàng.
        </p>
      </div>
    </div>
  );
}
