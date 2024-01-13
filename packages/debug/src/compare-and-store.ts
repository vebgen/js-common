export const localCacheForCompareAndStore: Record<string, any> = {};


/**
 * Prints what changes between calls for an object.
 *
 * @param componentName The name of the component
 *  (the key used to store the object between calls)
 * @param crt The object to compare
 */
export function compareAndStore(
    componentName: string, crt: Record<string, any>
) {
    let storeCompare = localCacheForCompareAndStore[componentName];
    if (storeCompare) {
        console.group(
            `%c========== ${componentName} render begins ============`,
            "border: 1px grey solid"
        );
        Object.keys(crt).forEach((itr: string) => {
            const crtVal: any = storeCompare[itr];
            const newValue: any = crt[itr];
            if (crtVal != newValue) {
                console.log(
                    "=== [%s] has changed from %O to %O",
                    itr, crtVal, newValue
                );
                storeCompare[itr] = newValue;
            }
        });
        console.log(
            `%c========== ${componentName} render ends ============`,
            "color: grey"
        );
        console.groupEnd();
    } else {
        console.group(
            `%c========== ${componentName} initial render begins ============`,
            "border: 1px grey solid"
        );
        storeCompare = {};
        localCacheForCompareAndStore[componentName] = storeCompare;
        Object.keys(crt).forEach((itr: string) => {
            const newValue: any = crt[itr];
            console.log("=== [%s] is %O", itr, newValue);
            storeCompare[itr] = newValue;
        })
        console.log(
            `%c========== ${componentName} initial render ends ============`,
            "color: grey"
        );
        console.groupEnd();
    }
    return storeCompare;
}
