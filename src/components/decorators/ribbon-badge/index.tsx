import { FC } from 'react';

type RibbonBadgeDecoratorProps = React.SVGProps<SVGSVGElement>;

const RibbonBadgeDecorator: FC<RibbonBadgeDecoratorProps> = (props) => {
  return (
    <svg width={101} height={43} viewBox='0 0 101 43' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <rect x={6} y={31.7021} width={1} height={3} fill='#FF434E' />
      <g filter='url(#filter0_dd_129_5280)'>
        <path
          d='M6 7.62391C6 4.9057 8.20355 2.70215 10.9218 2.70215H83.9742C86.6531 2.70215 89.0074 4.47801 89.7433 7.05382L94.3148 23.0538C95.4099 26.8867 92.5319 30.7021 88.5456 30.7021H11.2299C11.2299 30.7021 9.96243 30.7436 9 31.2021C8.25211 31.5585 7.48726 32.0322 7 32.7021C6.73336 33.0688 6 32.9142 6 32.4609V7.62391Z'
          fill='#FF434E'
        />
      </g>
      <path
        d='M10.5 30.7021C9.90905 30.7021 9.32389 30.8185 8.77792 31.0447C8.23196 31.2708 7.73588 31.6023 7.31802 32.0202C6.90016 32.438 6.56869 32.9341 6.34254 33.4801C6.1164 34.026 6 34.6112 6 35.2021C6 35.7931 6.1164 36.3783 6.34254 36.9242C6.56869 37.4702 6.90016 37.9663 7.31802 38.3841C7.73588 38.802 8.23196 39.1335 8.77792 39.3596C9.32389 39.5858 9.90905 39.7021 10.5 39.7021L10.5 35.2021V30.7021Z'
        fill='#FF434E'
      />
      <path
        opacity={0.4}
        d='M10.5 30.7021C9.90905 30.7021 9.32389 30.8185 8.77792 31.0447C8.23196 31.2708 7.73588 31.6023 7.31802 32.0202C6.90016 32.438 6.56869 32.9341 6.34254 33.4801C6.1164 34.026 6 34.6112 6 35.2021C6 35.7931 6.1164 36.3783 6.34254 36.9242C6.56869 37.4702 6.90016 37.9663 7.31802 38.3841C7.73588 38.802 8.23196 39.1335 8.77792 39.3596C9.32389 39.5858 9.90905 39.7021 10.5 39.7021L10.5 35.2021V30.7021Z'
        fill='#121212'
      />
      <defs>
        <filter
          id='filter0_dd_129_5280'
          x={0}
          y={0.702148}
          width={100.549}
          height={42.2043}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius={2} operator='erode' in='SourceAlpha' result='effect1_dropShadow_129_5280' />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.06 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_129_5280' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius={2} operator='erode' in='SourceAlpha' result='effect2_dropShadow_129_5280' />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={4} />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='effect1_dropShadow_129_5280' result='effect2_dropShadow_129_5280' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect2_dropShadow_129_5280' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

export default RibbonBadgeDecorator;
