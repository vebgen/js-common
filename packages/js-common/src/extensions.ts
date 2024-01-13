type TypeToExtensionType = (mimeType: string) => (string | undefined);

/**
 * The extension for a file with certain content.
 *
 * @param mimeType the type of the file.
 */
export const typeToExtension: TypeToExtensionType = (mimeType: string) => {
    let extension: string | undefined = undefined;
    if (mimeType === 'text/csv') {
        extension = 'csv';
    } else if (mimeType === 'application/json') {
        extension = 'json';
    } else if (mimeType === 'application/pdf') {
        extension = 'pdf';
    } else if (mimeType === 'application/xml') {
        extension = 'cgxml';
    } else if (mimeType === 'text/yaml') {
        extension = 'yaml';
    } else if (mimeType.includes('spreadsheetml')) {
        extension = 'xlsx';
    } else if (mimeType === 'image/x-dxf') {
        extension = 'dxf';
    } else if (mimeType === 'application/vnd.google-earth.kmz') {
        extension = 'kmz';
    } else if (mimeType === 'application/vnd.google-earth.kml') {
        extension = 'kml';
    } else if (mimeType === 'application/vnd.esri.shp') {
        extension = 'shp.zip';
    }
    return extension;
}
