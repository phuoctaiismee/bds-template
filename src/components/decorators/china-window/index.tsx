import { FC } from 'react';

type ChinaWindowDecoratorProps = React.SVGProps<SVGSVGElement>;

const ChinaWindowDecorator: FC<ChinaWindowDecoratorProps> = (props) => {
  return (
    <svg width={101} height={141} viewBox='0 0 101 141' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M100 114.771H85.4813V98.2209H70.9613V82.0604H84.5433V15.3145H42.857'
        stroke='#A3A3A3'
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path d='M71.4289 15.3145V1.02926' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
      <path d='M-4.56765e-05 1.02939H99.0634V141' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
      <path d='M99.0634 50.21H70.9612V33.3484H99.0634' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
      <path d='M71.3691 14.2615V33.3633H54.1595V14.2615' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
      <path d='M42.8574 0.707937V15.3145H24.122V0.707937' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
      <path d='M99.0634 67.0723H70.9612V50.21H99.0634' stroke='#A3A3A3' strokeWidth={2} strokeMiterlimit={10} />
    </svg>
  );
};

export default ChinaWindowDecorator;
