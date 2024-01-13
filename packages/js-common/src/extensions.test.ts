import { typeToExtension } from "./extensions";


describe("typeToExtension", () => {
    it('deals with text/csv', () => {
        expect(typeToExtension("text/csv")).toBe("csv");
    });
    it('deals with application/json', () => {
        expect(typeToExtension("application/json")).toBe("json");
    });
    it('deals with application/jsonx', () => {
        expect(typeToExtension("application/jsonx")).toBe(undefined);
    });
});
