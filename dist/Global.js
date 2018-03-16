"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_definitions_1 = require("./type-definitions");
const parent_file_finder_1 = require("./vendor/duffman/parent-file-finder");
const nodePath = require("path");
const packageFile = "package.json";
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
     * Finds the implementation root and extracts its path.
     * This removes the needing of using ../../../ to find a super package file.
     * @param dirname
     */
    static findImplementorRoot(dirname) {
        const modulePkg = parent_file_finder_1.ParentFileFinder.findFile(dirname, packageFile);
        if (!modulePkg.isFound) {
            throw Error("Cannot resolve module package");
        }
        const implementorPkg = parent_file_finder_1.ParentFileFinder.findFile(modulePkg.path, packageFile, 1);
        if (!implementorPkg.isFound) {
            throw Error("Cannot resolve implementor package");
        }
        return implementorPkg;
    }
    /**
     *
     * @param dirname
     * @param options
     */
    static projectPackage(dirname, options = null) {
        const base = Package.findImplementorRoot(dirname);
        const projectPath = base.result.replace(/[\\\/]package[\\\.]json$/, "");
        return nodePath.join(projectPath, "package.json");
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
            root: Package.findImplementorRoot(dirname).path
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
