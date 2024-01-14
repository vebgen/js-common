import { snakeToCamel } from './snake-to-camel';

describe('utils', () => {
    describe("", () => {
        it("should convert snake_case to camelCase", () => {
            const result = snakeToCamel("snake_case");
            expect(result).toBe("snakeCase");
        });
        it("should convert TO_CAMEL to toCamel", () => {
            const result = snakeToCamel("TO_CAMEL");
            expect(result).toBe("toCamel");
        });
        it("should convert to-camel to toCamel", () => {
            const result = snakeToCamel("to-camel");
            expect(result).toBe("toCamel");
        });
    });
});
