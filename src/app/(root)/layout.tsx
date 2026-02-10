import FrontLayout from '@/components/layouts/front';
import { FC, PropsWithChildren } from 'react';

type FrontLayoutPageProps = PropsWithChildren;

const FrontLayoutPage: FC<FrontLayoutPageProps> = async ({ children }) => {
//   const session = await auth();

//   const headerList = await headers();
//   const pathname = headerList.get('x-current-path');

//   if (!session) redirect(`/login?next=${pathname}`, RedirectType.replace);

  return <FrontLayout>{children}</FrontLayout>;
};

export default FrontLayoutPage;
