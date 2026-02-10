'use client';

import { cn } from '@/lib/twMerge';
import { Button, CardActionArea } from '@mui/material';
import { Formik } from 'formik';
import {
    AlertTriangle,
    ArrowRight,
    Check,
    Copy,
    CreditCard,
    ExternalLink,
    Hexagon,
    Loader2,
    Plus,
    QrCode,
    Share2,
    ShieldCheck,
    Smartphone,
    Wallet,
} from 'lucide-react';
import { FC } from 'react';
import * as Yup from 'yup';

// --- TYPES & MOCK DATA ---
interface BookingData {
  venue: string;
  court: string;
  time: string;
  date: string;
  price: number;
}

const PAYMENT_METHODS = [
  { id: 'ypoint', name: 'Ví YPoint', icon: Hexagon, desc: 'Nhanh nhất' },
  { id: 'vietqr', name: 'VietQR', icon: QrCode, desc: 'Khuyên dùng' },
  { id: 'momo', name: 'MoMo', icon: Smartphone, desc: 'Ví điện tử' },
  { id: 'card', name: 'Thẻ QT', icon: CreditCard, desc: 'Visa/Master' },
];

export interface PaymentFormValues {
  paymentMethod: string;
}

const PaymentSchema = Yup.object().shape({
  paymentMethod: Yup.string().required(),
});

// --- SUB-COMPONENTS ---

const TicketSummary = ({ data }: { data: BookingData }) => (
  <section className='animate-slide-up'>
    <div className='bg-base-900/80 shadow-card relative overflow-hidden rounded-3xl border border-white/10 p-5'>
      <div className='mb-4 flex items-start justify-between'>
        <div>
          <h2 className='text-lg leading-tight font-bold text-white'>{data.venue}</h2>
          <p className='text-accent-foreground text-sm'>{data.court}</p>
        </div>
        <div className='text-right'>
          <div className='mb-1 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white'>
            {data.time}
          </div>
          <div className='text-accent-foreground/80 text-[10px]'>{data.date}</div>
        </div>
      </div>

      <div className='mb-4 h-px w-full border-t border-dashed border-white/10 bg-white/5'></div>

      <div className='flex items-end justify-between'>
        <div>
          <p className='text-accent-foreground/80 mb-1 text-[10px] font-bold tracking-wider uppercase'>
            Tổng thanh toán
          </p>
          <p className='text-accent-foreground text-[10px]'>Bao gồm phí sân & dịch vụ</p>
        </div>
        <div className='text-primary text-2xl font-black tracking-tight'>{data.price.toLocaleString()}đ</div>
      </div>
    </div>
  </section>
);

const PaymentDetails = ({ method, userBalance, price }: { method: string; userBalance: number; price: number }) => {
  const priceInYP = Math.ceil(price / 1000);
  const canAfford = userBalance >= priceInYP;
  const remainingBalance = userBalance - priceInYP;

  switch (method) {
    case 'ypoint':
      return (
        <div
          className={cn(
            'bg-base-900 relative overflow-hidden rounded-3xl border p-6 transition-all',
            canAfford ? 'border-primary/30' : 'border-red-500/30',
          )}
        >
          <div
            className={cn(
              'absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]',
              canAfford ? 'bg-primary/10' : 'bg-red-500/10',
            )}
          ></div>

          <div className='relative z-10 mb-6 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-base-950 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10'>
                <Hexagon size={24} className='text-primary' />
              </div>
              <div>
                <span className='text-accent-foreground/80 block text-xs font-bold'>Số dư YPoint</span>
                <span className='text-xl font-black text-white'>{userBalance.toLocaleString()} YP</span>
              </div>
            </div>
            {canAfford ? (
              <div className='bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full'>
                <Check size={16} />
              </div>
            ) : (
              <button className='flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold text-red-500 uppercase transition-colors hover:bg-red-500/20'>
                <Plus size={12} /> Nạp
              </button>
            )}
          </div>

          <div className='relative z-10 space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-accent-foreground'>Chi phí</span>
              <span className='font-bold text-white'>-{priceInYP} YP</span>
            </div>
            <div className='h-px bg-white/5'></div>
            <div className='flex items-center justify-between'>
              <span className='text-accent-foreground/80 text-xs font-bold uppercase'>Số dư còn lại</span>
              <span className={cn('text-lg font-black', canAfford ? 'text-primary' : 'text-red-500')}>
                {remainingBalance.toLocaleString()} YP
              </span>
            </div>
          </div>

          {!canAfford && (
            <div className='mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3'>
              <AlertTriangle size={16} className='mt-0.5 shrink-0 text-red-500' />
              <p className='text-[10px] text-red-200'>
                Bạn thiếu <b>{Math.abs(remainingBalance)} YP</b>. Vui lòng nạp thêm để thanh toán.
              </p>
            </div>
          )}
        </div>
      );

    case 'vietqr':
      return (
        <div className='relative overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_0_40px_rgba(255,255,255,0.05)]'>
          <div className='absolute top-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500'></div>
          <div className='relative mx-auto mb-4 inline-block'>
            <div className='flex h-48 w-48 items-center justify-center rounded-xl border-2 border-black/5 bg-white p-2'>
              <QrCode size={160} className='text-black' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg'>
                  <Wallet size={20} className='text-blue-600' />
                </div>
              </div>
            </div>
          </div>
          <div className='mb-1 text-2xl font-black text-black'>{price.toLocaleString()}đ</div>
          <p className='mx-auto mb-4 max-w-50 text-xs font-medium text-gray-500'>
            Quét mã bằng ứng dụng ngân hàng hoặc ví điện tử bất kỳ
          </p>
          <div className='flex justify-center gap-2'>
            <button className='flex items-center gap-1.5 rounded-md bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200'>
              <Copy size={14} /> Sao chép
            </button>
            <button className='flex items-center gap-1.5 rounded-md bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-200'>
              <Share2 size={14} /> Chia sẻ
            </button>
          </div>
          <div className='mt-5 flex animate-pulse items-center justify-center gap-2 border-t border-gray-100 pt-4 text-xs font-bold text-blue-600'>
            <Loader2 size={14} className='animate-spin' />
            Đang chờ thanh toán...
          </div>
        </div>
      );

    case 'momo':
    case 'zalopay':
      return (
        <div className='bg-base-900 border-surface-border rounded-3xl border p-8 text-center'>
          <div className='bg-base-950 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10'>
            <Smartphone size={32} className='text-white' />
          </div>
          <h3 className='mb-2 text-lg font-bold text-white'>Chuyển sang ứng dụng</h3>
          <p className='text-accent-foreground mb-6 text-xs'>
            Chúng tôi sẽ mở ứng dụng {method === 'momo' ? 'MoMo' : 'ZaloPay'} để bạn xác nhận thanh toán.
          </p>
          <button className='text-base-950 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-bold transition-colors hover:bg-gray-200'>
            Mở ứng dụng ngay <ExternalLink size={16} />
          </button>
        </div>
      );

    case 'card':
      return (
        <div className='bg-base-900 border-surface-border rounded-3xl border p-5'>
          <div className='space-y-4'>
            <div>
              <label className='text-accent-foreground/80 mb-1 block text-[10px] font-bold uppercase'>Số thẻ</label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='0000 0000 0000 0000'
                  className='bg-base-950 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30'
                />
                <CreditCard size={18} className='text-accent-foreground/80 absolute top-1/2 right-4 -translate-y-1/2' />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-accent-foreground/80 mb-1 block text-[10px] font-bold uppercase'>
                  Ngày hết hạn
                </label>
                <input
                  type='text'
                  placeholder='MM/YY'
                  className='bg-base-950 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30'
                />
              </div>
              <div>
                <label className='text-accent-foreground/80 mb-1 block text-[10px] font-bold uppercase'>CVV</label>
                <input
                  type='text'
                  placeholder='123'
                  className='bg-base-950 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30'
                />
              </div>
            </div>
            <div className='mt-2 flex items-center gap-2'>
              <ShieldCheck size={14} className='text-primary' />
              <span className='text-accent-foreground text-[10px]'>Thông tin được mã hóa an toàn 256-bit</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

// --- MAIN FORM COMPONENT ---

interface PaymentFormProps {
  initialValue?: PaymentFormValues;
  userBalance: number;
  bookingData: BookingData;
  onSubmit: (values: PaymentFormValues) => Promise<void>;
}

const PaymentForm: FC<PaymentFormProps> = ({
  initialValue = { paymentMethod: 'ypoint' },
  userBalance,
  bookingData,
  onSubmit,
}) => {
  return (
    <Formik initialValues={initialValue} validationSchema={PaymentSchema} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => {
        // Logic check balance YPoint
        const priceInYP = Math.ceil(bookingData.price / 1000);
        const canAffordYPoint = userBalance >= priceInYP;
        const isYPointSelected = values.paymentMethod === 'ypoint';

        return (
          <>
            <div className='relative z-10 flex-1 space-y-6 overflow-y-auto px-5 pt-6 pb-50'>
              {/* A. SUMMARY */}
              <TicketSummary data={bookingData} />

              {/* B. METHODS */}
              <section>
                <h3 className='text-accent-foreground/80 mb-3 text-xs font-bold tracking-wider uppercase'>
                  Phương thức thanh toán
                </h3>
                <div className='grid grid-cols-4 gap-3'>
                  {PAYMENT_METHODS.map((m) => (
                    <CardActionArea
                      key={m.id}
                      onClick={() => setFieldValue('paymentMethod', m.id)}
                      className={cn(
                        'group relative flex flex-col items-center justify-center rounded-xl border p-3 transition-all duration-300',
                        values.paymentMethod === m.id
                          ? 'bg-base-800 border-primary z-10 scale-[1.02] shadow-[0_0_15px_rgba(193,254,6,0.15)]'
                          : 'bg-base-900/60 hover:bg-base-900 border-white/5 hover:border-white/20',
                      )}
                    >
                      <div
                        className={cn(
                          'mb-2 flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                          values.paymentMethod === m.id
                            ? 'bg-primary text-base-950'
                            : 'bg-base-950 text-accent-foreground/80 border border-white/10',
                        )}
                      >
                        <m.icon size={20} strokeWidth={1.5} />
                      </div>
                      <span
                        className={cn(
                          'text-xs font-bold',
                          values.paymentMethod === m.id ? 'text-white' : 'text-accent-foreground',
                        )}
                      >
                        {m.name}
                      </span>
                      {values.paymentMethod === m.id && (
                        <div className='bg-primary animate-scale-in absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full'>
                          <Check size={10} className='text-base-950 stroke-4' />
                        </div>
                      )}
                    </CardActionArea>
                  ))}
                </div>
              </section>

              {/* C. EXECUTION PANEL */}
              <section className='animate-fade-in'>
                <PaymentDetails method={values.paymentMethod} userBalance={userBalance} price={bookingData.price} />
              </section>

              {/* Safety Note */}
              <div className='px-4 text-center'>
                <p className='text-accent-foreground/80 text-[10px]'>
                  <AlertTriangle size={10} className='mr-1 inline' />
                  Không chia sẻ mã vé sau khi thanh toán để tránh mất quyền lợi.
                </p>
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className='pointer-events-none fixed right-0 bottom-0 left-0 z-50'>
              <div className='from-base-950 via-base-950/95 absolute inset-x-0 bottom-0 h-60 bg-linear-to-t to-transparent'></div>

              <div className='pointer-events-auto relative p-6 pb-8'>
                <Button
                  variant='contained'
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || (isYPointSelected && !canAffordYPoint)}
                  className={cn(
                    'shadow-glow flex h-16 w-full transform items-center justify-center gap-2 rounded-3xl text-sm font-black tracking-wider uppercase transition-all duration-300',
                    isSubmitting
                      ? 'bg-base-800 text-accent-foreground/80 cursor-wait'
                      : isYPointSelected && !canAffordYPoint
                        ? 'bg-red-500 text-white shadow-none hover:bg-red-600'
                        : 'bg-primary text-base-950 hover:bg-primary/90 hover:scale-[1.02] active:scale-95',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />
                      Đang xử lý...
                    </>
                  ) : isYPointSelected ? (
                    canAffordYPoint ? (
                      'Thanh toán bằng YPoint'
                    ) : (
                      'Nạp thêm YPoint'
                    )
                  ) : (
                    <>
                      {values.paymentMethod === 'vietqr' ? 'Tôi đã thanh toán' : 'Xác nhận thanh toán'}
                      <ArrowRight size={20} strokeWidth={2.5} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default PaymentForm;
