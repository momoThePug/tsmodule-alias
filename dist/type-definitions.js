"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TS_CONFIG = "tsconfig.json";
/**
 * Data structure to wrap json data
 */
class HashMap {
    /**
     * json data to be traversed
     * @param myCollection if not passed any param then an empty json is set.
     */
    constructor(myCollection = {}) {
        this.myCollection = myCollection;
        /**
         * current item index when hashmap is iterated
         */
        this.pointer = 0;
        /**
         * key set of hashmap
         */
        this.keys = [];
        this.keys = Object.keys(myCollection);
    }
    /**
     * @param key identifier of value
     * @param value
     */
    add(key, value) {
        this.myCollection[key] = value;
        this.keys.push("" + key);
        this.keys.sort();
        return this;
    }
    /**
     * @param key identifier of value
     */
    has(key) {
        return this.keys.indexOf(key + "") > -1;
    }
    /**
     * @param key identifier of value
     */
    remove(key) {
        const currentIndex = this.keys.indexOf(key + "");
        delete this.keys[currentIndex];
        delete this.myCollection[key];
    }
    /**
     *
     */
    isEmpty() {
        return this.myCollection.length === 0;
    }
    /**
     *
     */
    size() {
        return this.myCollection.length;
    }
    /**
     *
     * @param json collection of key:value to be merged
     */
    addAll(json) {
        for (let alias in json) {
            this.add(alias, json[alias]);
        }
        return this;
    }
    /**
     * @param key
     */
    get(key) {
        return this.myCollection[key];
    }
    /**
     * initialize current map
     */
    removeAll() {
        delete this.keys;
        delete this.myCollection;
        this.myCollection = {};
        this.keys = [];
    }
    /**
     * foreach helper
     * @param callback (value, key, array ) => {}
     */
    each(callback, thisArg) {
        for (let aliasIndex in this.myCollection) {
            const result = callback(this.myCollection[aliasIndex], aliasIndex, this.myCollection);
            if (typeof result !== "undefined" && result !== null) {
                return result;
            }
        }
    }
    /**
     * @returns key collection inside json object
     */
    keyset() {
        return this.keys;
    }
    /**
     * @param map
     */
    merge(map) {
        this.addAll(map.getAll());
        return this;
    }
    /**
     * @returns json raw object
     */
    getAll() {
        return this.myCollection;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        if (this.pointer < this.keys.length) {
            const newKey = this.keys[this.pointer++];
            return {
                done: false,
                value: this.myCollection[newKey]
            };
        }
        return {
            done: true,
            value: null
        };
    }
}
exports.HashMap = HashMap;
