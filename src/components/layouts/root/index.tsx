import RootTheme from '@/components/theme/root';
import { FC } from 'react';

type RootLayoutProps = React.PropsWithChildren;

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return <RootTheme>{children}</RootTheme>;
};

export default RootLayout;
