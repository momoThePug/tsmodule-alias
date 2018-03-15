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
}
