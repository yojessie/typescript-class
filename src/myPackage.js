// sample functions below

// @ts-check
/**
 * Describe about this function
 * @param {object} config
 * @param {string} config.url
 * @returns string
 */

export function init(config) {
  console.log(config.url);
}

/**
 * describe somthing
 * @param {number} code
 * @returns number
 */

export function exit(code) {
  console.log(code + 1);
}
