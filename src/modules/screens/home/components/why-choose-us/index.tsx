import { Globe2, ShieldCheck, Users, Zap } from 'lucide-react';
import React from 'react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Minh bạch pháp lý',
    desc: '100% dự án đăng tải đều được kiểm duyệt hồ sơ pháp lý kỹ càng.',
  },
  {
    icon: Zap,
    title: 'Công nghệ AI',
    desc: 'Định giá và gợi ý bất động sản chuẩn xác dựa trên dữ liệu lớn.',
  },
  {
    icon: Users,
    title: 'Kết nối trực tiếp',
    desc: 'Làm việc trực tiếp với chủ nhà hoặc chủ đầu tư, không qua trung gian.',
  },
  {
    icon: Globe2,
    title: 'Hệ sinh thái toàn diện',
    desc: 'Từ tài chính, thiết kế đến thi công nội thất đều có sẵn.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className='bg-brand-primary relative overflow-hidden py-24 text-white'>
      {/* Abstract Shapes */}
      <div className='bg-primary/20 absolute top-0 right-0 h-125 w-125 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl' />

      <div className='relative z-10 container mx-auto px-6'>
        <div className='grid grid-cols-1 items-center gap-16 lg:grid-cols-2'>
          <div>
            <span className='text-secondary mb-2 block text-xs font-bold tracking-widest uppercase'>Về Aetheria</span>
            <h2 className='mb-6 text-4xl leading-tight font-extrabold md:text-5xl'>
              Không chỉ là tìm nhà, <br /> đó là tìm kiếm <br />{' '}
              <span className='text-primary'>tương lai của bạn.</span>
            </h2>
            <p className='mb-8 text-lg leading-relaxed text-gray-400'>
              Chúng tôi xây dựng nền tảng dựa trên sự tin cậy và công nghệ, giúp hành trình sở hữu bất động sản trở nên
              dễ dàng và an toàn hơn bao giờ hết.
            </p>
            <button className='hover:text-brand-primary rounded-full border border-white/20 bg-white/10 px-8 py-3 font-bold backdrop-blur transition-all hover:bg-white'>
              Tìm hiểu thêm
            </button>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            {FEATURES.map((item, idx) => (
              <div
                key={idx}
                className='rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10'
              >
                <div className='bg-primary shadow-primary/30 mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg'>
                  <item.icon className='h-6 w-6' />
                </div>
                <h3 className='mb-2 text-xl font-bold'>{item.title}</h3>
                <p className='text-sm text-gray-400'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
