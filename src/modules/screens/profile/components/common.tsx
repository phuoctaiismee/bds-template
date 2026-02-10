export const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`h-7 w-12 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-200'}`}
  >
    <div
      className={`h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);

export const BiometricIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M9 3H5a2 2 0 0 0-2 2v4' />
    <path d='M19 3h-4' />
    <path d='M21 5v4' />
    <path d='M21 15v4a2 2 0 0 1-2 2h-4' />
    <path d='M3 15v4a2 2 0 0 0 2 2h4' />
    <path d='M9 10a.5.5 0 0 0 0 1' />
    <path d='M15 10a.5.5 0 0 0 0 1' />
    <path d='M9.5 15a3.5 3.5 0 0 0 5 0' />
  </svg>
);
