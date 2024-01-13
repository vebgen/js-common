import { rgbToHex } from "./colors";

describe("rgb-to-hex", () => {
    it('convert 0, 0, 0 to #000000', () => {
        expect(rgbToHex(0, 0, 0)).toBe("#000000");
    });
    it('convert 1, 5, 10 to #01050A', () => {
        expect(rgbToHex(1, 5, 10)).toBe("#01050A");
    });
    it('convert 64, 255, 128 to be #40FF80', () => {
        expect(rgbToHex(64, 255, 128)).toBe("#40FF80");
    });
    it('convert 255, 255, 255 to be #FFFFFF', () => {
        expect(rgbToHex(255, 255, 255)).toBe("#FFFFFF");
    });
});
