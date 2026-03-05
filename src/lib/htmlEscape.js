/**
 * HTML Escaping — prevents XSS in server-generated email HTML templates.
 * Must be applied to every user-supplied value before interpolation.
 */

/**
 * Escapes a string for safe insertion into HTML content/attributes.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Escapes and converts newlines to <br> tags — for plain-text fields shown in email HTML.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtmlBlock(value) {
  return escapeHtml(value).replace(/\n/g, '<br>');
}
