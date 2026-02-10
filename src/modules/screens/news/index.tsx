'use client';
import { Link } from '@/lib/navigation';
import { BarChart3, Eye, Search, TrendingUp } from 'lucide-react';
import { FC, useState } from 'react';
import ArticleCard, { CategoryPill } from './components/article-card';
import { ARTICLES } from './mock';

type NewsScreenProps = object;
const NewsScreen: FC<NewsScreenProps> = () => {
  const [activeTab, setActiveTab] = useState('all');
  const featuredArticle = ARTICLES.find((a) => a.isFeatured && a.id === '1');
  const secondaryFeatured = ARTICLES.find((a) => a.isFeatured && a.id === '2');
  const feedArticles = ARTICLES.filter((a) => !a.isFeatured);
  return (
    <div className='min-h-screen bg-white pt-4 pb-12'>
      {/* 1. Header Section */}
      <div className='container mx-auto mb-8 px-4 md:mb-12 md:px-6'>
        <div className='max-w-224'>
          <h1 className='text-brand-primary mb-3 text-3xl font-extrabold md:text-5xl'>Thị trường & Phân tích</h1>
          <p className='max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg'>
            Cập nhật thông tin, dữ liệu và góc nhìn chuyên sâu về thị trường bất động sản Việt Nam. Nội dung được biên
            tập độc quyền bởi đội ngũ Aetheria.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className='mt-8 flex flex-wrap items-center gap-2 border-b border-gray-100 pb-1'>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'market', label: 'Thị trường' },
            { id: 'legal', label: 'Pháp lý' },
            { id: 'project', label: 'Review Dự án' },
            { id: 'lifestyle', label: 'Không gian sống' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'hover:text-primary border-transparent text-gray-500 hover:border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12'>
          {/* LEFT COLUMN: Content */}
          <div className='lg:col-span-8'>
            {/* 2. Featured Analysis */}
            {activeTab === 'all' && featuredArticle && (
              <Link href={`/news/${featuredArticle.id}`} className='group mb-12 block cursor-pointer'>
                <div className='relative mb-5 aspect-video overflow-hidden rounded-2xl md:aspect-21/9'>
                  <img
                    src={featuredArticle.image}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
                    alt='Featured'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent'></div>
                  <div className='absolute bottom-0 left-0 p-6 md:p-8'>
                    <span className='bg-primary mb-3 inline-block rounded px-3 py-1 text-xs font-bold text-white'>
                      Tiêu điểm tuần
                    </span>
                    <h2 className='mb-2 text-2xl leading-tight font-extrabold text-white decoration-2 underline-offset-4 group-hover:underline md:text-3xl'>
                      {featuredArticle.title}
                    </h2>
                    <div className='flex items-center gap-4 text-xs text-gray-300 md:text-sm'>
                      <span>Bởi {featuredArticle.author}</span>
                      <span>•</span>
                      <span>{featuredArticle.date}</span>
                    </div>
                  </div>
                </div>
                <p className='line-clamp-3 text-base leading-relaxed text-gray-600 md:text-lg'>
                  {featuredArticle.summary}
                </p>
              </Link>
            )}

            {/* Secondary Featured (Desktop only) */}
            {activeTab === 'all' && secondaryFeatured && (
              <Link
                href={`/news/${secondaryFeatured.id}`}
                className='group mb-12 hidden cursor-pointer items-center gap-6 border-b border-gray-100 pb-12 md:flex'
              >
                <div className='aspect-4/3 w-1/3 overflow-hidden rounded-xl'>
                  <img
                    src={secondaryFeatured.image}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    alt={secondaryFeatured.title}
                  />
                </div>
                <div className='w-2/3'>
                  <div className='mb-2 flex items-center gap-2'>
                    <CategoryPill type={secondaryFeatured.category} />
                    <span className='text-xs font-medium text-gray-400'>{secondaryFeatured.date}</span>
                  </div>
                  <h3 className='text-brand-primary group-hover:text-primary mb-2 text-xl font-bold transition-colors'>
                    {secondaryFeatured.title}
                  </h3>
                  <p className='line-clamp-2 text-sm leading-relaxed text-gray-500'>{secondaryFeatured.summary}</p>
                </div>
              </Link>
            )}

            {/* 3. Article Grid */}
            <div className='row-gap-10 grid grid-cols-1 gap-8 md:grid-cols-2'>
              {(activeTab === 'all' ? feedArticles : ARTICLES.filter((a) => a.category === activeTab)).map(
                (article) => (
                  <ArticleCard key={article.id} article={article} />
                ),
              )}
            </div>

            {/* Load More */}
            <div className='mt-12 text-center'>
              <button className='text-brand-primary rounded-xl border border-gray-200 bg-white px-8 py-3 font-bold transition-colors hover:bg-gray-50'>
                Xem thêm bài viết cũ hơn
              </button>
            </div>
          </div>
          {/* RIGHT COLUMN: Sidebar (Context) */}
          <div className='space-y-8 lg:col-span-4'>
            {/* Search Widget */}
            <div className='relative'>
              <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Tìm kiếm chủ đề, dự án...'
                className='focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-10 text-sm outline-none focus:ring-1'
              />
            </div>

            {/* Market Pulse Widget */}
            <div className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
              <div className='mb-6 flex items-center gap-2'>
                <div className='text-primary rounded-lg bg-blue-50 p-2'>
                  <BarChart3 className='h-5 w-5' />
                </div>
                <h3 className='text-brand-primary font-bold'>Nhịp đập thị trường</h3>
              </div>

              <div className='space-y-6'>
                <div>
                  <div className='mb-2 flex justify-between text-sm'>
                    <span className='text-gray-500'>Căn hộ TP.HCM</span>
                    <span className='text-brand-primary font-bold'>55 Tr/m²</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100'>
                      <div className='h-full w-[65%] bg-green-500'></div>
                    </div>
                    <span className='text-xs font-bold text-green-600'>+2.4%</span>
                  </div>
                </div>

                <div>
                  <div className='mb-2 flex justify-between text-sm'>
                    <span className='text-gray-500'>Nhà phố Thủ Đức</span>
                    <span className='text-brand-primary font-bold'>120 Tr/m²</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100'>
                      <div className='h-full w-[45%] bg-orange-400'></div>
                    </div>
                    <span className='text-xs font-bold text-orange-500'>0.5%</span>
                  </div>
                </div>
              </div>

              <div className='mt-6 border-t border-gray-100 pt-4 text-center'>
                <Link href='/market-data' className='text-primary text-xs font-bold hover:underline'>
                  Xem báo cáo đầy đủ
                </Link>
              </div>
            </div>

            {/* Trending Projects Widget */}
            <div className='bg-background rounded-2xl p-6'>
              <h3 className='text-brand-primary mb-4 flex items-center gap-2 font-bold'>
                <TrendingUp className='h-4 w-4' /> Dự án được quan tâm
              </h3>
              <div className='space-y-4'>
                {[
                  { name: 'The Global City', loc: 'TP. Thủ Đức', view: '2.5k' },
                  { name: 'Eaton Park', loc: 'Mai Chí Thọ', view: '1.8k' },
                  { name: 'Sycamore', loc: 'Bình Dương', view: '1.2k' },
                ].map((p, i) => (
                  <Link
                    key={i}
                    href={`/project/${p.name.toLowerCase().replace(/ /g, '-')}`}
                    className='group flex items-center justify-between'
                  >
                    <div>
                      <h4 className='text-brand-primary group-hover:text-primary text-sm font-bold transition-colors'>
                        {p.name}
                      </h4>
                      <p className='text-xs text-gray-500'>{p.loc}</p>
                    </div>
                    <div className='flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-400'>
                      <Eye className='h-3 w-3' /> {p.view}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className='bg-brand-primary relative overflow-hidden rounded-2xl p-6 text-white'>
              <div className='relative z-10'>
                <h3 className='mb-2 text-lg font-bold'>Bản tin Aetheria</h3>
                <p className='mb-4 text-sm text-gray-300'>
                  Nhận tổng hợp tin tức thị trường và cơ hội đầu tư vào sáng thứ 2 hàng tuần.
                </p>
                <div className='flex gap-2'>
                  <input
                    type='email'
                    placeholder='Email của bạn'
                    className='w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none'
                  />
                  <button className='bg-primary rounded-lg px-4 py-2 text-sm font-bold transition-colors hover:bg-blue-600'>
                    Gửi
                  </button>
                </div>
              </div>
              {/* Decor */}
              <div className='bg-primary absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsScreen;
