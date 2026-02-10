import React, { FC } from 'react';

type MapPinDecoratorProps = React.ComponentProps<'svg'>;

const MapPinDecorator: FC<MapPinDecoratorProps> = (props) => {
  return (
    <svg width={53} height={67} viewBox='0 0 53 67' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M53 26.6759C53 47.7685 32.9709 67 26.5 67C20.0291 67 0 47.4583 0 26.6759C0 11.9432 11.8645 0 26.5 0C41.1355 0 53 11.9432 53 26.6759Z'
        fill='currentColor'
      />
    </svg>
  );
};

export default MapPinDecorator;
