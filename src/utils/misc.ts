export const removeClassAttr = (
    list: Element[] | HTMLCollection | NodeListOf<Element>,
    ...[cls = 'active', ...rest]: string[]
) => Array.from(list, item => item.classList.remove(cls, ...rest));
