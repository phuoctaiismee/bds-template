import { ArticleData } from '../../type';

export default function AuthorBox({ author }: { author: ArticleData['author'] }) {
  return (
    <div className='mb-8 rounded-xl border border-gray-100 bg-gray-50 p-5'>
      <div className='mb-3 flex items-center gap-3'>
        <img src={author.avatar} alt={author.name} className='h-12 w-12 rounded-full border border-gray-200' />
        <div>
          <p className='text-brand-primary text-sm font-bold'>{author.name}</p>
          <p className='text-primary text-xs font-medium'>{author.role}</p>
        </div>
      </div>
      <p className='text-xs leading-relaxed text-gray-500'>
        Chuyên gia phân tích thị trường với hơn 10 năm kinh nghiệm trong lĩnh vực Bất động sản cao cấp tại TP.HCM.
      </p>
      <button className='text-brand-primary hover:text-primary mt-3 text-xs font-bold transition-colors'>
        Xem các bài viết khác
      </button>
    </div>
  );
}
