'use client';

import { cn } from '@/lib/twMerge'; // Import hàm cn
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// --- TYPES ---
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- CONFIG STYLES & ICONS ---
// Tách biệt cấu hình ra ngoài component để dễ quản lý
const TOAST_VARIANTS = {
  success: {
    container: 'border-white/10',
    iconColor: 'text-primary',
    icon: CheckCircle2,
  },
  error: {
    container: 'border-red-500/30 bg-red-950/20', // Thêm chút nền đỏ nhẹ cho error
    iconColor: 'text-red-500',
    icon: AlertCircle,
  },
  info: {
    container: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    icon: Info,
  },
};

// --- TOAST ITEM COMPONENT ---
const ToastItem = ({ id, message, type, onRemove }: Toast & { onRemove: (id: number) => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const variant = TOAST_VARIANTS[type];
  const Icon = variant.icon;

  useEffect(() => {
    // Animation In
    const mountFrame = requestAnimationFrame(() => setIsVisible(true));

    // Auto Close
    const timer = setTimeout(() => handleClose(), 3000);

    return () => {
      cancelAnimationFrame(mountFrame);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Trigger Animation Out
    setTimeout(() => onRemove(id), 300); // Wait for transition
  };

  return (
    <div
      className={cn(
        // 1. Base Layout & Transition
        'pointer-events-auto flex w-full justify-center transition-all duration-300 ease-in-out',
        // 2. Animation States logic
        isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-4 scale-95 opacity-0',
      )}
    >
      <div
        className={cn(
          // 1. Base Styles (Glassmorphism, Shape, Layout)
          'flex max-w-sm min-w-70 items-center gap-3 rounded-full border px-4 py-2.5 shadow-2xl backdrop-blur-md',
          'bg-base-900/90 text-xs font-bold text-white',
          // 2. Dynamic Styles based on Type (Border, Background tweak)
          variant.container,
        )}
      >
        <Icon size={18} className={cn('shrink-0', variant.iconColor)} />

        <span className='flex-1 leading-tight'>{message}</span>

        <button onClick={handleClose} className='group rounded-full p-1 transition-colors hover:bg-white/10'>
          <X size={14} className='text-white/80 transition-colors group-hover:text-white' />
        </button>
      </div>
    </div>
  );
};

// --- PROVIDER ---
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    toast: {
      success: (msg: string) => addToast(msg, 'success'),
      error: (msg: string) => addToast(msg, 'error'),
      info: (msg: string) => addToast(msg, 'info'),
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast Container Layer */}
      <div className='pointer-events-none fixed top-4 right-0 left-0 z-9999 flex flex-col items-center gap-2 px-4'>
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- HOOK ---
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context.toast;
};
