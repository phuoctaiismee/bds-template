'use client';
import { Armchair, Banknote, Calculator, CalendarClock, FileText, PawPrint } from 'lucide-react';
import { useState } from 'react';

export const RentalTerms = ({ data }: { data: any }) => (
  <div className='mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm text-base'>
    <h3 className='text-brand-primary mb-4 flex items-center gap-2 font-bold'>
      <FileText className='text-primary h-5 w-5' /> Điều kiện thuê
    </h3>
    <div className='grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3'>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Tiền cọc</p>
        <p className='text-brand-primary font-bold'>{data.deposit}</p>
      </div>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Thanh toán</p>
        <p className='text-brand-primary font-bold'>Theo tháng</p>
      </div>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Hợp đồng</p>
        <p className='text-brand-primary font-bold'>{data.leaseTerm}</p>
      </div>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Thú cưng</p>
        <div className='flex items-center gap-1 font-bold text-green-600'>
          <PawPrint className='h-3.5 w-3.5' /> {data.petPolicy}
        </div>
      </div>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Tình trạng</p>
        <div className='text-primary flex items-center gap-1 font-bold'>
          <Armchair className='h-3.5 w-3.5' /> {data.furnitureStatus}
        </div>
      </div>
      <div>
        <p className='mb-1 text-xs font-bold text-gray-500 uppercase'>Nhận nhà</p>
        <div className='text-brand-primary flex items-center gap-1 font-bold'>
          <CalendarClock className='h-3.5 w-3.5' /> {data.moveInDate}
        </div>
      </div>
    </div>
  </div>
);

export const MoveInCostEstimator = ({
  price,
  depositMonths,
  fees,
}: {
  price: number;
  depositMonths: number;
  fees: any;
}) => {
  const depositTotal = price * depositMonths;
  const total = depositTotal + price;
  return (
    <div className='rounded-2xl border border-gray-100 bg-gray-50 p-6'>
      <h3 className='text-brand-primary mb-4 flex items-center gap-2 font-bold'>
        <Banknote className='text-primary h-5 w-5' /> Chi phí ban đầu (Ước tính)
      </h3>
      <div className='mb-6 space-y-3 text-sm'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Tiền cọc ({depositMonths} tháng)</span>
          <span className='text-brand-primary font-bold'>{depositTotal} Triệu</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-600'>Tiền thuê tháng đầu</span>
          <span className='text-brand-primary font-bold'>{price} Triệu</span>
        </div>
        <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
          <span className='text-brand-primary font-bold'>Tổng cần chuẩn bị</span>
          <span className='text-primary text-xl font-extrabold'>{total} Triệu</span>
        </div>
      </div>
      <div className='space-y-2 rounded-xl border border-gray-200 bg-white p-3 text-xs'>
        <p className='mb-1 font-bold tracking-wider text-gray-500 uppercase'>Phí hàng tháng</p>
        <div className='flex justify-between'>
          <span className='text-gray-500'>Phí quản lý</span>
          <span className='font-medium text-green-600'>{fees.management}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-500'>Gửi ô tô</span>
          <span className='text-brand-primary font-medium'>{fees.parking_car}</span>
        </div>
      </div>
    </div>
  );
};

export const LoanCalculator = ({ price }: { price: number }) => {
  const [percent, setPercent] = useState(70);
  const [years, setYears] = useState(20);
  const interestRate = 8.5;
  const loanAmount = (price * percent) / 100;
  const monthlyInterest = interestRate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment =
    (loanAmount * 1000000000 * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numPayments));

  return (
    <div className='rounded-2xl border border-gray-100 bg-gray-50 p-6'>
      <h3 className='text-brand-primary mb-4 flex items-center gap-2 font-bold'>
        <Calculator className='text-primary h-5 w-5' /> Ước tính vay ngân hàng
      </h3>
      <div className='mb-6 space-y-4'>
        <div>
          <div className='mb-2 flex justify-between text-sm'>
            <span className='text-gray-500'>Tỷ lệ vay</span>
            <span className='text-brand-primary font-bold'>
              {percent}% ({loanAmount.toFixed(1)} Tỷ)
            </span>
          </div>
          <input
            type='range'
            min='30'
            max='80'
            step='5'
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            className='accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>
        <div>
          <div className='mb-2 flex justify-between text-sm'>
            <span className='text-gray-500'>Thời hạn vay</span>
            <span className='text-brand-primary font-bold'>{years} Năm</span>
          </div>
          <input
            type='range'
            min='5'
            max='35'
            step='5'
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className='accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
          />
        </div>
      </div>
      <div className='rounded-xl border border-gray-200 bg-white p-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-gray-500'>Trả hàng tháng (ước tính)</span>
          <span className='text-primary text-xl font-extrabold'>{(monthlyPayment / 1000000).toFixed(1)} Tr</span>
        </div>
        <p className='mt-2 text-right text-[10px] text-gray-400'>*Lãi suất tạm tính {interestRate}%/năm.</p>
      </div>
      <button className='text-primary mt-4 w-full py-2 text-sm font-bold hover:underline'>
        Nhận tư vấn gói vay ưu đãi &rarr;
      </button>
    </div>
  );
};
