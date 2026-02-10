import { FC } from 'react';
import ArticleContent from '../components/article-content';
import ArticleHeader from '../components/article-header';
import AuthorBox from '../components/author-box';
import ReadingProgressBar from '../components/progress-bar';
import RelatedListings from '../components/related-listing';
import TableOfContents from '../components/table-of-contents';
import { ARTICLE } from '../mock';

async function getArticle(id: string) {
  return ARTICLE;
}
type NewDetailScreenProps = {
  slug: string;
};
const NewDetailScreen: FC<NewDetailScreenProps> = async ({ slug }) => {
  const article = await getArticle(slug);
  const tocItems = article.content
    .filter((block) => block.type === 'h2')
    .map((block) => block.text.replace(/^\d+\.\s*/, ''));
  return (
    <div className='relative min-h-screen bg-white pb-24 text-base'>
      {/* Client Component: Thanh tiến trình */}
      <ReadingProgressBar />

      {/* Main Layout */}
      <div className='container mx-auto px-4 pt-6 md:px-6'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-12'>
          {/* LEFT: Main Content (8 cols) */}
          <div className='lg:col-span-8'>
            <ArticleHeader article={article} />

            <div className='mb-12 aspect-video overflow-hidden rounded-2xl'>
              <img src={article.heroImage} alt={article.title} className='h-full w-full object-cover' />
            </div>

            <ArticleContent content={article.content} />
          </div>

          {/* RIGHT: Sidebar (4 cols) - Sticky */}
          <div className='relative lg:col-span-4'>
            <div className='sticky top-24 z-10 space-y-8'>
              <TableOfContents items={tocItems} />

              <AuthorBox author={article.author} />

              <RelatedListings location={article.location} count={article.relatedListingsCount} />
            </div>
          </div>
        </div>

        {/* Footer: Related Articles */}
        <div className='mt-24 border-t border-gray-200 pt-12'>
          <h2 className='text-brand-primary mb-8 text-2xl font-extrabold'>Bài viết liên quan</h2>
          {/* <RelatedArticles /> - Tách component này ra tương tự */}
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='group cursor-pointer'>
                <div className='mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-gray-100'>
                  <img
                    src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop`}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    alt='Related'
                  />
                </div>
                <div className='text-brand-blue mb-2 text-xs font-bold uppercase'>Pháp lý</div>
                <h3 className='text-brand-primary group-hover:text-brand-blue mb-2 text-lg leading-snug font-bold transition-colors'>
                  Luật Đất đai 2024: Cơ hội nào cho người mua nhà lần đầu?
                </h3>
                <p className='line-clamp-2 text-sm text-gray-500'>
                  Phân tích những thay đổi tích cực trong chính sách tín dụng và quy định về cấp sổ hồng.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDetailScreen;
