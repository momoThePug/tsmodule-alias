import { HashMap } from "./type-definitions";
import {
  ParentFileFinder,
  FileFindResult
} from "./vendor/duffman/parent-file-finder";
const nodePath = require("path");
const packageFile = "package.json";
/**
 *
 */
export class Package {
  /**
   *
   * @param dirname
   * @param options
   */
  static resolvePackageJSON(dirname: string, options = null) {
    const packagePath = Package.projectPackage(dirname, options);
    let npmPackage = null;

    try {
      npmPackage = require(packagePath);
    } catch (e) {
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
  static findImplementorRoot(dirname: string): FileFindResult {
    const modulePkg: FileFindResult = ParentFileFinder.findFile(
      dirname,
      packageFile
    );

    if (!modulePkg.isFound) {
      throw Error("Cannot resolve module package");
    }
    const implementorPkg: FileFindResult = ParentFileFinder.findFile(
      modulePkg.path,
      packageFile,
      1
    );

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
  static projectPackage(dirname: string, options = null): string {
    let base = Package.findImplementorRoot(dirname);
    return base.result.replace(/\/package\.json$/, "") + "/package.json";
  }

  /**
   *
   * @param dirname
   * @param options
   */
  static projectData(
    dirname: string = null,
    options: any = null
  ): HashMap<string, string> {
    if (dirname === null) {
      dirname = __dirname;
    }
    return new HashMap<string, string>({
      package: Package.resolvePackageJSON(dirname, options),
      root: Package.findImplementorRoot(dirname).path
    });
  }

  /**
   * verifies if a NODE Module exists
   * @param mod
   */
  static moduleExists(mod: string): boolean {
    try {
      require(mod);
      return true;
    } catch (e) {
      return false;
    }
  }
}
