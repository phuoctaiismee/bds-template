'use client';
import { ChannelProvider } from 'ably/react';
import { ComponentProps, FC } from 'react';

type AppChanelProviderProps = ComponentProps<typeof ChannelProvider>;

const AppChannelProvider: FC<AppChanelProviderProps> = (props) => {
  return <ChannelProvider {...props} />;
};

export default AppChannelProvider;
