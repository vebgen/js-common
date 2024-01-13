/**
 * Tests the environment to see if we can store things in local storage.
 *
 * @param type The kind of storage to check.
 * @returns true if available, false otherwise
 */
export function storageAvailable(type: string = 'localStorage') {
    let storage: any;
    try {
        storage = window[type as any];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        console.log("[storageAvailable] exception %O", e);
        return (
            e instanceof DOMException
            // everything except Firefox
            && (e.code === 22
                // Firefox
                || e.code === 1014
                // test name field too, because code might not be present
                // everything except Firefox
                || e.name === 'QuotaExceededError'
                // Firefox
                || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && storage
            && storage.length !== 0
        );
    }
};
