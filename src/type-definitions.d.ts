export declare const FILE_ENCODING = "UTF-8";
export declare const TS_CONFIG = "tsconfig.json";
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
    get(key: K): void;
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
     * @returns json raw object
     */
    getAll(): any;
    [Symbol.iterator](): IterableIterator<V>;
    next(): IteratorResult<V>;
}
