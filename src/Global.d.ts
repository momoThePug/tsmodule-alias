import { HashMap } from "./type-definitions";
import { FileFindResult } from "./vendor/duffman/parent-file-finder";
/**
 *
 */
export declare class Package {
    /**
     *
     * @param dirname
     * @param options
     */
    static resolvePackageJSON(dirname: string, options?: any): any;
    /**
     * Finds the implementation root and extracts its path.
     * This removes the needing of using ../../../ to find a super package file.
     * @param dirname
     */
    static findImplementorRoot(dirname: string): FileFindResult;
    /**
     *
     * @param dirname
     * @param options
     */
    static projectPackage(dirname: string, options?: any): string;
    /**
     *
     * @param dirname
     * @param options
     */
    static projectData(dirname?: string, options?: any): HashMap<string, string>;
    /**
     * verifies if a NODE Module exists
     * @param mod
     */
    static moduleExists(mod: string): boolean;
}
