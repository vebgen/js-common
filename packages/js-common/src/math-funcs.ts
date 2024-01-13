/**
 * Converts a single byte (0...255) to a string.
 * @param c The number to convert to hex representation
 * @returns 0-padded string
 */
export function byteToHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
