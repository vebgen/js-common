import {
    compareAndStore, localCacheForCompareAndStore
} from "./compare-and-store";


jest.spyOn(global.console, "log").mockImplementation(() => { })
jest.spyOn(global.console, "group").mockImplementation(() => { })
afterEach(() => {
    (global.console.log as any).mockClear();
    (global.console.group as any).mockClear();
    delete localCacheForCompareAndStore.Xyz;
});


describe("compare and store", () => {
    it("should print nothing on first iteration", () => {
        compareAndStore("Xyz", {});
        expect(global.console.group).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render begins ============",
            "border: 1px grey solid"
        );
        expect(global.console.log).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render ends ============",
            "color: grey"
        );
    });
    it("should print nothing on same input", () => {
        compareAndStore("Xyz", {});
        compareAndStore("Xyz", {});
        expect(global.console.group).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render begins ============",
            "border: 1px grey solid"
        );
        expect(global.console.log).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render ends ============",
            "color: grey"
        );
        expect(global.console.group).toHaveBeenNthCalledWith(
            2, "%c========== Xyz render begins ============",
            "border: 1px grey solid"
        );
        expect(global.console.log).toHaveBeenNthCalledWith(
            2, "%c========== Xyz render ends ============",
            "color: grey"
        );
    });
    it("should print differences empty vs value", () => {
        compareAndStore("Xyz", {});
        compareAndStore("Xyz", { a: 2 });
        expect(global.console.group).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render begins ============",
            "border: 1px grey solid"
        );
        expect(global.console.log).toHaveBeenNthCalledWith(
            1, "%c========== Xyz initial render ends ============",
            "color: grey"
        );
        expect(global.console.group).toHaveBeenNthCalledWith(
            2, "%c========== Xyz render begins ============",
            "border: 1px grey solid"
        );
        expect(global.console.log).toHaveBeenNthCalledWith(
            2, "=== [%s] has changed from %O to %O", "a", undefined, 2);
        expect(global.console.log).toHaveBeenNthCalledWith(
            3, "%c========== Xyz render ends ============", "color: grey");
    });
});
