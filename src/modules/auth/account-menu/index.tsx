'use client';
import { CONST_TRANSITION } from '@/const';
import { useRouter } from '@/lib/navigation';
import { ViewTransition } from '@/lib/view-transition';
import { useAuthStore } from '@/stores/auth';
import { LogoutOutlined } from '@mui/icons-material';
import { Avatar, Button, CardActionArea, Drawer } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { FC } from 'react';
import { useToggle } from 'usehooks-ts';

type AccountMenuProps = object;

const AccountMenu: FC<AccountMenuProps> = () => {
  const [isShow, toggle] = useToggle();
  const { user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync: handleLogout } = useMutation({
    mutationFn: () => signOut({ redirect: false }),
    onSuccess: () => {
      router.replace('/login');
      queryClient.clear();
    },
    onError(error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
  });

  if (!user) return <div className='bg-neutral-1 size-10 animate-pulse rounded-[12px]'></div>;

  return (
    <>
      <CardActionArea className='w-fit rounded-lg' onClick={toggle}>
        <ViewTransition name={CONST_TRANSITION.CURRENT_USER_AVATAR}>
          <Avatar src={user.avatar} slotProps={{ img: { sizes: '64px' } }} />
        </ViewTransition>
      </CardActionArea>

      <Drawer open={isShow} onClose={toggle} anchor='bottom'>
        <div className='flex flex-col p-6'>
          <Button variant='contained' onClick={handleLogout as never} endIcon={<LogoutOutlined />}>
            Đăng xuất
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default AccountMenu;
