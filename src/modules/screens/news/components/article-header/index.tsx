import { Calendar, ChevronLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { ArticleData } from '../../type';

export default function ArticleHeader({ article }: { article: ArticleData }) {
  return (
    <header className='mb-10'>
      {/* Breadcrumbs */}
      <div className='mb-6 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase'>
        <Link href='/news' className='hover:text-brand-blue'>
          Thị trường
        </Link>
        <ChevronLeft className='h-3 w-3 rotate-180' />
        <Link href='/news' className='hover:text-brand-blue'>
          {article.category}
        </Link>
      </div>

      <h1 className='text-brand-primary mb-6 text-3xl leading-tight font-extrabold md:text-5xl'>{article.title}</h1>
      <p className='mb-8 text-lg leading-relaxed font-medium text-gray-500 md:text-xl'>{article.subtitle}</p>

      <div className='flex flex-wrap items-center gap-6 border-y border-gray-100 py-4 text-sm text-gray-500'>
        <div className='flex items-center gap-2'>
          <User className='h-4 w-4' />
          <span className='text-brand-primary font-bold'>{article.author.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Calendar className='h-4 w-4' />
          <span>{article.publishedAt}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock className='h-4 w-4' />
          <span>{article.readTime}</span>
        </div>
        <div className='ml-auto flex items-center gap-2'>
          <span className='rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600'>{article.location}</span>
        </div>
      </div>
    </header>
  );
}
