import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

const FAQS = [
  {
    question: 'Aetheria có thu phí môi giới từ người mua không?',
    answer:
      'Không. Dịch vụ tìm kiếm và tư vấn bất động sản tại Aetheria hoàn toàn miễn phí cho người mua. Phí môi giới sẽ do bên bán hoặc chủ đầu tư chi trả theo quy định.',
  },
  {
    question: 'Làm thế nào để xác thực tính pháp lý của dự án?',
    answer:
      'Tất cả dự án được niêm yết trên Aetheria đều trải qua quy trình thẩm định 3 lớp: Kiểm tra giấy phép xây dựng, quy hoạch sử dụng đất và năng lực tài chính chủ đầu tư. Dấu tích xanh "Verified" sẽ hiển thị trên các tin đăng đã đạt chuẩn.',
  },
  {
    question: 'Tôi có thể vay ngân hàng để mua nhà qua Aetheria không?',
    answer:
      'Có. Chúng tôi liên kết với hơn 10 ngân hàng lớn (Vietcombank, Techcombank, BIDV...) để cung cấp gói vay ưu đãi độc quyền. Bạn có thể sử dụng công cụ "Tính lãi suất" để ước tính khoản vay.',
  },
  {
    question: 'Quy trình ký gửi bất động sản diễn ra như thế nào?',
    answer:
      'Rất đơn giản. Bạn chỉ cần chọn mục "Đăng tin" hoặc liên hệ hotline. Chuyên viên của chúng tôi sẽ đến tận nơi thẩm định, chụp hình 3D và tư vấn giá bán phù hợp nhất với thị trường.',
  },
];

export const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className='bg-brand-bg py-24'>
      <div className='container mx-auto max-w-224 px-6'>
        <div className='mb-12 text-center'>
          <HelpCircle className='text-primary mx-auto mb-4 h-10 w-10 opacity-20' />
          <h2 className='text-3xl font-extrabold'>Câu hỏi thường gặp</h2>
        </div>

        <div className='space-y-4'>
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md'
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className='flex w-full items-center justify-between p-6 text-left'
              >
                <span className={`text-lg font-bold ${activeIndex === idx ? 'text-primary' : 'text-brand-primary'}`}>
                  {faq.question}
                </span>
                {activeIndex === idx ? (
                  <Minus className='text-primary h-5 w-5' />
                ) : (
                  <Plus className='h-5 w-5 text-gray-400' />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='overflow-hidden'
                  >
                    <div className='border-t border-gray-50 p-6 pt-0 leading-relaxed text-gray-500'>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
