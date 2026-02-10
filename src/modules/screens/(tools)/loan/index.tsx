'use client';
import { useRouter } from '@/lib/navigation';
import { IconButton } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { calculateLoanDetails } from '../utils';
import BankSuggestion from './components/bank-suggest';
import LoanInputForm from './components/loan-input';
import LoanResults from './components/loan-result';
import { DEFAULT_VALUES } from './constants';

const LoanScreen = () => {
  const router = useRouter();
  // Inputs State
  const [propertyValue, setPropertyValue] = useState(DEFAULT_VALUES.PROPERTY_VALUE);
  const [loanPercent, setLoanPercent] = useState(DEFAULT_VALUES.LOAN_PERCENT);
  const [loanTerm, setLoanTerm] = useState(DEFAULT_VALUES.LOAN_TERM);
  const [interestRate, setInterestRate] = useState(DEFAULT_VALUES.INTEREST_RATE);

  // Results State
  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPay: 0,
    totalInterest: 0,
    totalPayment: 0,
  });

  // Calculate whenever inputs change
  useEffect(() => {
    const calculated = calculateLoanDetails(propertyValue, loanPercent, loanTerm, interestRate);
    setResults(calculated);
  }, [propertyValue, loanPercent, loanTerm, interestRate]);
  return (
    <div className='min-h-screen bg-gray-50 pt-6 pb-12'>
      <div className='container mx-auto px-4 md:px-6'>
        {/* Header */}
        <div className='mb-8 flex items-center gap-2'>
          <IconButton
            onClick={() => router.back()}
            className='hover:text-brand-primary text-gray-500 transition-colors'
          >
            <ArrowLeft className='h-6 w-6' />
          </IconButton>
          <h1 className='text-brand-primary text-2xl font-extrabold md:text-3xl'>Tính lãi suất vay mua nhà</h1>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          {/* LEFT: Inputs & Suggestions */}
          <div className='space-y-6 lg:col-span-7'>
            <LoanInputForm
              propertyValue={propertyValue}
              setPropertyValue={setPropertyValue}
              loanPercent={loanPercent}
              setLoanPercent={setLoanPercent}
              loanTerm={loanTerm}
              setLoanTerm={setLoanTerm}
              interestRate={interestRate}
              setInterestRate={setInterestRate}
            />
            <BankSuggestion />
          </div>

          {/* RIGHT: Results */}
          <div className='lg:col-span-5'>
            <LoanResults
              monthlyPay={results.monthlyPay}
              loanAmount={results.loanAmount}
              totalInterest={results.totalInterest}
              totalPayment={results.totalPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanScreen;
