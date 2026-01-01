import { useContext, useCallback } from 'react';
import { ModalContext } from './ModalProvider';
import type { ModalEntry, ModalProps } from './types';
import { modalId, withResolvers } from './constants';

export const useModalDangerously = () => {
  const context = useContext(ModalContext);
  const openModal = useCallback(
    <T, P>(
      Component: React.ComponentType<P & ModalProps<T>>,
      componentProps: P,
      ignoreEscape: boolean = false,
      label?: string,
      labelledby?: string,
      role: string = 'dialog',
    ): ModalEntry<T, P> => {
      const { promise, resolve, reject } = withResolvers<T>();
      const id = modalId();
      const closeModal = () => context.removeModal(id);

      const modalEntry: ModalEntry<T, P> = Object.assign(promise, {
        id,
        Component,
        componentProps,
        ignoreEscape,
        labelledby,
        label,
        role,
        resolveModal: (val: T) => {
          resolve(val);
          closeModal();
        },
        rejectModal: (reason: unknown) => {
          reject(reason);
          closeModal();
        },
        closeModal,
      });

      context.addModal(modalEntry as ModalEntry<unknown, unknown>);
      return modalEntry;
    },
    [context],
  );

  return [openModal, context.removeModal, context.resolveModal, context.rejectModal] as const;
};
