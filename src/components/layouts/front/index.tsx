'use client';
import { MobileBottomNav } from '@/modules/layout/app-bottom-bar';
import { AppFooter } from '@/modules/layout/app-footer';
import AppHeader from '@/modules/layout/app-header';
import { FC, PropsWithChildren } from 'react';

type FrontLayoutProps = PropsWithChildren;

const FrontLayout: FC<FrontLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main className='font-sans text-base'>{children}</main>
      <AppFooter />
      <MobileBottomNav />
    </>
  );
};

export default FrontLayout;
