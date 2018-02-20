import { HashMap } from "./../type-definitions";
/**
 * Main Alias generator
 *
 * Load any strategy for alias generator
 */
export declare class HashMapGenerator implements IHashMapGenerator {
    private generator;
    /**
     * @param strategy generator name
     */
    private constructor();
    /**
     * @param strategy
     */
    private load(strategy);
    /**
     * @param strategy  Strategy name without "Generator" sufix
     * @param dataHelper any data to be passed and proccesed
     * @param dirname (optional) current working directory used to resolve dependencies and generator loading
     * @returns a hashmap with aliases and paths to be registered
     */
    static generate(strategy: string, dataHelper: any, packageData: HashMap<string, string>): HashMap<string, string>;
    /**
     * Invoke build operation to retrieve a hashmap of aliases
     * @param sourceName
     */
    build(dataHelper: any, data: any): HashMap<string, string>;
}
/**
 * interface needed to act like a generator
 */
export interface IHashMapGenerator {
    build(dataHelper: any, data: any): HashMap<string, string>;
}
