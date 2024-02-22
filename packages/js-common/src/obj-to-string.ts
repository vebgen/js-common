
/**
 * Converts an object into a string.
 *
 * Functions are marked as `[Function]`.
 * Circular references are marked as `[Circular]`.
 */
export const objToString = (obj: any): string => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') {
            return '[Function]';
        }
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular]';
            }
            seen.add(value);
        }
        return value;
    }, 2);
};
