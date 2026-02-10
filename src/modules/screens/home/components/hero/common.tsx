import { cn } from '@/lib/twMerge';
import { Button } from '@mui/material';
import { LucideIcon } from 'lucide-react';

export const FilterButton = ({
  active,
  onClick,
  children,
  className,
  variant = 'outlined',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'contained' | 'outlined';
}) => (
  <Button
    type='button'
    onClick={onClick}
    className={cn(
      'min-w-0 rounded-lg border px-3 py-1.5 text-sm transition-all duration-200',
      variant === 'outlined' &&
        (active
          ? 'bg-primary/10 border-primary text-primary font-bold'
          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'),
      variant === 'contained' &&
        (active
          ? 'bg-primary border-primary shadow-primary/20 font-bold text-white shadow-md'
          : 'border-transparent bg-gray-100 text-gray-500 hover:bg-gray-200'),
      className,
    )}
  >
    {children}
  </Button>
);

export const SectionLabel = ({ icon: Icon, label }: { icon?: LucideIcon; label: string }) => (
  <label className='mb-3 flex items-center gap-2 text-xs font-bold tracking-wide text-gray-500 uppercase'>
    {Icon && <Icon className='h-3.5 w-3.5' />} {label}
  </label>
);

export const RangeInput = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <input
    type='number'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className='focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-bold transition-all outline-none focus:ring-1'
  />
);
