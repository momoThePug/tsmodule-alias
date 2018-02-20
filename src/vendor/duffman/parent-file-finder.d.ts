export declare class FileFindResult {
    private _fileFound;
    private _path;
    private _result;
    constructor(_fileFound?: boolean, _path?: string, _result?: string);
    isFound: boolean;
    path: string;
    result: string;
}
export declare class ParentFileFinder {
    static buildPathStack(sep: string, startPath: string): string[];
    /**
     * Slice n number of places
     * @param currentPath
     * @param places
     */
    static ignorePlaces(currentPath: string, places: number): string;
    /**
     * File finder which traverses parent directories
     * until a given filename is found.
     * @param startPath
     * @param filename
     * @returns {FileFindResult}
     */
    static findFile(startPath: string, filename: string, ignorePlaces?: number): FileFindResult;
}
