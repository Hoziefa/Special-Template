export const removeClassAttr = (list: Element[] | HTMLCollection | NodeListOf<Element>, ...[cls = 'active', ...rest]: string[]): void => {
    Array.from(list, item => item.classList.remove(cls, ...rest));
};
