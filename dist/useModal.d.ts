import { ModalEntry, ModalProps } from './types';
export declare const useModal: () => <T, P>(Component: React.ComponentType<P & ModalProps<T>>, componentProps: P, ignoreEscape?: boolean, label?: string, labelledby?: string, role?: string) => ModalEntry<T, P>;
