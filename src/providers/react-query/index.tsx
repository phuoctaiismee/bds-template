'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { FC, PropsWithChildren } from 'react';

// const persister = experimental_createQueryPersister({
//   maxAge: 1000 * 60 * 60 * 12, // 12 hours
//   storage: AsyncStorage,
// });

type RqProviderProps = PropsWithChildren;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: (prev: never) => prev,
      refetchOnWindowFocus: false,
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // // @ts-expect-error
      // persister: persister.persisterFn,
    },
    mutations: {
      onError(error) {
        enqueueSnackbar({
          message: error.message || 'Đã xảy ra lỗi',
          variant: 'error',
          anchorOrigin: { horizontal: 'center', vertical: 'top' },
        });
      },
    },
  },
});

const RqProvider: FC<RqProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false}  /> */}
    </QueryClientProvider>
  );
};

export default RqProvider;
