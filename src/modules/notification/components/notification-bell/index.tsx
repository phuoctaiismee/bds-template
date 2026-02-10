import CircleLoading from '@/components/ui/circle-loading';
import { useAuthStore } from '@/stores/auth';
import { BellIcon, BellIcon as BellIconSolid, ExclamationCircleIcon, InboxIcon } from '@heroicons/react/24/outline';
import { Badge, Button, CardActionArea, Drawer, IconButton, Typography } from '@mui/material';
import { Inbox } from '@tnfdev/react';
import Image from 'next/image';
import { FC } from 'react';

type NotificationBellProps = object;

const NotificationBell: FC<NotificationBellProps> = () => {
  const { user } = useAuthStore();

  if (!user)
    return (
      <IconButton disabled>
        <BellIcon className='size-5' />
      </IconButton>
    );

  return (
    <div>
      <Inbox
        key={user.id}
        components={{
          NotificationPopover: ({ children, onClose, open }) => (
            <Drawer
              open={open}
              anchor='bottom'
              onClose={onClose}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: '24px 24px 0 0',
                    paddingTop: 5,
                    height: 'calc(100% - 100px)',
                    overflow: 'hidden',
                  },
                },
              }}
            >
              {children}
            </Drawer>
          ),
          Bell: ({ counts, active, onClick }) => {
            return (
              <Badge badgeContent={counts} color='error'>
                <IconButton onClick={onClick}>
                  {active ? <BellIconSolid className='size-5' /> : <BellIcon className='size-5' />}
                </IconButton>
              </Badge>
            );
          },
          NotificationHeader: ({ markAllAsRead }) => (
            <div className='flex items-center gap-2 px-6'>
              <Typography className='text-[18px]'>Thông báo</Typography>
              <span className='flex-1'></span>
              <Button onClick={markAllAsRead}>Đánh dấu tất cả đã đọc</Button>
            </div>
          ),
          Empty: () => (
            <div className='flex min-h-[200px] flex-col items-center justify-center gap-2'>
              <InboxIcon className='text-neutral-3 size-20' />
              <Typography className='text-neutral-2 text-center text-[16px] font-normal'>Chưa có thông báo</Typography>
            </div>
          ),
          NotificationItem: ({ notification }) => (
            <div className='mx-4 mb-4'>
              <CardActionArea
                className='border-neutral-3 relative rounded-[16px] border p-4'
                onClick={notification.markAsRead}
              >
                <div className='flex gap-4'>
                  <div className='bg-primary/10 relative flex size-10 items-center justify-center rounded-[12px]'>
                    {notification.icon ? (
                      <Image
                        src={notification.icon}
                        alt={notification.title}
                        fill
                        className='object-cover object-center'
                      />
                    ) : (
                      <ExclamationCircleIcon className='text-primary size-5' />
                    )}
                  </div>

                  <div className='flex flex-1 flex-col'>
                    <Typography className='text-[16px] font-semibold'>{notification.title}</Typography>
                    <Typography className='text-[14px] font-normal'>{notification.message}</Typography>
                  </div>
                </div>

                {!notification.isRead && (
                  <div className='bg-error/10 absolute top-3 right-3 size-4 rounded-full p-1'>
                    <div className='bg-error size-full rounded-full' />
                  </div>
                )}
              </CardActionArea>
            </div>
          ),
          Loader: () => <CircleLoading />,
        }}
      />
    </div>
  );
};

export default NotificationBell;
