import { ModalEntry } from './types';
type InternalModalProps<T, P> = {
    entry: ModalEntry<T, P>;
    className?: string;
};
declare const Modal: <T, P>({ className, entry }: InternalModalProps<T, P>) => import("react/jsx-runtime").JSX.Element;
export default Modal;
