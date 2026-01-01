import { ReactNode } from 'react';
export interface ModalProps<T = void> {
    modalId: string;
    resolve: (val: T) => void;
    reject: (reason?: unknown) => void;
    close: () => void;
}
export type ModalEntry<T, P> = Promise<T> & {
    id: string;
    Component: React.ComponentType<P & ModalProps<T>>;
    componentProps: P;
    resolveModal: (val: T) => void;
    rejectModal: (reason?: unknown) => void;
    closeModal: () => void;
    ignoreEscape?: boolean;
    labelledby?: string;
    label?: string;
    role?: string;
};
export type ModalProviderConfig = {
    bodyOpenClass?: string;
    modalContainerClass?: string;
    modalClass?: string;
};
export type ModalProviderProps = {
    children?: ReactNode;
    config?: ModalProviderConfig;
};
export type ModalContextValue = {
    addModal: (entry: ModalEntry<unknown, unknown>) => void;
    removeModal: (id?: string) => void;
    resolveModal: (val: unknown, id?: string) => void;
    rejectModal: (reason?: unknown, id?: string) => void;
};
