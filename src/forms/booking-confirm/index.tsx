'use client';

import { cn } from '@/lib/twMerge';
import PaymentOption from '@/modules/screens/bookings/components/payment-option-card';
import { MOCK_USER } from '@/modules/screens/profile/mock';
import { MOCK_VENUES } from '@/modules/screens/venues/mock';
import { Avatar, Button, IconButton } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import {
    ArrowRight,
    Calendar,
    Check,
    Clock,
    Copy,
    Info,
    Loader2,
    PieChart,
    Plus,
    Share2,
    Users,
    Wallet,
} from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import * as Yup from 'yup';

// --- MOCK DATA (Thực tế sẽ truyền qua props) ---
const MOCK_BOOKING_DETAILS = {
  sport: 'Pickleball',
  venue: MOCK_VENUES[0].name,
  court: 'Sân A1',
  time: '19:00 - 20:30',
  date: 'Hôm nay, 24/10',
  price: 300000,
};

// --- TYPES & SCHEMA ---
interface User {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
}

export interface BookingConfirmFormValues {
  paymentMethod: 'me' | 'split';
  joinedUsers: User[];
}

const BookingSchema = Yup.object().shape({
  paymentMethod: Yup.string().oneOf(['me', 'split']).required(),
  joinedUsers: Yup.array().min(1, 'Cần ít nhất 1 người').required(),
});

interface BookingConfirmFormProps {
  initialValue?: Partial<BookingConfirmFormValues>;
  onSubmit?: (
    values: BookingConfirmFormValues,
    helpers: FormikHelpers<BookingConfirmFormValues>,
  ) => void | Promise<void>;
}

// --- SUB-COMPONENTS ---

// 1. Ticket Summary Section
const TicketSummary = ({ countdownDate, paymentMethod }: { countdownDate: number | null; paymentMethod: string }) => {
  return (
    <section className='animate-slide-up'>
      <div className='bg-base-900 shadow-card relative w-full overflow-hidden rounded-3xl border border-white/10'>
        <div className='bg-base-950 flex h-1 w-full'>
          <div className='bg-primary h-full w-full animate-[shimmer_2s_infinite]'></div>
        </div>

        <div className='relative p-5'>
          <div className='mb-4 flex items-start justify-between'>
            <div className='flex flex-col'>
              <div className='mb-1 flex items-center gap-2'>
                <span className='text-primary bg-primary/10 rounded-sm px-1.5 py-0.5 text-[10px] font-black tracking-widest uppercase'>
                  {MOCK_BOOKING_DETAILS.sport}
                </span>
                <span className='rounded-sm bg-white/10 px-1.5 py-0.5 text-[10px] font-black tracking-widest text-white uppercase'>
                  {paymentMethod === 'split' ? 'Đặt nhóm' : 'Cá nhân'}
                </span>
              </div>
              <h2 className='text-xl leading-tight font-black text-white'>{MOCK_BOOKING_DETAILS.court}</h2>
            </div>
            <div className='text-right'>
              {countdownDate && (
                <Countdown
                  date={countdownDate}
                  renderer={({ minutes, seconds, completed }) => {
                    if (completed) return <span className='text-error font-mono font-bold'>00:00</span>;
                    return (
                      <span
                        className={cn(
                          'font-mono text-sm font-bold',
                          minutes === 0 ? 'text-error animate-pulse' : 'text-primary',
                        )}
                      >
                        {zeroPad(minutes)}:{zeroPad(seconds)}
                      </span>
                    );
                  }}
                />
              )}
              <div className='text-accent-foreground/80 text-[9px] font-bold tracking-wider uppercase'>Giữ chỗ</div>
            </div>
          </div>

          <div className='text-accent-foreground bg-base-950/50 flex items-center justify-between rounded-xl border border-white/5 p-3 text-xs'>
            <div className='flex items-center gap-2'>
              <Calendar size={14} /> {MOCK_BOOKING_DETAILS.date}
            </div>
            <div className='h-3 w-px bg-white/10'></div>
            <div className='flex items-center gap-2'>
              <Clock size={14} /> {MOCK_BOOKING_DETAILS.time}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Split Bill Interface
const SplitBillSection = ({
  users,
  setUsers,
  totalPrice,
}: {
  users: User[];
  setUsers: (u: User[]) => void;
  totalPrice: number;
}) => {
  const [isSimulatingJoin, setIsSimulatingJoin] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const myShare = Math.round(totalPrice / users.length);

  const handleShareLink = () => {
    setShareLinkCopied(true);
    setTimeout(() => setShareLinkCopied(false), 2000);

    // Simulation Logic
    if (users.length < 4 && !isSimulatingJoin) {
      setIsSimulatingJoin(true);
      setTimeout(() => {
        const newNames = ['Sarah', 'Huy', 'Tuấn'];
        const nextIdx = users.length - 1; // Basic logic just for demo
        const newUser: User = {
          id: `u${Date.now()}`,
          name: newNames[nextIdx % newNames.length] || 'Người chơi',
          avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
          isHost: false,
        };
        setUsers([...users, newUser]);
        setIsSimulatingJoin(false);
      }, 2000);
    }
  };

  return (
    <section className='animate-fade-in'>
      <div className='bg-base-900/80 border-primary/30 rounded-xl border p-4 shadow-[0_0_30px_rgba(0,0,0,0.2)]'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='flex items-center gap-2 text-xs font-bold text-white'>
            <Users size={14} className='text-primary' />
            Nhóm thanh toán ({users.length})
          </h3>
          {isSimulatingJoin && (
            <span className='flex animate-pulse items-center gap-1 text-[9px] font-bold text-purple-400'>
              <Loader2 size={10} className='animate-spin' /> Ai đó đang vào...
            </span>
          )}
        </div>

        <div className='scrollbar-hide mb-5 flex items-start gap-3 overflow-x-auto py-1'>
          {users.map((u) => (
            <div key={u.id} className='animate-scale-in flex flex-col items-center gap-1'>
              <div className='relative'>
                <Avatar
                  src={u.avatar}
                  className='h-10 w-10 rounded-full border border-white/10 object-cover'
                  alt={u.name}
                />
                {u.isHost && (
                  <div className='bg-primary text-base-950 border-base-950 absolute -right-1 -bottom-1 rounded border px-1 text-[8px] font-black'>
                    HOST
                  </div>
                )}
              </div>
              <span className='text-accent-foreground max-w-[48px] truncate text-[9px] font-medium'>{u.name}</span>
            </div>
          ))}
          <IconButton
            onClick={handleShareLink}
            className='bg-base-900 text-accent-foreground/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-white/30 transition-colors hover:border-white hover:text-white'
          >
            <Plus size={18} />
          </IconButton>
        </div>

        <div className='bg-base-950 mb-4 flex items-center justify-between rounded-lg border border-white/10 p-3'>
          <div className='flex items-center gap-3 overflow-hidden'>
            <div className='bg-base-900 flex h-8 w-8 shrink-0 items-center justify-center rounded-md'>
              <Share2 size={16} className='text-purple-400' />
            </div>
            <div className='min-w-0 flex-1'>
              <div className='text-accent-foreground text-[10px] font-bold uppercase'>Link mời vào nhóm</div>
              <div className='truncate text-xs text-white'>yaah.vn/join/booking-123</div>
            </div>
          </div>
          <Button
            onClick={handleShareLink}
            className='text-base-950 hover:bg-primary flex h-fit items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-bold transition-colors'
          >
            {shareLinkCopied ? <Check size={14} /> : <Copy size={14} />}
            {shareLinkCopied ? 'Đã chép' : 'Copy'}
          </Button>
        </div>

        <div className='flex items-center justify-between border-t border-dashed border-white/5 pt-3 text-xs'>
          <span className='text-accent-foreground/80'>Tổng: {totalPrice.toLocaleString()}đ</span>
          <div className='flex items-center gap-1'>
            <span className='text-accent-foreground'>Mỗi người:</span>
            <span className='text-primary text-sm font-bold'>{myShare.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
      <p className='text-accent-foreground/80 mt-3 text-center text-[10px]'>
        <Info size={10} className='mr-1 inline' />
        Bạn bè cần xác nhận tham gia trước khi bạn thanh toán.
      </p>
    </section>
  );
};

// 3. Price Summary (Solo)
const SoloPriceSummary = ({ price }: { price: number }) => (
  <section className='animate-fade-in'>
    <div className='bg-base-900/40 rounded-xl border border-white/5 p-4'>
      <div className='mb-2 flex items-center justify-between'>
        <span className='text-accent-foreground text-sm'>Giá sân</span>
        <span className='text-sm font-bold text-white'>{price.toLocaleString()}đ</span>
      </div>
      <div className='mb-2 flex items-center justify-between'>
        <span className='text-accent-foreground text-sm'>Phí dịch vụ</span>
        <span className='text-sm font-bold text-white'>Miễn phí</span>
      </div>
      <div className='my-3 h-px bg-white/5'></div>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-bold text-white'>Thanh toán</span>
        <span className='text-primary text-xl font-black'>{price.toLocaleString()}đ</span>
      </div>
    </div>
  </section>
);

// --- MAIN COMPONENT ---

const BookingConfirmForm: FC<BookingConfirmFormProps> = ({ initialValue, onSubmit }) => {
  // Setup Countdown Safe State
  const [countdownDate, setCountdownDate] = useState<number | null>(null);

  useEffect(() => {
    // 5 minutes from now
    setCountdownDate(Date.now() + 300 * 1000);
  }, []);

  const defaultValues: BookingConfirmFormValues = {
    paymentMethod: 'me',
    joinedUsers: [{ id: 'me', name: 'Bạn', avatar: MOCK_USER.avatarUrl, isHost: true }],
    ...initialValue,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={BookingSchema}
      onSubmit={async (values, helpers) => {
        if (onSubmit) await onSubmit(values, helpers);
      }}
    >
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => {
        const myShare = Math.round(MOCK_BOOKING_DETAILS.price / values.joinedUsers.length);

        return (
          <>
            {/* 2. SCROLL CONTENT */}
            <div className='scrollbar-hide relative z-10 flex-1 space-y-6 overflow-y-auto px-5 pt-6 pb-50'>
              {/* A. TICKET SUMMARY */}
              <TicketSummary countdownDate={countdownDate} paymentMethod={values.paymentMethod} />

              {/* B. PAYMENT METHOD */}
              <section>
                <div className='mb-3 flex items-center justify-between'>
                  <h3 className='text-accent-foreground/80 text-xs font-bold tracking-wider uppercase'>
                    Hình thức thanh toán
                  </h3>
                </div>
                <div className='mb-4 flex gap-3'>
                  <PaymentOption
                    id='me'
                    title='Tôi trả hết'
                    desc='Thanh toán 100%'
                    icon={Wallet}
                    isSelected={values.paymentMethod === 'me'}
                    onSelect={() => setFieldValue('paymentMethod', 'me')}
                  />
                  <PaymentOption
                    id='split'
                    title='Chia tiền'
                    desc='Mời bạn bè vào bill'
                    icon={PieChart}
                    isSelected={values.paymentMethod === 'split'}
                    onSelect={() => setFieldValue('paymentMethod', 'split')}
                  />
                </div>
              </section>

              {/* C. CONDITIONAL SECTIONS */}
              {values.paymentMethod === 'split' ? (
                <SplitBillSection
                  users={values.joinedUsers}
                  setUsers={(u) => setFieldValue('joinedUsers', u)}
                  totalPrice={MOCK_BOOKING_DETAILS.price}
                />
              ) : (
                <SoloPriceSummary price={MOCK_BOOKING_DETAILS.price} />
              )}
            </div>

            {/* 3. STICKY FOOTER */}
            <div className='pointer-events-none fixed right-0 bottom-0 left-0 z-50'>
              <div className='from-base-950 via-base-950/95 absolute inset-x-0 bottom-0 h-60 bg-linear-to-t to-transparent'></div>

              <div className='pointer-events-auto relative p-6 pb-8'>
                <Button
                  variant='contained'
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  className={cn(
                    'text-base-950 shadow-glow flex h-16 w-full items-center justify-center gap-2 rounded-3xl text-base font-black tracking-wider uppercase transition-all hover:scale-[1.02] active:scale-95',
                    isSubmitting ? 'bg-base-800 text-white/50' : 'bg-primary hover:bg-primary/90',
                  )}
                >
                  {isSubmitting && <Loader2 className='animate-spin' />}
                  {values.paymentMethod === 'split'
                    ? `Thanh toán phần tôi (${myShare.toLocaleString()}đ)`
                    : `Thanh toán (${MOCK_BOOKING_DETAILS.price.toLocaleString()}đ)`}
                  {!isSubmitting && <ArrowRight size={20} strokeWidth={2.5} />}
                </Button>

                <button className='text-accent-foreground/80 mt-3 w-full text-[10px] font-bold transition-colors hover:text-white'>
                  Lưu nháp (Giữ trong 15p)
                </button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default BookingConfirmForm;
