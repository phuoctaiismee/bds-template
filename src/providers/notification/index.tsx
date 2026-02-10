'use client';
import { TEKIFY } from '@/config/env';
import { useAuthStore } from '@/stores/auth';
import { TeknifyProvider } from '@tnfdev/react';
import { FC, PropsWithChildren } from 'react';

type NotificationProviderProps = PropsWithChildren;

const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) return children;

  return (
    <TeknifyProvider applicationId={TEKIFY.APP_ID} subscriberId={user.id}>
      {children}
    </TeknifyProvider>
  );
};

export default NotificationProvider;
