import LargeLoadingUI from '@/components/ui/large-loading';
import { FC } from 'react';

type GlobalLoadingProps = object;

const GlobalLoading: FC<GlobalLoadingProps> = () => {
  return <LargeLoadingUI />;
};

export default GlobalLoading;
