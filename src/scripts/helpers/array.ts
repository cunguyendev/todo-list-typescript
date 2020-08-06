/* eslint-disable no-return-assign */
/**
 * Check is object or not
 * @param value
 */
export const isObject = (value: unknown): boolean => value && typeof value === 'object' && value.constructor === Object;

/**
 *
 * @param object
 */
export const toArray = (object: object): unknown => {
  if (object) {
    if (isObject(object)) {
      const data = [];
      Object.keys(object).map((key) => (data[key] = object[key]));

      return data;
    }

    if (typeof object === 'string') {
      return [];
    }

    return object;
  }
  return [];
};
