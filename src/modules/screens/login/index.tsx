'use client';
import { useRouter } from '@/lib/navigation';
import { mockUser } from '@/mocks';
import { useAuthStore } from '@/stores/auth';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    CheckCircle2,
    Globe2,
    Home,
    Loader2,
    ShieldCheck,
    Smartphone,
    Star,
    Tag,
    X,
    Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
// import { useAuth } from '../context/AuthContext'; // Uncomment khi sử dụng thật

// --- 1. CONFIG & SCHEMAS ---

const FEATURES = [
  {
    title: 'Tiếp cận nguồn hàng độc quyền',
    desc: 'Hơn 500+ Bất động sản hạng sang không công khai trên thị trường.',
    icon: Star,
    color: 'bg-yellow-400',
  },
  {
    title: 'Định giá AI chuẩn xác',
    desc: 'Công nghệ Aetheria Valuator™ giúp bạn ra quyết định đầu tư thông minh.',
    icon: Zap,
    color: 'bg-blue-400',
  },
  {
    title: 'Cộng đồng tinh hoa',
    desc: 'Kết nối với mạng lưới chủ nhà, nhà đầu tư và chuyên gia hàng đầu.',
    icon: Globe2,
    color: 'bg-green-400',
  },
];

const ROLES = [
  {
    id: 'buyer',
    icon: Home,
    title: 'Người Mua / Thuê',
    desc: 'Tìm tổ ấm & cơ hội đầu tư',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'seller',
    icon: Tag,
    title: 'Chủ Nhà / Bán',
    desc: 'Đăng tin & quản lý tài sản',
    color: 'from-emerald-500 to-teal-400',
  },
];

// Validation Schemas
const PhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Chỉ được nhập số')
    .min(9, 'Số điện thoại quá ngắn')
    .max(11, 'Số điện thoại quá dài')
    .required('Vui lòng nhập số điện thoại'),
});

const OtpSchema = Yup.object().shape({
  otp: Yup.string().length(6, 'Mã OTP phải có 6 số').required('Vui lòng nhập OTP'),
});

const RoleSchema = Yup.object().shape({
  role: Yup.string().required('Vui lòng chọn vai trò'),
});

// --- 2. SUB-COMPONENTS (UI) ---

const MarketingPanel: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentFeature((prev) => (prev + 1) % FEATURES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='bg-brand-primary relative hidden overflow-hidden lg:flex lg:w-1/2'>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className='absolute inset-0 z-0'
      >
        <img
          src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2953&auto=format&fit=crop'
          className='h-full w-full object-cover opacity-60'
          alt='Luxury Home'
        />
      </motion.div>
      <div className='from-brand-primary/40 via-brand-primary/60 to-brand-primary absolute inset-0 z-10 bg-linear-to-b' />
      <div className='relative z-20 flex h-full w-full flex-col justify-between p-16 text-white'>
        <div className='flex items-center gap-2'>
          <div className='text-brand-primary flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl font-bold'>
            A
          </div>
          <span className='text-2xl font-bold tracking-tight'>Aetheria.vn</span>
        </div>
        <div className='max-w-112'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${FEATURES[currentFeature].color}`}
              >
                {React.createElement(FEATURES[currentFeature].icon, { className: 'w-6 h-6 text-white' })}
              </div>
              <h2 className='mb-4 text-4xl leading-tight font-extrabold'>{FEATURES[currentFeature].title}</h2>
              <p className='text-lg leading-relaxed text-gray-300'>{FEATURES[currentFeature].desc}</p>
            </motion.div>
          </AnimatePresence>
          <div className='mt-8 flex gap-2'>
            {FEATURES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentFeature ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
        <div className='text-sm text-gray-400'>© 2024 Aetheria Vietnam. All rights reserved.</div>
      </div>
    </div>
  );
};

const StepIndicator: React.FC<{ stepIndex: number }> = ({ stepIndex }) => (
  <div className='mb-8'>
    <div className='mb-2 flex justify-between text-xs font-bold tracking-wider text-gray-400 uppercase'>
      <span>Bước {stepIndex}</span>
      <span>3 Bước</span>
    </div>
    <div className='h-1.5 overflow-hidden rounded-full bg-gray-100'>
      <motion.div
        className='bg-primary h-full'
        initial={{ width: 0 }}
        animate={{ width: `${(stepIndex / 3) * 100}%` }}
      />
    </div>
  </div>
);

// --- 3. STEP FORMS (LOGIC + VIEW) ---

const EntryStep: React.FC<{ onNext: () => void; onGoogle: () => void; onSkip: () => void; loading: boolean }> = ({
  onNext,
  onGoogle,
  onSkip,
  loading,
}) => (
  <div className='flex h-full flex-col justify-center space-y-8 text-base'>
    <div>
      <h1 className='text-brand-primary mb-3 text-3xl font-extrabold'>
        Xin chào, <br />
        <span className='from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent'>
          Hôm nay bạn tìm gì?
        </span>
      </h1>
      <p className='text-base font-medium text-gray-500'>
        {' '}
        Đăng nhập để khám phá thế giới bất động sản đẳng cấp dành riêng cho bạn.
      </p>
    </div>
    <div className='space-y-4'>
      <button
        onClick={onNext}
        className='group bg-brand-primary shadow-brand-blue/20 hover:shadow-brand-blue/40 relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 font-bold text-white shadow-xl transition-all hover:scale-[1.02]'
      >
        <Smartphone className='relative z-10 h-5 w-5' />
        <span className='relative z-10'>Tiếp tục với số điện thoại</span>
      </button>
      <button
        onClick={onGoogle}
        disabled={loading}
        className='text-brand-primary flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white py-4 font-bold transition-all hover:border-gray-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70'
      >
        {loading ? (
          <Loader2 className='h-5 w-5 animate-spin' />
        ) : (
          <>
            <img src='https://www.svgrepo.com/show/475656/google-color.svg' className='h-5 w-5' alt='Google' />
            Tiếp tục với Google
          </>
        )}
      </button>
    </div>
    <div className='pt-4 text-center'>
      <button onClick={onSkip} className='hover:text-brand-primary text-sm font-bold text-gray-400 transition-colors'>
        Để sau, tôi chỉ muốn xem
      </button>
    </div>
  </div>
);

const PhoneStep: React.FC<{ onSubmit: (val: string) => void; initialValue: string }> = ({ onSubmit, initialValue }) => {
  const formik = useFormik({
    initialValues: { phone: initialValue },
    validationSchema: PhoneSchema,
    onSubmit: (values) => onSubmit(values.phone),
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex h-full flex-col justify-center space-y-8'>
      <div>
        <h2 className='text-brand-primary mb-2 text-2xl font-extrabold'>Số điện thoại của bạn</h2>
        <p className='text-sm text-gray-500'>Chúng tôi sẽ gửi mã OTP để xác thực tài khoản.</p>
      </div>
      <div className='space-y-2'>
        <div
          className={`group flex rounded-2xl border-2 bg-white p-2 shadow-sm transition-all ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'focus-within:border-primary border-gray-100'}`}
        >
          <div className='text-brand-primary flex items-center justify-center rounded-xl border-r border-gray-100 bg-gray-50 px-4 font-bold'>
            <img src='https://flagcdn.com/w40/vn.png' className='mr-2 h-auto w-5 rounded-sm' alt='VN' />
            +84
          </div>
          <input
            type='tel'
            name='phone'
            value={formik.values.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              formik.setFieldValue('phone', val);
            }}
            placeholder='909 123 456'
            className='text-brand-primary flex-1 bg-transparent px-4 py-3 text-xl font-bold placeholder-gray-300 outline-none'
            autoFocus
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <p className='pl-2 text-xs font-bold text-red-500'>{formik.errors.phone}</p>
        )}
      </div>
      <button
        type='submit'
        disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
        className='bg-primary flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-lg transition-all hover:bg-blue-700 disabled:opacity-50'
      >
        {formik.isSubmitting ? <Loader2 className='h-5 w-5 animate-spin' /> : 'Gửi mã xác thực'}
      </button>
      <div className='flex gap-3 rounded-xl bg-blue-50 p-4'>
        <ShieldCheck className='text-primary h-5 w-5 shrink-0' />
        <p className='text-xs font-medium text-blue-800'>
          Thông tin được bảo mật tuyệt đối. Chúng tôi không chia sẻ số điện thoại của bạn cho bên thứ ba.
        </p>
      </div>
    </form>
  );
};

const OtpStep: React.FC<{ onSubmit: (val: string) => void; phone: string }> = ({ onSubmit, phone }) => {
  const [otpArr, setOtpArr] = useState(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: OtpSchema,
    onSubmit: (values) => onSubmit(values.otp),
  });

  // --- FIX: Tự động submit khi đủ 6 số ---
  useEffect(() => {
    // Kiểm tra độ dài và đảm bảo không có lỗi validation
    if (formik.values.otp.length === 6 && formik.isValid) {
      formik.submitForm();
    }
  }, [formik.values.otp, formik.isValid]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otpArr];
    newOtp[index] = value;
    setOtpArr(newOtp);

    // Cập nhật giá trị vào Formik
    formik.setFieldValue('otp', newOtp.join(''));

    // Focus ô tiếp theo
    if (value && index < 5) inputRefs.current[index + 1]?.focus();

    // XÓA ĐOẠN IF CHECK SUBMIT CŨ Ở ĐÂY ĐỂ TRÁNH LỖI STATE CŨ
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpArr[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Hàm xử lý Paste (Trải nghiệm người dùng tốt hơn)
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pastedData.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...otpArr];
      pastedData.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtpArr(newOtp);
      formik.setFieldValue('otp', newOtp.join(''));
      // Focus vào ô cuối cùng sau khi paste
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  return (
    <div className='flex h-full flex-col justify-center space-y-8'>
      <div>
        <h2 className='text-brand-primary mb-2 text-2xl font-extrabold'>Nhập mã xác thực</h2>
        <p className='text-sm text-gray-500'>
          Mã 6 số đã gửi tới <b className='text-brand-primary'>+84 {phone}</b>
        </p>
      </div>
      <div className='flex justify-between gap-2'>
        {otpArr.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            type='text'
            inputMode='numeric' // Thêm cái này để mobile hiện bàn phím số
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={idx === 0 ? handlePaste : undefined} // Chỉ bắt paste ở ô đầu
            className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-extrabold transition-all outline-none md:h-16 md:w-14 ${digit ? 'border-primary text-primary bg-blue-50' : 'focus:border-primary border-gray-100 bg-white focus:shadow-lg'}`}
          />
        ))}
      </div>
      <div className='text-center'>
        {formik.isSubmitting ? (
          <div className='text-primary flex items-center justify-center gap-2 font-bold'>
            <Loader2 className='h-5 w-5 animate-spin' /> Đang kiểm tra...
          </div>
        ) : (
          <button type='button' className='hover:text-primary text-sm font-bold text-gray-400'>
            Gửi lại mã (30s)
          </button>
        )}
      </div>
    </div>
  );
};

const RoleStep: React.FC<{ onSubmit: (role: string) => void }> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { role: '' },
    validationSchema: RoleSchema,
    onSubmit: (values) => onSubmit(values.role),
  });

  return (
    <form onSubmit={formik.handleSubmit} className='flex h-full flex-col justify-center space-y-6'>
      <div>
        <h2 className='text-brand-primary mb-2 text-2xl font-extrabold'>Bạn là ai?</h2>
        <p className='text-sm text-gray-500'>Giúp chúng tôi cá nhân hóa trải nghiệm của bạn.</p>
      </div>
      <div className='grid gap-4'>
        {ROLES.map((r) => (
          <motion.div
            key={r.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => formik.setFieldValue('role', r.id)}
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all ${formik.values.role === r.id ? 'border-primary ring-primary bg-white shadow-lg ring-1' : 'border-transparent bg-gray-50 hover:bg-white'}`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${r.color} text-white shadow-md`}
            >
              <r.icon className='h-6 w-6' />
            </div>
            <div className='flex-1'>
              <h3 className='text-brand-primary font-bold'>{r.title}</h3>
              <p className='text-xs text-gray-500'>{r.desc}</p>
            </div>
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${formik.values.role === r.id ? 'border-primary bg-primary' : 'border-gray-300'}`}
            >
              {formik.values.role === r.id && <div className='h-2 w-2 rounded-full bg-white' />}
            </div>
          </motion.div>
        ))}
      </div>
      <button
        type='submit'
        disabled={!formik.values.role || formik.isSubmitting}
        className='bg-brand-primary hover:bg-primary mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-xl transition-all disabled:opacity-50'
      >
        {formik.isSubmitting ? <Loader2 className='h-5 w-5 animate-spin' /> : 'Hoàn tất & Khám phá'}
      </button>
    </form>
  );
};

const SuccessStep = () => (
  <div className='flex h-full flex-col items-center justify-center text-center'>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100'
    >
      <CheckCircle2 className='h-12 w-12 text-green-600' />
    </motion.div>
    <h2 className='text-brand-primary mb-2 text-3xl font-extrabold'>Thành công!</h2>
    <p className='font-medium text-gray-500'>Chào mừng bạn đến với Aetheria.</p>
  </div>
);

// --- 4. MAIN AUTH COMPONENT ---

type AuthStepType = 'entry' | 'phone' | 'otp' | 'role' | 'success';

const AuthScreen: React.FC = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  // Central State
  const [step, setStep] = useState<AuthStepType>('entry');
  const [formData, setFormData] = useState({ phone: '', role: '' });
  const [loadingSocial, setLoadingSocial] = useState(false);

  // --- Actions ---
  const handlePhoneSubmit = (phone: string) => {
    // Simulate API Call
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, phone }));
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (otp: string) => {
    // Simulate Verify API
    console.log('Verifying OTP:', otp);
    setTimeout(() => {
      setStep('role');
    }, 1000);
  };

  const handleRoleSubmit = (role: string) => {
    // Simulate Final Register/Login API
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, role }));
      setUser({
        id: 'user-id',
        first_name: mockUser.name,
        last_name: 'Doe',
        avatar: mockUser.avatar,
        email: mockUser.email || 'example.com',
        role: mockUser.role,
      });
      setStep('success');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoadingSocial(true);
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, phone: 'google-user' }));
      setLoadingSocial(false);
      setStep('role');
    }, 1500);
  };

  const handleBack = () => {
    if (step === 'entry') router.back();
    if (step === 'phone') setStep('entry');
    if (step === 'otp') setStep('phone');
    if (step === 'role') setStep('success'); // Or navigate home
  };

  // Auto redirect
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => router.push('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  // Determine Step Index for Progress Bar
  const getStepIndex = () => {
    if (step === 'phone') return 1;
    if (step === 'otp') return 2;
    if (step === 'role') return 3;
    return 0;
  };

  return (
    <div className='flex min-h-screen overflow-hidden bg-white text-base'>
      <MarketingPanel />

      <div className='relative flex w-full flex-col bg-white lg:w-1/2'>
        <div className='absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-6 lg:hidden'>
          <button
            onClick={handleBack}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100'
          >
            {step !== 'entry' ? <ArrowLeft className='h-5 w-5' /> : <X className='h-5 w-5' />}
          </button>
        </div>

        <div className='relative flex flex-1 items-center justify-center overflow-hidden p-6 md:p-12 lg:p-24'>
          <div className='bg-primary/5 pointer-events-none absolute top-0 right-0 h-125 w-125 translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]'></div>

          <div className='relative z-10 w-full max-w-112'>
            {getStepIndex() > 0 && <StepIndicator stepIndex={getStepIndex()} />}

            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='h-full'
              >
                {step === 'entry' && (
                  <EntryStep
                    onNext={() => setStep('phone')}
                    onSkip={() => router.replace('/')}
                    onGoogle={handleGoogleLogin}
                    loading={loadingSocial}
                  />
                )}
                {step === 'phone' && <PhoneStep onSubmit={handlePhoneSubmit} initialValue={formData.phone} />}
                {step === 'otp' && <OtpStep onSubmit={handleOtpSubmit} phone={formData.phone} />}
                {step === 'role' && <RoleStep onSubmit={handleRoleSubmit} />}
                {step === 'success' && <SuccessStep />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
