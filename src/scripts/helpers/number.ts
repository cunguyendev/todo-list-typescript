/**
 * Create a unique number
 */
export const createUniqueNumber = (): number => new Date().getTime();

/**
 * Convert to number type
 * @param numberInString The number with typeof is string
 */
export const toNumber = (numberInString: string): number => +numberInString;
