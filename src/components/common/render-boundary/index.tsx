import CircleLoading from '@/components/ui/circle-loading';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

const DEFAULT_HEIGHT = '100dvh';
const DEFAULT_DISTANCE = 100;

interface RenderBoundaryProps extends PropsWithChildren {
  defaultHeight?: number | string;
  distance?: number;
}

const RenderBoundary: FC<RenderBoundaryProps> = ({
  children,
  defaultHeight = DEFAULT_HEIGHT,
  distance = DEFAULT_DISTANCE,
}) => {
  const [element, setElement] = useState<HTMLDivElement | undefined>();
  const [scrollY, setScrollY] = useState(0);
  const { height } = useWindowSize();

  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handler);
  }, []);

  const shouldShow = (element?.getBoundingClientRect().top || 0) <= scrollY + height + distance;

  return (
    <div
      style={{
        ...(shouldShow
          ? {}
          : {
              minHeight: defaultHeight,
            }),
      }}
      ref={setElement as never}
    >
      {shouldShow ? children : <CircleLoading />}
    </div>
  );
};

export default RenderBoundary;
