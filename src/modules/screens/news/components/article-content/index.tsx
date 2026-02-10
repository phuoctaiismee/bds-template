import { AlertCircle, Bookmark, ChevronLeft, Share2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ArticleBlock } from '../../type';

export default function ArticleContent({ content }: { content: ArticleBlock[] }) {
  return (
    <div>
      <article className='prose prose-slate prose-headings:font-medium prose-headings:text-brand-primary prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl max-w-none'>
        {content.map((block, idx) => {
          if (block.type === 'intro')
            return (
              <p key={idx} className='lead text-xl font-medium text-gray-800'>
                {block.text}
              </p>
            );
          if (block.type === 'h2')
            return (
              <h2 key={idx} className='mt-10 mb-6 text-2xl md:text-3xl'>
                {block.text}
              </h2>
            );
          if (block.type === 'paragraph')
            return (
              <p key={idx} className='mb-6 leading-relaxed text-gray-600'>
                {block.text}
              </p>
            );
          if (block.type === 'quote')
            return (
              <blockquote
                key={idx}
                className='border-primary my-8 rounded-r-lg border-l-4 bg-gray-50 py-2 pr-4 pl-6 italic'
              >
                <p className='text-brand-primary mb-2 font-serif text-lg'>"{block.text}"</p>
                <footer className='text-sm font-bold text-gray-500 not-italic'>— {block.author}</footer>
              </blockquote>
            );
          if (block.type === 'callout')
            return (
              <div key={idx} className='my-8 flex items-start gap-4 rounded-xl border border-blue-100 bg-blue-50 p-6'>
                <TrendingUp className='text-primary h-6 w-6 shrink-0' />
                <div className='flex-1'>
                  <h4 className='text-primary! m-0! mb-2! text-sm font-bold! uppercase'>{block.title}</h4>
                  <p className='text-brand-primary m-0! text-lg font-bold'>{block.text}</p>
                </div>
              </div>
            );
          return null;
        })}
      </article>

      {/* Disclaimer */}
      <div className='mt-12 flex gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm leading-relaxed text-gray-500'>
        <AlertCircle className='mt-0.5 h-5 w-5 shrink-0' />
        <p>
          <span className='mb-1 block font-bold text-gray-700'>Miễn trừ trách nhiệm:</span>
          Thông tin trong bài viết chỉ mang tính chất tham khảo tại thời điểm xuất bản. Aetheria không chịu trách nhiệm
          về các quyết định đầu tư dựa trên nội dung này.
        </p>
      </div>

      {/* Tags */}
      <div className='mt-8 flex flex-wrap gap-2'>
        {['Đầu tư', 'Thủ Đức', 'Chung cư', 'Pháp lý'].map((tag) => (
          <span
            key={tag}
            className='hover:border-primary hover:text-primary cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-600 transition-colors'
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer Actions */}
      <div className='mt-12 flex items-center justify-between border-t border-gray-100 pt-8'>
        <Link
          href='/news'
          className='text-brand-primary hover:text-primary flex items-center gap-2 font-bold transition-colors'
        >
          <ChevronLeft className='h-4 w-4' /> Bài trước
        </Link>
        <div className='flex gap-2'>
          <button className='hover:bg-primary rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:text-white'>
            <Share2 className='h-5 w-5' />
          </button>
          <button className='hover:bg-primary rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:text-white'>
            <Bookmark className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>
  );
}
