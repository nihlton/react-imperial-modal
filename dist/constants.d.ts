export declare const withResolvers: <T>() => {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: unknown) => void;
};
export declare const ESC_KEY = "Escape";
export declare const focusableSelector: string;
export declare const modalId: () => string;
