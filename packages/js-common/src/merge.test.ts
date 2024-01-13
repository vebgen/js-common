import { mergeDeep } from "./merge";

it('both empty objects', () => {
    expect(mergeDeep({}, {})).toStrictEqual({});
});
it('first empty object', () => {
    expect(mergeDeep({}, { a: 1 })).toStrictEqual({ a: 1 });
});
it('second empty object', () => {
    expect(mergeDeep({ a: 1 }, {})).toStrictEqual({ a: 1 });
});
it('both being equal', () => {
    expect(mergeDeep({ a: 1 }, { a: 1 })).toStrictEqual({ a: 1 });
});
it('both being different', () => {
    expect(mergeDeep({ a: 1 }, { b: 2 })).toStrictEqual({ a: 1, b: 2 });
});
it('override', () => {
    expect(mergeDeep({ a: 1 }, { a: 2 })).toStrictEqual({ a: 2 });
});
it('deep nesting', () => {
    expect(mergeDeep({
        a: {
            b: {
                c: [1, 2, 3],
            },
            d: "xyz"
        },
        e: {},
        f: 1456,
    }, {
        x: {
            y: {
                z: "fix"
            }
        },
        k: [789]
    })).toStrictEqual({
        a: {
            b: {
                c: [1, 2, 3],
            },
            d: "xyz",
        },
        e: {},
        f: 1456,
        k: [789, ],
        x: {
            y: {
                z: "fix",
            },
        },
    });
});
