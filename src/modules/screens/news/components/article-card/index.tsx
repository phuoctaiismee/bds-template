import { Link } from '@/lib/navigation';
import { Building2, MapPin } from 'lucide-react';
import { Article } from '../../mock';
export const CategoryPill: React.FC<{ type: string }> = ({ type }) => {
  const config = {
    market: { label: 'Thị trường', color: 'text-blue-600 bg-blue-50' },
    legal: { label: 'Pháp lý', color: 'text-red-600 bg-red-50' },
    lifestyle: { label: 'Góc nhìn', color: 'text-green-600 bg-green-50' },
    project: { label: 'Dự án', color: 'text-purple-600 bg-purple-50' },
  };
  // @ts-ignore
  const { label, color } = config[type] || config.market;
  return (
    <span className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${color}`}>{label}</span>
  );
};
const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Link href={`/news/${article.id}`} className='group flex h-full flex-col'>
      <div className='relative mb-4 aspect-16/10 overflow-hidden rounded-xl bg-gray-100'>
        <img
          src={article.image}
          alt={article.title}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
        />
        {article.location && (
          <div className='absolute bottom-3 left-3 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md'>
            <MapPin className='h-3 w-3' /> {article.location}
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='mb-2 flex items-center gap-3'>
          <CategoryPill type={article.category} />
          <span className='text-xs font-medium text-gray-400'>{article.date}</span>
        </div>
        <h3 className='text-brand-primary group-hover:text-brand-blue mb-2 line-clamp-2 text-lg leading-snug font-bold transition-colors'>
          {article.title}
        </h3>
        <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500'>{article.summary}</p>

        {/* Contextual Link */}
        {article.relatedProject && (
          <div className='mt-auto border-t border-gray-100 pt-3'>
            <div className='group-hover:text-brand-blue flex items-center gap-2 text-xs font-bold text-gray-600'>
              <Building2 className='h-3.5 w-3.5' />
              <span>Liên quan: {article.relatedProject.name}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
