/**
 * Capitalizes the first letter of a string.
 * @param str - The input string to capitalize
 * @returns The input string with its first letter capitalized, or the original string if empty
 * @example
 * capitalizeFirstLetter('hello') // returns 'Hello'
 * capitalizeFirstLetter('') // returns ''
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
