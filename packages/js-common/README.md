# js-common

Common TypeScript/JavaScript utilities that found no other home.

Following functions are available:

- `storageAvailable`: check if local storage is available;
- `byteToHex`: convert a byte to a hex string of length 2;
- `rgbToHex`: convert an RGB color to a hex string with a `#` prefix;
- `isObject`: check if a value is an object;
- `mergeDeep`: merge two objects recursively.

Following types are available:

- `Writeable`: the new type will have all the properties of the input
  type writeable (removes the ReadOnly attribute).

## Running unit tests

Run `nx test js-common` to execute the unit tests via [Jest](https://jestjs.io).
