import { storageAvailable } from "./local-storage";


describe("storage available", () => {
    it('should return true when available using default parameter', () => {
        expect(storageAvailable()).toBeTruthy();
    });
    it('should return true when available using explicit parameter', () => {
        expect(storageAvailable('localStorage')).toBeTruthy();
    });
});
