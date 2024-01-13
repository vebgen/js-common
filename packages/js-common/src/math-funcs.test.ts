import { byteToHex } from "./math-funcs";

describe("byte-to-hex", () => {
    it('convert 0 to 00', () => {
        expect(byteToHex(0)).toBe("00");
    });
    it('convert 1 to 01', () => {
        expect(byteToHex(1)).toBe("01");
    });
    it('convert 16 to 10', () => {
        expect(byteToHex(16)).toBe("10");
    });
    it('convert 256 to 100', () => {
        expect(byteToHex(256)).toBe("100");
    });
});
