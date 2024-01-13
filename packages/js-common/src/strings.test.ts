import { formatString } from "./strings";

it('both empty objects', () => {
    expect(formatString("", {})).toStrictEqual("");
});
it('throws if key is missing', () => {
    expect(() => formatString("{key}", {}, true)).toThrow();
});
it("doesn't trow if key is missing by default", () => {
    expect(() => formatString("{key}", {})).not.toThrow();
});
it("replaces the parameters with values", () => {
    expect(formatString("{key1} {key2}", {
        key1: "value",
        key2: 23,
    })).toStrictEqual("value 23");
});
