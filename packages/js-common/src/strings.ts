
/**
 * Replace all occurrences of {key} in a string with the value of the key
 * in the params object.
 *
 * @param format The string to format
 * @param params The parameters to replace
 * @param throwOnMissing If true, throw an error if a key is missing from params
 * @returns The formatted string.
 */
export const formatString = (
    format: string,
    params: Record<string, string | number>,
    throwOnMissing = false
) => {
    return format.replace(/{(\w+)}/g, (match, key) => {
        const value = params[key];
        if (value !== undefined) {
            return String(value);
        } else if (throwOnMissing) {
            throw new Error(`Missing parameter ${key}`);
        } else {
            return match;
        }
    });
}
