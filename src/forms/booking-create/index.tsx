import { AppTopbar, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import ModesPicker from '@/modules/screens/bookings/components/mode-picker';
import SectionHeader from '@/modules/screens/bookings/components/section-header';
import StepIndicator from '@/modules/screens/bookings/components/step-indicator';
import TimeSlotsPicker from '@/modules/screens/bookings/components/time-slots-picker';
import VenuePicker from '@/modules/screens/bookings/components/venue-picker';
import { SPORTS } from '@/modules/screens/bookings/mock';
import { MOCK_VENUES } from '@/modules/screens/venues/mock';
import { Button, CardActionArea, IconButton } from '@mui/material';
import NumberFlow from '@number-flow/react';
import { Formik } from 'formik';
import { ArrowRight, Loader2, Ticket, X } from 'lucide-react';
import { FC, useCallback, useRef, useState } from 'react';
import { object, string } from 'yup';

interface BookingValues {
  sport: string;
  venue: string;
  date: string;
  duration: number;
  timeSlot: string;
  court: string;
  type: 'invite' | 'private';
  level: string;
}

const validationSchema = object().shape({
  sport: string().required(),
  venue: string().required(),
  date: string().required(),
  duration: string().required(),
  timeSlot: string().required(),
  court: string().required(),
  type: string().required().default('private'),
  level: string(),
});

interface BookingFormProps {
  onSubmit?: (val: BookingValues) => void;
  initialValue?: Partial<BookingValues>;
}

const DEFAULT_VALUES: BookingValues = {
  sport: '',
  venue: '',
  date: '',
  duration: 60,
  timeSlot: '',
  court: '',
  type: 'private',
  level: '',
};

const BookingForm: FC<BookingFormProps> = ({ onSubmit, initialValue = DEFAULT_VALUES }) => {
  const router = useRouter();
  const formValues: BookingValues = {
    ...DEFAULT_VALUES,
    ...initialValue,
  };
  // --- State ---
  const [step, setStep] = useState(1);

  const scrollRef = useRef<HTMLDivElement>(null);
  // Refs for scrolling to sections
  const venueRef = useRef<HTMLDivElement>(null); // Step 2
  const timeRef = useRef<HTMLDivElement>(null); // Step 3
  const courtsRef = useRef<HTMLDivElement>(null); // Part of Step 3
  const modeRef = useRef<HTMLDivElement>(null); // Step 4

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleSubmit = useCallback(
    async (val: BookingValues) => {
      await Promise.resolve(onSubmit?.(val));
    },
    [onSubmit],
  );

  return (
    <Formik<BookingValues> initialValues={formValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ values, handleChange, setFieldValue, handleSubmit, isValid, isSubmitting }) => {
        const selectedVenue = MOCK_VENUES.find((v) => v.id === values.sport);
        // --- Logic ---
        const handleSportSelect = (id: string) => {
          setFieldValue('sport', id);
          if (step < 2) setStep(2);

          // Auto-scroll to Step 2
          setTimeout(() => {
            venueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        };

        const handleVenueSelect = (venue: string) => {
          setFieldValue('venue', venue);
          if (step < 3) setStep(3);

          // Auto-scroll to Step 3
          setTimeout(() => {
            timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        };

        const handleTimeSelect = (t: string) => {
          setFieldValue('timeSlot', t);
          setFieldValue('court', '');

          // Guide Flow: Focus on Courts
          setTimeout(() => {
            if (courtsRef.current) {
              courtsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 150);
        };

        const handleCourtSelect = (id: string) => {
          setFieldValue('court', id);
          if (step < 4) setStep(4);

          // Guide Flow: Focus on Mode
          setTimeout(() => {
            modeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        };

        return (
          <form
            onChange={handleChange}
            onSubmit={handleSubmit}
            className='bg-base-950 relative flex h-screen flex-col overflow-hidden font-sans text-white'
          >
            {/* Background Ambience */}
            <div className='pointer-events-none fixed inset-0 z-0'>
              <div className='bg-primary/5 absolute top-[-10%] right-[-20%] h-125 w-125 rounded-full blur-[120px]' />
              <div className='absolute bottom-[-10%] left-[-20%] h-100 w-100 rounded-full bg-purple-400/5 blur-[100px]' />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>
            {/* 1. HEADER */}
            <AppTopbar
              left={
                <IconButton
                  onClick={handleBack}
                  className='bg-base-900 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-transform hover:bg-white/10 active:scale-95'
                >
                  <X size={20} className='text-accent-foreground' />
                </IconButton>
              }
              centerClassName='relative inset-auto translate-none w-full'
              center={
                <div>
                  <h1 className='text-base leading-none font-bold text-white'>Đặt sân nhanh</h1>
                  <p className='text-accent-foreground mt-1 text-[10px] font-medium'>Tìm kiếm & Đặt lịch</p>
                </div>
              }
              right={<StepIndicator currentStep={step} />}
            />

            {/* 2. SCROLL CONTENT */}
            <div
              ref={scrollRef}
              className='scrollbar-hide relative z-10 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pt-4 pb-70'
            >
              {/* STEP 1: CHỌN MÔN (Expanded Grid) */}
              <section className='animate-slide-up' style={{ animationDelay: '0ms' }}>
                <SectionHeader step={1} title='Chọn môn thể thao' isActive={step >= 1} />

                <div className='bg-base-900/60 border-surface-border rounded-[28px] border p-4 shadow-lg backdrop-blur-md'>
                  <div className='grid grid-cols-3 gap-2'>
                    {SPORTS.map((s) => (
                      <CardActionArea
                        key={s.id}
                        onClick={() => handleSportSelect(s.id)}
                        className={cn(
                          'flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all duration-200 active:scale-95',
                          values.sport === s.id
                            ? 'text-base-950 z-10 scale-[1.02] border-white bg-white shadow-[0_4px_20px_rgba(255,255,255,0.2)]'
                            : 'bg-base-950/50 text-accent-foreground/80 border-white/5 hover:bg-white/5 hover:text-white',
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full',
                            values.sport === s.id ? 'bg-primary text-base-950' : 'bg-base-800 text-accent-foreground',
                          )}
                        >
                          <s.icon size={16} />
                        </div>
                        <span className='text-center text-[10px] leading-tight font-bold'>{s.label}</span>
                      </CardActionArea>
                    ))}
                  </div>
                </div>
              </section>
              {/* STEP 2: CHỌN ĐỊA ĐIỂM */}
              <section
                ref={venueRef}
                className={cn(
                  'scroll-mt-10 transition-all duration-700 ease-out',
                  step >= 2 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
                )}
              >
                <SectionHeader step={2} title='Chọn địa điểm' isActive={step >= 2} />

                <VenuePicker value={values.venue} onChange={(v) => handleVenueSelect(v)} />
              </section>
              {/* STEP 3: THỜI GIAN & SÂN */}
              <section
                ref={timeRef}
                className={cn(
                  'scroll-mt-10 transition-all duration-700 ease-out',
                  step >= 3 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
                )}
              >
                <SectionHeader step={3} title='Thời gian & Sân' isActive={step >= 3} />
                <TimeSlotsPicker
                  venue={values.venue}
                  onChangeVenue={() => {
                    setStep(2);
                    venueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  duration={values.duration}
                  onDurationChange={(d) => setFieldValue('duration', d)}
                  timeSlot={values.timeSlot}
                  onChangeTimeSlot={(t) => handleTimeSelect(t)}
                  courtRef={courtsRef}
                  court={values.court}
                  onChangeCourt={(c) => handleCourtSelect(c)}
                />
              </section>

              {/* STEP 4: CHẾ ĐỘ (CORE) */}
              <section
                ref={modeRef}
                className={cn(
                  'transition-all duration-700 ease-out',
                  step >= 4 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
                )}
              >
                <SectionHeader step={4} title='Đi riêng hay mời thêm?' isActive={step >= 4} />
                <ModesPicker
                  mode={values.type}
                  setMode={(m) => setFieldValue('type', m)}
                  level={values.level}
                  setLevel={(l) => setFieldValue('level', l)}
                />
              </section>
            </div>

            {/* 3. STICKY ACTION ZONE (Ticket + CTA) */}
            <div className='fixed pointer-events-none right-0 bottom-0 left-0 z-50'>
              {/* Enhanced Gradient Fade */}
              <div className='from-base-950 via-base-950/95 pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-linear-to-t to-transparent' />

              <div className='relative z-100 p-6 pb-8 pointer-events-auto'>
                {/* Live Ticket Strip - Floating Effect */}
                <div
                  className={cn(
                    'bg-base-800/80 mb-4 transform rounded-xl border border-white/10 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500',
                    values.timeSlot && values.court
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-10 opacity-0',
                  )}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='bg-base-950 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 shadow-inner'>
                        <Ticket size={22} className='text-white' strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className='mb-0.5 flex items-center gap-2'>
                          <span className='text-sm font-black text-white'>{values.timeSlot}</span>
                          <span className='text-white/20'>|</span>
                          <span className='text-sm font-bold text-white'>{values.court}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <span className='text-accent-foreground text-[10px] font-medium'>
                            {selectedVenue?.name || 'Sân đã chọn'}
                          </span>
                          {values.type === 'invite' && (
                            <span className='bg-primary text-base-950 rounded px-1.5 py-0.5 text-[8px] font-black tracking-wider uppercase'>
                              Mở lời mời
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-lg font-black tracking-tight text-white'>
                        <NumberFlow value={15000000} locales='vi' format={{ style: 'currency', currency: 'VND' }} />
                      </div>
                      <div className='text-accent-foreground/80 text-[9px] font-bold tracking-wider uppercase'>
                        Tạm tính
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  variant='contained'
                  disabled={!values.timeSlot || !values.court || !isValid || isSubmitting}
                  type='submit'
                  className={cn(
                    'flex h-16 w-full transform items-center justify-center gap-2 rounded-3xl text-sm font-black tracking-wider uppercase shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300',
                    !values.timeSlot || !values.court || !isValid || isSubmitting
                      ? 'bg-base-800 text-accent-foreground/80 cursor-not-allowed opacity-50'
                      : values.type === 'invite'
                        ? 'text-base-950 hover:bg-primary bg-white hover:scale-[1.02] active:scale-95'
                        : 'bg-primary text-base-950 hover:bg-primary/90 shadow-glow hover:scale-[1.02]',
                  )}
                >
                  {isSubmitting && <Loader2 className='mr-1 animate-spin' size={16} strokeWidth={2.5} />}
                  {values.type === 'invite' ? 'Đặt & Mở lời mời' : 'Xác nhận đặt sân'}
                  <ArrowRight size={20} strokeWidth={2.5} />
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default BookingForm;
