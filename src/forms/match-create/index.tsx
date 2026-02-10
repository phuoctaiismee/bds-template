'use client';

import { AppTopbar, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/twMerge';
import SectionHeader from '@/modules/screens/bookings/components/section-header';
import StepIndicator from '@/modules/screens/bookings/components/step-indicator';
import { SPORTS } from '@/modules/screens/bookings/mock';
import LevelAndVibesPicker from '@/modules/screens/match/components/level-vibe-picker';
import LobbySettings from '@/modules/screens/match/components/lobby-settings';
import VenueAndTimePicker from '@/modules/screens/match/components/venue-times-picker';
import { VIBES } from '@/modules/screens/match/mock';
import { MOCK_VENUES } from '@/modules/screens/venues/mock';
import { Button, CardActionArea, IconButton } from '@mui/material';
import NumberFlow from '@number-flow/react';
import { useFormik } from 'formik'; // 1. Import useFormik
import { ArrowRight, Loader2, Swords, X } from 'lucide-react';
import { FC, useCallback, useMemo, useRef, useState } from 'react';
import { boolean, number, object, string } from 'yup';

// ... (Giữ nguyên Interface và Schema)
interface MatchValues {
  sport: string;
  format: string;
  level: string;
  venue: string;
  date: string;
  timeSlot: string;
  teamCount: number;
  paymentType: 'split' | 'me';
  isPublic: boolean;
}

const validationSchema = object().shape({
  sport: string().required(),
  format: string().required(),
  level: string().required(),
  venue: string().required(),
  date: string().required(),
  timeSlot: string().required(),
  teamCount: number().required(),
  paymentType: string().required().default('split'),
  isPublic: boolean().required().default(true),
});

interface MatchFormProps {
  onSubmit?: (val: MatchValues) => void;
  initialValue?: Partial<MatchValues>;
}

const DEFAULT_VALUES: MatchValues = {
  sport: '',
  format: '',
  level: '',
  venue: '',
  date: '',
  timeSlot: '',
  teamCount: 2,
  paymentType: 'split',
  isPublic: true,
};

const MatchForm: FC<MatchFormProps> = ({ onSubmit, initialValue = DEFAULT_VALUES }) => {
  const router = useRouter();

  // --- State ---
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = {
    1: useRef<HTMLDivElement>(null),
    2: useRef<HTMLDivElement>(null),
    3: useRef<HTMLDivElement>(null),
    4: useRef<HTMLDivElement>(null),
  };

  // 2. Setup Formik bằng Hook (Ở Top Level)
  const formik = useFormik<MatchValues>({
    initialValues: {
      ...DEFAULT_VALUES,
      ...initialValue,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await Promise.resolve(onSubmit?.(values));
    },
  });

  const { values, setFieldValue, handleChange, handleSubmit, isValid, isSubmitting } = formik;

  // --- Logic Helpers ---
  const scrollToStep = (s: number) => {
    // @ts-ignore
    const ref = sectionRefs[s];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // --- 3. Optimized Handlers for LobbySettings (QUAN TRỌNG NHẤT) ---
  // Vì setFieldValue đã ở top level, ta dùng được useCallback
  const handlePeopleChange = useCallback(
    (c: number) => {
      setFieldValue('teamCount', c);
    },
    [setFieldValue],
  );

  const handlePaymentChange = useCallback(
    (p: 'split' | 'me') => {
      setFieldValue('paymentType', p);
    },
    [setFieldValue],
  );

  const handlePublicChange = useCallback(
    (p: boolean) => {
      setFieldValue('isPublic', p);
    },
    [setFieldValue],
  );

  // --- Logic Selection ---
  const handleSportSelect = (id: string, format: string) => {
    setFieldValue('sport', id);
    setFieldValue('format', format);
    if (step < 2) {
      setStep(2);
      setTimeout(() => scrollToStep(2), 200);
    }
  };

  const handleLevelSelect = (id: string) => {
    setFieldValue('level', id);
    if (step < 3) {
      setStep(3);
      setTimeout(() => scrollToStep(3), 200);
    }
  };

  const handleVenueSelect = (venue: string) => {
    setFieldValue('venue', venue);
  };

  const handleTimeSelect = (t: string) => {
    setFieldValue('timeSlot', t);
    if (step < 4) {
      setStep(4);
      setTimeout(() => scrollToStep(4), 200);
    }
  };

  // Memoize derived data
  const selectedVenue = useMemo(() => MOCK_VENUES.find((v) => v.id === values.venue), [values.venue]);
  const selectedSport = useMemo(() => SPORTS.find((s) => s.id === values.sport), [values.sport]);

  return (
    <form
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
            <h1 className='text-base leading-none font-bold text-white'>Tạo phòng đấu</h1>
            <p className='text-accent-foreground mt-1 text-[10px] font-medium'>Tìm đồng đội & đối thủ</p>
          </div>
        }
        right={<StepIndicator currentStep={step} />}
      />

      {/* 2. SCROLL CONTENT */}
      <div
        ref={scrollRef}
        className='scrollbar-hide relative z-10 flex-1 space-y-8 overflow-y-auto scroll-smooth px-4 pt-4 pb-70'
      >
        {/* STEP 1: CHỌN MÔN */}
        <section ref={sectionRefs[1]} className='animate-slide-up' style={{ animationDelay: '0ms' }}>
          <SectionHeader step={1} title='Môn & thể thức' isActive={step >= 1} />

          <div className='bg-base-900/60 border-surface-border rounded-[28px] border p-4 shadow-lg backdrop-blur-md'>
            <div className='mb-4 grid grid-cols-3 gap-2'>
              {SPORTS.map((s) => (
                <CardActionArea
                  key={s.id}
                  onClick={() => handleSportSelect(s.id, s?.formats?.[0])}
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
            {/* Format Selection */}
            {selectedSport && (
              <div className='scrollbar-hide flex gap-2 overflow-x-auto border-t border-white/5 pt-4'>
                {selectedSport.formats.map((fmt) => (
                  <CardActionArea
                    key={fmt}
                    onClick={() => setFieldValue('format', fmt)}
                    className={cn(
                      'flex items-center justify-center rounded-lg border-[1.5px] px-4 py-2 text-xs font-bold whitespace-nowrap transition-all',
                      values.format === fmt
                        ? 'bg-base-800 border-primary text-white shadow-sm'
                        : 'bg-base-950 text-accent-foreground/80 border-white/10 hover:border-white/30',
                    )}
                  >
                    {fmt}
                  </CardActionArea>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* STEP 2: TRÌNH ĐỘ */}
        <section
          ref={sectionRefs[2]}
          className={cn(
            'scroll-mt-10 transition-all duration-700 ease-out',
            step >= 2 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
          )}
        >
          <SectionHeader step={2} title='Trình độ & tính chất' isActive={step >= 2} />
          <LevelAndVibesPicker value={values.level} onChange={(v) => handleLevelSelect(v)} />
        </section>

        {/* STEP 3: THỜI GIAN & ĐỊA ĐIỂM */}
        <section
          ref={sectionRefs[3]}
          className={cn(
            'scroll-mt-10 transition-all duration-700 ease-out',
            step >= 3 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
          )}
        >
          <SectionHeader step={3} title='Địa điểm & thời gian' isActive={step >= 3} />
          <VenueAndTimePicker
            venue={values.venue}
            onChangeTimeSlot={(t) => handleTimeSelect(t)}
            onChangeVenue={handleVenueSelect}
            timeSlot={values.timeSlot}
          />
        </section>

        {/* STEP 4: LOBBY SETTINGS (ĐÃ TỐI ƯU) */}
        <section
          ref={sectionRefs[4]}
          className={cn(
            'transition-all duration-700 ease-out',
            step >= 4 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-30 grayscale',
          )}
        >
          <SectionHeader step={4} title='Thiết lập lobby' isActive={step >= 4} />
          <LobbySettings
            peopleCount={values.teamCount}
            onChangePeopleCount={handlePeopleChange} // Callback đã memo
            paymentType={values.paymentType}
            onChangePaymentType={handlePaymentChange} // Callback đã memo
            isPublicFeed={values.isPublic}
            onChangePublicFeed={handlePublicChange} // Callback đã memo
          />
        </section>
      </div>

      {/* 3. STICKY ACTION ZONE */}
      <div className='pointer-events-none fixed right-0 bottom-0 left-0 z-50'>
        <div className='from-base-950 via-base-950/95 pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-linear-to-t to-transparent' />

        <div className='pointer-events-auto relative z-100 p-6 pb-8'>
          {/* Ticket Summary */}
          <div
            className={cn(
              'bg-base-800/80 mb-4 transform rounded-xl border border-white/10 p-4 shadow-2xl backdrop-blur-xl transition-all duration-500',
              values.timeSlot && values.level && values.venue
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-10 opacity-0',
            )}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='bg-base-950 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 shadow-inner'>
                  <Swords size={22} className='text-white' strokeWidth={1.5} />
                </div>
                <div>
                  <div className='mb-0.5 flex items-center gap-2'>
                    <span className='text-sm font-black text-white'>{values.timeSlot}</span>
                    <span className='text-white/20'>|</span>
                    <span className='text-primary text-[10px] font-bold tracking-wider uppercase'>
                      {VIBES.find((v) => v.id === values.level)?.label}
                    </span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-accent-foreground text-[10px] font-medium'>
                      {selectedVenue?.name || 'Sân đã chọn'}
                    </span>
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <div className='text-accent-foreground mb-0.5 text-[9px] font-bold tracking-wider uppercase'>
                  Cần tìm
                </div>
                <div className='text-lg font-black tracking-tight text-white'>
                  <NumberFlow value={values.teamCount} prefix='+ ' />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant='contained'
            disabled={!values.timeSlot || !values.venue || !values.level || !isValid || isSubmitting}
            type='submit'
            className={cn(
              'flex h-16 w-full transform items-center justify-center gap-2 rounded-3xl text-sm font-black tracking-wider uppercase shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300',
              !values.timeSlot || !values.venue || !values.level || !isValid || isSubmitting
                ? 'bg-base-800 text-accent-foreground/80 cursor-not-allowed opacity-50'
                : 'bg-primary text-base-950 hover:bg-primary/90 shadow-glow hover:scale-[1.02]',
            )}
          >
            {isSubmitting && <Loader2 className='mr-1 animate-spin' size={16} strokeWidth={2.5} />}
            Tạo phòng đấu
            <ArrowRight size={20} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MatchForm;
