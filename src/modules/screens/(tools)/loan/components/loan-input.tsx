'use client';

import { Calculator, Calendar, DollarSign, HelpCircle, Percent } from 'lucide-react';
import { parseLocaleNumber } from '../../utils';
import { QUICK_SELECT_VALUES } from '../constants';

interface LoanInputFormProps {
  propertyValue: number;
  setPropertyValue: (val: number) => void;
  loanPercent: number;
  setLoanPercent: (val: number) => void;
  loanTerm: number;
  setLoanTerm: (val: number) => void;
  interestRate: number;
  setInterestRate: (val: number) => void;
}

export default function LoanInputForm({
  propertyValue,
  setPropertyValue,
  loanPercent,
  setLoanPercent,
  loanTerm,
  setLoanTerm,
  interestRate,
  setInterestRate,
}: LoanInputFormProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8'>
      <h3 className='text-brand-primary mb-6 flex items-center gap-2 text-lg font-bold'>
        <Calculator className='text-primary h-5 w-5' /> Thông tin khoản vay
      </h3>

      {/* Property Value */}
      <div className='mb-6'>
        <label className='mb-2 block text-sm font-bold text-gray-700'>Giá trị bất động sản</label>
        <div className='relative'>
          <input
            type='text'
            value={propertyValue.toLocaleString('vi-VN')}
            onChange={(e) => setPropertyValue(parseLocaleNumber(e.target.value))}
            className='text-brand-primary focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-12 text-lg font-bold outline-none'
          />
          <DollarSign className='absolute top-1/2 -translate-y-1/2 left-4 h-5 w-5 text-gray-400' />
          <span className='absolute top-3.5 right-4 text-sm font-bold text-gray-500'>VND</span>
        </div>
        <div className='scrollbar-hide mt-2 flex gap-2 overflow-x-auto'>
          {QUICK_SELECT_VALUES.map((val) => (
            <button
              key={val}
              onClick={() => setPropertyValue(val * 1000000000)}
              className='hover:border-primary hover:text-primary rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-bold whitespace-nowrap text-gray-600 transition-colors'
            >
              {val} Tỷ
            </button>
          ))}
        </div>
      </div>

      {/* Loan Percent Slider */}
      <div className='mb-8'>
        <div className='mb-2 flex justify-between'>
          <label className='text-sm font-bold text-gray-700'>Tỷ lệ vay</label>
          <span className='text-primary text-lg font-bold'>{loanPercent}%</span>
        </div>
        <input
          type='range'
          min='0'
          max='90'
          step='5'
          value={loanPercent}
          onChange={(e) => setLoanPercent(parseInt(e.target.value))}
          className='accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
        />
        <div className='mt-1 flex justify-between text-xs font-bold text-gray-400'>
          <span>0%</span>
          <span>Tối đa 90%</span>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Duration */}
        <div>
          <label className='mb-2 block text-sm font-bold text-gray-700'>Thời hạn vay (Năm)</label>
          <div className='relative'>
            <input
              type='number'
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value))}
              className='text-brand-primary focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 font-bold outline-none'
            />
            <Calendar className='absolute top-3.5 left-3 h-5 w-5 text-gray-400' />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className='mb-2 flex items-center gap-1 text-sm font-bold text-gray-700'>
            Lãi suất (%/Năm)
            <div className='group relative'>
              <HelpCircle className='h-3 w-3 cursor-pointer text-gray-400' />
              <div className='absolute bottom-full left-1/2 z-10 mb-2 hidden w-48 -translate-x-1/2 rounded bg-gray-800 p-2 text-center text-xs text-white shadow-lg group-hover:block'>
                Lãi suất thả nổi trung bình hiện nay khoảng 8-10%
              </div>
            </div>
          </label>
          <div className='relative'>
            <input
              type='number'
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className='text-brand-primary focus:border-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 font-bold outline-none'
            />
            <Percent className='absolute top-3.5 left-3 h-5 w-5 text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  );
}
