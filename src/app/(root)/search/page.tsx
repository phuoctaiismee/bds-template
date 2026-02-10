import SearchScreen from '@/modules/screens/search';
import { FC } from 'react';

type SearchPageProps = {
  searchParams: Promise<{
    type: string;
    keyword: string;
  }>;
};

const SearchPage: FC<SearchPageProps> = async ({ searchParams }) => {
  const { keyword, type } = await searchParams;
  return <SearchScreen keyword={keyword} type={type} />;
};

export default SearchPage;
