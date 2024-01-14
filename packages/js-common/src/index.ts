export { storageAvailable } from './local-storage';

export { byteToHex } from './math-funcs';

export { rgbToHex } from './colors';

export { isObject, mergeDeep } from './merge';

export { formatString } from "./strings";

export { objToString } from './obj-to-string';

export { snakeToCamel } from './snake-to-camel';

/**
 * Makes all properties of an object writeable.
 */
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
