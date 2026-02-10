'use client';
import { ABLY } from '@/config/env';
import { useAuthStore } from '@/stores/auth';
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';
import { FC, PropsWithChildren } from 'react';

let realtimeClient: Realtime | undefined = undefined;

if (ABLY.KEY) realtimeClient = new Realtime({ key: ABLY.KEY });

type AppAblyProviderProps = PropsWithChildren;

const AppAblyProvider: FC<AppAblyProviderProps> = ({ children }) => {
  const { user } = useAuthStore();

  if (realtimeClient)
    return (
      <AblyProvider client={realtimeClient}>
        <ChannelProvider channelName={user?.id || ''}>{children}</ChannelProvider>
      </AblyProvider>
    );

  return children;
};

export default AppAblyProvider;
