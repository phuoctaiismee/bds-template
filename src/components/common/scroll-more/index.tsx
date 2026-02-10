import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, PropsWithChildren, useCallback, useState } from 'react';

const DEFAULT_MAX_HEIGHT = 500;

interface ScrollMoreProps extends PropsWithChildren {
  maxHeight?: number;
}

const ScrollMore: FC<ScrollMoreProps> = ({ children, maxHeight = DEFAULT_MAX_HEIGHT }) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement | undefined>();
  const [element, setElement] = useState<HTMLElement | undefined>();

  const handleScrollDown = useCallback(() => {
    wrapper?.scrollTo({ top: element?.clientHeight, behavior: 'smooth' });
  }, [element?.clientHeight, wrapper]);

  const isOverflow = (element?.clientHeight || 0) > maxHeight;

  return (
    <div className='flex flex-col' style={{ maxHeight }}>
      <div className='flex-1 overflow-scroll' ref={setWrapper as never}>
        <div ref={setElement as never}>{children}</div>
      </div>

      {isOverflow && (
        <div className='relative flex justify-center'>
          <div className='from-background/0 to-background absolute bottom-full left-0 h-[50px] w-full bg-gradient-to-b' />

          <IconButton
            className='bg-background text-secondary border-secondary rounded-full border'
            onClick={handleScrollDown}
          >
            <KeyboardArrowDownOutlined />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ScrollMore;
