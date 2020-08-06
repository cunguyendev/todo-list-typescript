/**
 * Short hand for querySelector
 * @param selector Used to query the DOM element
 */
export const qs = (selector: string): Element => document.querySelector(selector);

/**
 * Short hand for querySelectorAll
 * @param selector Used to query the DOM element
 */
export const qsAll = (selector: string): NodeListOf<Element> => document.querySelectorAll(selector);
