export const withResolvers = <T>() => {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
};

export const ESC_KEY = 'Escape';
export const focusableSelector = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "iframe:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
  "[contentEditable=true]:not([tabindex='-1'])",
].join(', ');

export const modalId = (() => {
  let counter = 1; // Hidden from the rest of the world
  return () => 'modal_' + ((counter++ * 1664525 + 1013904223) >>> 0).toString(36);
})();
