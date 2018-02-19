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
    /**
     * File finder which traverses parent directories
     * until a given filename is found.
     * @param startPath
     * @param filename
     * @returns {FileFindResult}
     */
    static findFile(startPath: string, filename: string): FileFindResult;
}
