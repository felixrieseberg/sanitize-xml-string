const unsafe = /[\u{0000}-\u{0008}\u{D800}-\u{DFFF}\u{FFFE}-\u{FFFF}]/um;

/**
 * Sanitizes an input string for usage with XML.
 * Valid characters from https://www.w3.org/TR/xml11/#charsets
 * any Unicode character, excluding the surrogate blocks, FFFE, and FFFF.
 * [#x1-#xD7FF] | [#xE000-#xFFFD] | [#x10000-#x10FFFF]
 *
 * @export
 * @param {string} [input='']
 * @param {string} [replacement='']
 * @returns {string}
 */
export function sanitize(input: string = '', replacement: string = ''): string {
  return input.replace(unsafe, replacement);
}

/**
 * Validates an input string for usage with xml.
 *
 * @export
 * @param {string} input
 * @returns {boolean}
 */
export function validate(input: string): boolean {
  return sanitize(input).length === input.length;
}
