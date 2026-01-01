import React, { useRef, useState, useMemo, useCallback } from 'react';
import Modal from './Modal';

import type { ModalContextValue, ModalEntry, ModalProviderProps } from './types';

const useWithoutProvider = () => {
  throw new Error(
    'Attempted to call useModal outside of modal context. Make sure your component is inside ModalProvider.',
  );
};

export const ModalContext = React.createContext<ModalContextValue>({
  addModal: useWithoutProvider,
  removeModal: useWithoutProvider,
  resolveModal: useWithoutProvider,
  rejectModal: useWithoutProvider,
});

const docEl = document.documentElement;
const docBody = document.body;

export const ModalProvider = ({ children, config = {} }: ModalProviderProps) => {
  const [modalEntries, setModalEntries] = useState<ModalEntry<unknown, unknown>[]>([]);
  const appContainer = useRef<HTMLDivElement>(null);
  const prevElements = useRef<HTMLElement[]>([]);

  const modalSetup = useCallback(() => {
    if (config.bodyOpenClass) docBody.classList.add(config.bodyOpenClass);
    appContainer?.current?.setAttribute('aria-hidden', 'true');
    docEl.style.overflow = 'hidden';
  }, [config]);

  const modalTakeDown = useCallback(() => {
    if (config.bodyOpenClass) docBody.classList.remove(config.bodyOpenClass);
    appContainer?.current?.removeAttribute('aria-hidden');
    docEl.style.overflow = '';
  }, [config]);

  const addModal = useCallback(
    (entry: ModalEntry<unknown, unknown>): void => {
      setModalEntries((current) => {
        if (current.includes(entry)) return current;
        if (current.length === 0) modalSetup();
        prevElements.current.push(document.activeElement as HTMLInputElement);

        return [...current, entry];
      });
    },
    [modalSetup],
  );

  const removeModal = useCallback(
    (id?: string): void => {
      setModalEntries((current) => {
        const mostRecentModal = current.at(-1);
        const matchingEntry = current.find((entry) => entry.id === id);
        const entry = id === undefined ? mostRecentModal : matchingEntry;
        const lastModal = current.length === 1;
        const el = prevElements.current.pop();

        if (!entry || !current.includes(entry)) return current;
        if (lastModal && el && docEl.contains(el)) el.focus();
        if (lastModal) modalTakeDown();

        return current.filter((openEntry) => entry !== openEntry);
      });
    },
    [modalTakeDown],
  );

  const resolveModal = useCallback(<T,>(val: T, id?: string) => {
    setModalEntries((current) => {
      const mostRecentModal = current.at(-1);
      const matchingEntry = current.find((entry) => entry.id === id);
      const entry = id === undefined ? mostRecentModal : matchingEntry;

      entry?.resolveModal(val);
      return current;
    });
  }, []);

  const rejectModal = useCallback((reason?: unknown, id?: string) => {
    setModalEntries((current) => {
      const mostRecentModal = current.at(-1);
      const matchingEntry = current.find((entry) => entry.id === id);
      const entry = id === undefined ? mostRecentModal : matchingEntry;

      entry?.rejectModal(reason);
      return current;
    });
  }, []);

  const contextValue = useMemo(
    () => ({ addModal, removeModal, resolveModal, rejectModal }),
    [addModal, removeModal, resolveModal, rejectModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      <div ref={appContainer}>{children}</div>
      <div className={config.modalContainerClass}>
        {modalEntries.map((modalEntry) => (
          <Modal key={modalEntry.id} className={config.modalClass} entry={modalEntry} />
        ))}
      </div>
    </ModalContext.Provider>
  );
};
