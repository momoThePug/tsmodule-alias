import { HashMap } from "./type-definitions";
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
     *
     * @param dirname
     * @param options
     */
    static getRoot(dirname: string, options?: any): any;
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
}
