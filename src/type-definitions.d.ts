export declare const FILE_ENCODING = "UTF-8";
export declare const TS_CONFIG = "tsconfig.json";
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
/**
 * Data structure to wrap json data
 */
export declare class HashMap<K, V> implements IterableIterator<V> {
    private myCollection;
    /**
     * current item index when hashmap is iterated
     */
    private pointer;
    /**
     * key set of hashmap
     */
    private keys;
    /**
     * json data to be traversed
     * @param myCollection if not passed any param then an empty json is set.
     */
    constructor(myCollection?: any);
    /**
     * @param key identifier of value
     * @param value
     */
    add(key: K | string, value: V): HashMap<K, V>;
    /**
     * @param key identifier of value
     */
    has(key: K): boolean;
    /**
     * @param key identifier of value
     */
    remove(key: K): void;
    /**
     *
     */
    isEmpty(): boolean;
    /**
     *
     */
    size(): number;
    /**
     *
     * @param json collection of key:value to be merged
     */
    addAll(json: any): HashMap<K, V>;
    /**
     * @param key
     */
    get(key: K): V;
    /**
     * initialize current map
     */
    removeAll(): void;
    /**
     * foreach helper
     * @param callback (value, key, array ) => {}
     */
    each(callback: (value: V, key: K | string, array: V[]) => any, thisArg?: any): void;
    /**
     * @returns key collection inside json object
     */
    keyset(): string[];
    /**
     * @param map
     */
    merge(map: HashMap<K, V>): HashMap<K, V>;
    /**
     * @returns json raw object
     */
    getAll(): any;
    [Symbol.iterator](): IterableIterator<V>;
    next(): IteratorResult<V>;
}
/**
 * provides operatons to find any file in a given root
 */
export interface IFileFinder {
    find(file: string, startPath: string): string;
}
