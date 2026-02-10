import { FC } from 'react';

type LineDownArrowDecoratorProps = React.SVGProps<SVGSVGElement>;

const LineDownArrowDecorator: FC<LineDownArrowDecoratorProps> = (props) => {
  return (
    <svg width={26} height={122} viewBox='0 0 26 122' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path d='M13 120.25L13 0.25' stroke='#00C16E' />
      <path
        d='M1 111C1 111 6.159 112.655 8.5 114.5C10.8858 116.38 13 120.5 13 120.5C13 120.5 14.6142 116.38 17 114.5C19.341 112.655 25 111 25 111'
        stroke='#00C16E'
      />
    </svg>
  );
};

export default LineDownArrowDecorator;
