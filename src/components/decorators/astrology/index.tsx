import { FC } from 'react';

type AstrologyDecoratorProps = React.SVGProps<SVGSVGElement>;

const AstrologyDecorator: FC<AstrologyDecoratorProps> = (props) => {
  return (
    <svg width={52} height={60} viewBox='0 0 52 60' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M26 0L27.185 27.9475L51.9808 15L28.37 30L51.9808 45L27.185 32.0525L26 60L24.815 32.0525L0.0192375 45L23.63 30L0.0192375 15L24.815 27.9475L26 0Z'
        fill='#121212'
      />
    </svg>
  );
};

export default AstrologyDecorator;
