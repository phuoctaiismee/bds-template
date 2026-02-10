'use client';
import { Link } from '@/lib/navigation';
import { ArrowBackOutlined } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type ComingSoonProps = object;

const ComingSoon: FC<ComingSoonProps> = () => {
  const t = useTranslations();
  return (
    <div className='absolute flex size-full flex-col items-center justify-center gap-4 p-16 text-center'>
      <div className='flex flex-col items-center'>
        <animated.div
          style={{
            ...useSpring({
              from: {
                opacity: 0,
              },
              to: {
                opacity: 1,
              },
              config: {
                duration: 500,
              },
            }),
          }}
        >
          <Typography
            className='text-positive/90 drop-shadow-negative drop-shadow-[1px_1px,1px_-1px,-1px_-1px,-1px_1px]'
            fontSize={100}
            variant='h1'
          >
            {t('utils.coming_soon.title')}
          </Typography>
        </animated.div>

        <animated.div
          style={{
            ...useSpring({
              from: {
                opacity: 0,
              },
              to: {
                opacity: 1,
              },
              config: {
                duration: 500,
              },
            }),
          }}
        >
          <Typography
            className='text-positive/90 drop-shadow-negative drop-shadow-[1px_1px,1px_-1px,-1px_-1px,-1px_1px]'
            fontSize={30}
            variant='body1'
          >
            {t('utils.coming_soon.description')}
          </Typography>
        </animated.div>
      </div>

      <animated.div
        style={{
          ...useSpring({
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
            config: {
              duration: 500,
            },
          }),
        }}
      >
        <Button variant='contained' startIcon={<ArrowBackOutlined />} component={Link} href='/' color='secondary'>
          {t('common.go_back')}
        </Button>
      </animated.div>
    </div>
  );
};

export default ComingSoon;
