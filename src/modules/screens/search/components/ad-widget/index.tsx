import { Calculator } from 'lucide-react';
import { motion } from 'motion/react';
const AdWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className='relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-linear-to-r from-[#1a2b4b] to-[#0f172a] p-6 text-white shadow-xl md:flex-row md:p-8'
    >
      <div className='bg-brand-blue absolute top-0 right-0 h-64 w-64 rounded-full opacity-30 blur-[80px]' />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <div className='shrink-0 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm'>
        <Calculator className='text-secondary h-10 w-10' />
      </div>

      <div className='z-10 flex-1 text-center md:text-left'>
        <span className='bg-secondary mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold tracking-wider text-black uppercase'>
          Sponsor
        </span>
        <h3 className='mb-2 text-xl font-bold'>Ưu đãi vay mua nhà độc quyền</h3>
        <p className='mb-0 max-w-128 text-sm text-gray-300'>
          Lãi suất chỉ từ <span className='font-bold text-white'>5.9%/năm</span>. Cố định 2 năm đầu. Hỗ trợ ân hạn nợ
          gốc.
        </p>
      </div>

      <button className='text-brand-primary hover:bg-secondary z-10 shrink-0 rounded-xl bg-white px-6 py-3 font-bold whitespace-nowrap shadow-lg transition-all hover:text-white'>
        Tính toán khoản vay
      </button>
    </motion.div>
  );
};

export default AdWidget;
