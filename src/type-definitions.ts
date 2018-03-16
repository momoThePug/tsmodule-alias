export const TS_CONFIG = "tsconfig.json";
/**
 * Data structure to wrap json data
 */
export class HashMap<K, V> implements IterableIterator<V> {
  /**
   * current item index when hashmap is iterated
   */
  private pointer: number = 0;

  /**
   * key set of hashmap
   */
  private keys: string[] = [];

  /**
   * json data to be traversed
   * @param myCollection if not passed any param then an empty json is set.
   */
  constructor(private myCollection: any = {}) {
    this.keys = Object.keys(myCollection);
  }

  /**
   * @param key identifier of value
   * @param value
   */
  add(key: K | string, value: V): HashMap<K, V> {
    this.myCollection[key] = value;
    this.keys.push("" + key);
    this.keys.sort();
    return this;
  }

  /**
   * @param key identifier of value
   */
  has(key: K): boolean {
    return this.keys.indexOf(key + "") > -1;
  }

  /**
   * @param key identifier of value
   */
  remove(key: K): void {
    const currentIndex: number = this.keys.indexOf(key + "");
    delete this.keys[currentIndex];
    delete this.myCollection[key];
  }

  /**
   *
   */
  isEmpty(): boolean {
    return this.myCollection.length === 0;
  }

  /**
   *
   */
  size(): number {
    return this.myCollection.length;
  }

  /**
   *
   * @param json collection of key:value to be merged
   */
  addAll(json: any): HashMap<K, V> {
    for (let alias in json) {
      this.add(alias, json[alias]);
    }
    return this;
  }

  /**
   * @param key
   */
  get(key: K): V {
    return this.myCollection[key];
  }

  /**
   * initialize current map
   */
  removeAll(): void {
    delete this.keys;
    delete this.myCollection;
    this.myCollection = {};
    this.keys = [];
  }

  /**
   * foreach helper
   * @param callback (value, key, array ) => {}
   */
  each(
    callback: (value: V, key: K | string, array: V[]) => any,
    thisArg?: any
  ): void {
    for (let aliasIndex in this.myCollection) {
      const result = callback(
        this.myCollection[aliasIndex],
        aliasIndex,
        this.myCollection
      );
      if (typeof result !== "undefined" && result !== null) {
        return result;
      }
    }
  }

  /**
   * @returns key collection inside json object
   */
  keyset(): string[] {
    return this.keys;
  }

  /**
   * @param map
   */
  merge(map: HashMap<K, V>): HashMap<K, V> {
    this.addAll(map.getAll());
    return this;
  }

  /**
   * @returns json raw object
   */
  getAll() {
    return this.myCollection;
  }

  [Symbol.iterator](): IterableIterator<V> {
    return this;
  }

  public next(): IteratorResult<V> {
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

/**
 * provides operatons to find any file in a given root
 */
export interface IFileFinder {
  find(file: string, startPath: string): string;
}
