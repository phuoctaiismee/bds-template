import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

type AuthLayoutProps = PropsWithChildren;

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <>{children}</>;
};

export default AuthLayout;
