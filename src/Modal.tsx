import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import type { ModalEntry } from './types';
import { ModalContext } from './ModalProvider';
import { ESC_KEY, focusableSelector } from './constants';

type InternalModalProps<T, P> = {
  entry: ModalEntry<T, P>;
  className?: string;
};

const Modal = function <T, P>({ className, entry }: InternalModalProps<T, P>) {
  const { role = 'dialog', label, labelledby, componentProps, Component } = entry;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { removeModal } = useContext(ModalContext);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (!dialogRef.current) return;
      dialogRef.current.showModal();
      dialogRef.current.querySelector<HTMLElement>(focusableSelector)?.focus();
    });
  }, []);

  const handleKey = useCallback(
    (event: React.KeyboardEvent): void => {
      if (event.key === ESC_KEY && !entry.ignoreEscape) {
        removeModal(entry.id);
      }
    },
    [entry, removeModal],
  );

  return (
    <dialog
      ref={dialogRef}
      role={role}
      aria-label={label}
      aria-labelledby={labelledby}
      className={className}
      onKeyDown={handleKey}
    >
      <Component
        modalId={entry.id}
        close={entry.closeModal}
        resolve={entry.resolveModal}
        reject={entry.rejectModal}
        {...componentProps}
      />
    </dialog>
  );
};

export default Modal;
