export { storageAvailable } from './local-storage';
export { byteToHex } from './math-funcs';
export { rgbToHex } from './colors';
export { isObject, mergeDeep } from './merge';

/**
 * Makes all properties of an object writeable.
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
