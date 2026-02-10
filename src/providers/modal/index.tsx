// providers/modal-provider.tsx (hoặc Context file của bạn)
'use client';

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import ConfirmModal from './confirm-modal';

export interface ModalProps {
  title?: string; // Title không bắt buộc nếu bạn muốn custom hoàn toàn trong message
  message: ReactNode | string;
  confirmText?: string;
  cancelText?: string;
  
  // --- MỞ RỘNG MỚI ---
  icon?: ReactNode; // Icon hiển thị ở trên cùng
  center?: boolean; // Căn giữa nội dung
  // -------------------

  onConfirm?: () => Promise<void> | void | Promise<any>;
  variant?: 'primary' | 'danger';
}

interface ModalContextType {
  show: (props: ModalProps) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps>({
    message: '', // Init default
  });

  const show = useCallback((props: ModalProps) => {
    setModalProps(props);
    setIsOpen(true);
    setIsLoading(false);
  }, []);

  const hide = useCallback(() => {
    if (isLoading) return;
    setIsOpen(false);
  }, [isLoading]);

  const handleConfirm = async () => {
    if (!modalProps.onConfirm) {
      hide();
      return;
    }
    try {
      setIsLoading(true);
      await modalProps.onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error('Modal action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContext.Provider value={{ show, hide }}>
      {children}
      {/* Truyền toàn bộ props xuống UI */}
      <ConfirmModal isOpen={isOpen} isLoading={isLoading} {...modalProps} onConfirm={handleConfirm} onCancel={hide} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};