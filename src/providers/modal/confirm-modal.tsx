// components/confirm-modal.tsx
import { cn } from '@/lib/twMerge';
import { Button, Dialog, Zoom } from '@mui/material';
import { Loader2 } from 'lucide-react';
import React from 'react';

// Import Interface từ Provider để đồng bộ type, hoặc define lại
interface ConfirmModalUIProps {
  isOpen: boolean;
  isLoading: boolean;
  title?: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';

  // Props mở rộng
  icon?: React.ReactNode;
  center?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Zoom ref={ref} {...props} />;
});

const ConfirmModal: React.FC<ConfirmModalUIProps> = ({
  isOpen,
  isLoading,
  title,
  message,
  confirmText = 'Đồng ý',
  cancelText = 'Huỷ',
  variant = 'primary',
  icon,
  center = false, // Mặc định là false (căn trái)
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={isLoading ? undefined : onCancel}
      slotProps={{
        backdrop: { className: 'bg-base-950/80 backdrop-blur-sm' },
        paper: {
          className: 'bg-transparent shadow-none',
          style: { maxWidth: 'none', backgroundImage: 'none' },
        },
      }}
    >
      <div
        className={cn(
          'bg-base-900 w-full max-w-96 rounded-2xl border border-white/10 p-6 shadow-2xl transition-all',
          // Nếu center=true thì dùng flex-col và items-center để căn giữa
          center && 'flex flex-col items-center text-center',
        )}
      >
        {/* 1. ICON SECTION */}
        {icon && (
           <div className="w-16 h-16 rounded-full bg-base-800 border border-white/5 flex items-center justify-center mb-4 shadow-inner">
            {icon}
          </div>
        )}

        {/* 2. TITLE SECTION */}
        {title && <h3 className='mb-2 text-lg leading-tight font-bold text-white'>{title}</h3>}

        {/* 3. MESSAGE SECTION */}
        <div className={cn('text-accent-foreground mb-6 text-sm', center && 'px-4')}>{message}</div>

        {/* 4. BUTTONS SECTION */}
        <div className={cn('flex w-full gap-3', center && 'justify-center')}>
          <Button
            variant='contained'
            onClick={onCancel}
            disabled={isLoading}
            className='bg-base-950 text-accent-foreground/80 h-10 flex-1 rounded-lg border border-white/10 text-xs font-bold normal-case transition-colors hover:bg-white/5 hover:text-white'
          >
            {cancelText}
          </Button>

          <Button
            variant='contained'
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border text-xs font-bold normal-case shadow-lg transition-all',
              variant === 'danger'
                ? 'border-red-500/20 bg-red-500/10 text-red-500 shadow-red-500/10 hover:bg-red-500/20'
                : 'bg-primary text-base-950 shadow-primary/20 border-white/20 hover:brightness-110',
            )}
          >
            {isLoading && <Loader2 size={14} className='animate-spin' />}
            {confirmText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
