/**
 * Returns the first element that matches the selector.
 *
 * @param {string} selector
 * @returns {JSX.Element}
 */
const $ = (selector) => document.querySelector(selector)

/**
 * Returns a list of elements that match the selector.
 *
 * @param {string} selector
 * @returns {JSX.Element[]}
 */
const $$ = (selector) => document.querySelectorAll(selector)

export { $, $$ }
