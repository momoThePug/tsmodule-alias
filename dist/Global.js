"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_definitions_1 = require("./type-definitions");
const nodePath = require("path");
const projectRoot = "../../../";
/**
 *
 */
class Package {
    /**
     *
     * @param dirname
     * @param options
     */
    static resolvePackageJSON(dirname, options = null) {
        const packagePath = Package.projectPackage(dirname, options);
        let npmPackage = null;
        try {
            npmPackage = require(packagePath);
        }
        catch (e) {
            // Do nothing
        }
        if (npmPackage === null || typeof npmPackage !== "object") {
            const resolutionData = {
                dirname: dirname,
                packagePath: packagePath
            };
            throw new Error("Unable to read " + JSON.stringify(resolutionData));
        }
        return npmPackage;
    }
    /**
     *
     * @param dirname
     * @param options
     */
    static getRoot(dirname, options = null) {
        if (options === null || typeof options === "string") {
            options = { base: options };
        }
        return nodePath.resolve(options.base || nodePath.join(dirname, projectRoot));
    }
    /**
     *
     * @param dirname
     * @param options
     */
    static projectPackage(dirname, options = null) {
        let base = Package.getRoot(dirname, options || {});
        return base.replace(/\/package\.json$/, "") + "/package.json";
    }
    /**
     *
     * @param dirname
     * @param options
     */
    static projectData(dirname = null, options = null) {
        if (dirname === null) {
            dirname = __dirname;
        }
        return new type_definitions_1.HashMap({
            package: Package.resolvePackageJSON(dirname, options),
            root: Package.getRoot(dirname, options)
        });
    }
    /**
     * verifies if a NODE Module exists
     * @param mod
     */
    static moduleExists(mod) {
        try {
            require(mod);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
exports.Package = Package;
