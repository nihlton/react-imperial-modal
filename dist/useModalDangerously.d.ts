import { ModalEntry, ModalProps } from './types';
export declare const useModalDangerously: () => readonly [<T, P>(Component: React.ComponentType<P & ModalProps<T>>, componentProps: P, ignoreEscape?: boolean, label?: string, labelledby?: string, role?: string) => ModalEntry<T, P>, (id?: string) => void, (val: unknown, id?: string) => void, (reason?: unknown, id?: string) => void];
