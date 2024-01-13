/**
 * Check if an object is a dictionary.
 *
 * @param item The object to check.
 * @returns True if the object is a dictionary, false otherwise.
 */
export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
};


/**
 * Merge the content of two objects into a new object.
 *
 * @param first The object to merge into.
 * @param second The object to merge from.
 * @returns A new object with the merged content.
 */
export function mergeDeep(first: Record<any, any>, second: Record<any, any>) {
    const output = Object.assign({}, first);
    if (isObject(first) && isObject(second)) {
        Object.keys(second).forEach(key => {
            if (isObject(second[key])) {
                if (!(key in first))
                    Object.assign(output, { [key]: second[key] });
                else
                    output[key] = mergeDeep(first[key], second[key]);
            } else {
                Object.assign(output, { [key]: second[key] });
            }
        });
    }
    return output;
}
