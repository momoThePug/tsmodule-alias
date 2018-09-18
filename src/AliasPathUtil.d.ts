export declare const FILE_ENCODING = "UTF-8";
/**
 * Helpers to resolve Path alias format and normalization
 */
export declare class AliasPathUtil {
    /**
     * @param path nodejs request
     * @param alias to verify
     * @returns true if an alias is inside nodejs request otherwise false
     */
    static hasAlias(path: string, alias: string): boolean;
    /**
     * Alias is replaced by its value if is defined inside a request
     * @param request
     * @param alias
     * @param aliasPath
     */
    static getAliasedPath(request: string, alias: string, aliasPath: string): string;
    /**
     * Alias is replaced by its value if is defined inside a request
     *
     * @param request
     * @param alias
     * @param aliasPath
     */
    static buildPath(request: string, alias: string, aliasPath: string): string;
    /**
     * Removes alias inside nodejs require request
     * @param path
     * @param alias
     *
     * @example
     * require('@foobar/any/mod') => require('/any/mod')
     */
    static normalizeRightSide(path: string, alias: string): string;
    /**
     * Removes the trailing "*" from a string (if any)
     * @param path
     * @returns {string}
     */
    static stripWildcard(path: string): string;
    /**
     * Removes trailing slash
     * @param aliasPath value of alias:
     *
     * @example
     *  aliasPath =  {
     *      alias : aliasPath
     *    }
     */
    static normalizeAlias(aliasPath: string): string;
    /**
     * Find any directory using a file name as needle.
     *
     * @param startScanFrom base directory to start searching
     * @param fileToSearchFor the needle to look for
     * @param maxTry  max number of iterations
     * @return object with indexes:
     *  file: (string) the needle with directory prepended
     *  directory: (string) current directory found
     *  fileExists: (boolen) true if directory is found otherwise false
     */
    static findFileDirectory(startScanFrom: string, fileToSearchFor: string, maxTry?: number): {
        file: string;
        directory: string;
        fileExists: boolean;
    };
    /**
     * Extracts a string from a base string.
     * @param base  string which will be looked for
     * @param stripFrom  string to be removed from the base
     * @param stripStartsWith characters to be stripped out from the resulting string
     */
    static diffString(base: string, stripFrom: string, stripStartsWith?: string): string;
    /**
     * Find typescript config path, if your class is  invoking
     * momotThePug's module in a linear directory back slashes.
     * @param startScanFrom usually __dirname value is passed
     * @param rootProjectFile file that marks a directory as root
     * @param tsconfigFile tsconfig file that marks as typescript project
     */
    static findTSConfigToReadFromRoot(startScanFrom: string, rootPath?: any, tsconfigFile?: string): {
        diff: string;
        ts: {
            file: string;
            directory: string;
            fileExists: boolean;
        };
    };
}
