import { createSvgIcon } from '@mui/material';

const HealCrossIcon = createSvgIcon(
  <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <mask
      id='mask0_1542_48979'
      style={{
        maskType: 'alpha',
      }}
      maskUnits='userSpaceOnUse'
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <rect width={24} height={24} fill='#D9D9D9' />
    </mask>
    <g mask='url(#mask0_1542_48979)'>
      <path
        d='M8.3365 20.5V15.6635H3.5V8.34625H8.3365V3.5H15.6538V8.34625H20.5V15.6635H15.6538V20.5H8.3365ZM9.8365 19H14.1538V14.1635H19V9.84625H14.1538V5H9.8365V9.84625H5V14.1635H9.8365V19Z'
        fill='currentColor'
      />
    </g>
  </svg>,
  'HealCrossIcon',
);

export default HealCrossIcon;
