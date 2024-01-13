import { byteToHex } from "./math-funcs";

/**
 * Creates a hex representation of the color suitable for css use.
 *
 * @param r Red value
 * @param g Green value
 * @param b Blue value
 * @returns A hex representation of the color.
 */
export function rgbToHex(r: number, g: number, b: number) {
    return `#${byteToHex(r)}${byteToHex(g)}${byteToHex(b)}`.toUpperCase();
}
