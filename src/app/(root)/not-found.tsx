import NotFoundError from '@/components/errors/not-found';
import { FC } from 'react';

type NotFoundPageProps = object;

const NotFoundPage: FC<NotFoundPageProps> = () => {
  return <NotFoundError />;
};

export default NotFoundPage;
