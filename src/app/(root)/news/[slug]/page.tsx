import NewDetailScreen from '@/modules/screens/news/detail';
import { FC } from 'react';

type NewDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};
const NewDetailPage: FC<NewDetailPageProps> = async ({ params }) => {
  const { slug } = await params;
  return <NewDetailScreen slug={slug} />;
};

export default NewDetailPage;
