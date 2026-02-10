'use client';
import { cn } from '@/lib/twMerge';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useToggle, useWindowSize } from 'usehooks-ts';

interface SeeMoreProps extends PropsWithChildren {
  maxHeight: number;
  disabledOnDesktop?: boolean;
  overlayClassName?: string;
}

const DESKTOP_WIDTH = 1024;

const SeeMore: FC<SeeMoreProps> = ({ maxHeight, children, disabledOnDesktop = false, overlayClassName }) => {
  const [element, setElement] = useState<HTMLDivElement | undefined>();
  const [isOpen, toggle] = useToggle();

  const { width } = useWindowSize();

  const isOverflow = useMemo(() => {
    if (!element || !width) return false;
    if (disabledOnDesktop && width > DESKTOP_WIDTH) return false;
    return element.clientHeight > maxHeight;
  }, [disabledOnDesktop, element, maxHeight, width]);

  return (
    <div className='relative'>
      <div
        style={{
          ...(isOpen
            ? {
                height: element?.clientHeight,
              }
            : {
                ...(isOverflow
                  ? {
                      height: maxHeight,
                    }
                  : {}),
              }),
        }}
        className='overflow-hidden transition-all'
      >
        <div
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   @ts-expect-error
          ref={setElement}
        >
          {children}
        </div>
      </div>

      {isOverflow && (
        <div
          className={cn(
            'from-background/0 to-background absolute bottom-0 left-0 flex h-[80px] w-full items-end justify-center bg-gradient-to-b to-65%',
            { 'relative h-fit': isOpen },
            overlayClassName,
          )}
        >
          <Button
            endIcon={
              <KeyboardArrowDownOutlined
                className='transition-all'
                sx={{
                  ...(isOpen
                    ? {
                        rotate: '180deg',
                      }
                    : {}),
                }}
              />
            }
            color='secondary'
            onClick={toggle}
            size='small'
            fullWidth
          >
            {isOpen ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeeMore;
