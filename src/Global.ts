import { HashMap } from "./type-definitions";
import {
  ParentFileFinder,
  FileFindResult
} from "./vendor/duffman/parent-file-finder";
const nodePath = require("path");
const projectRoot = "../../../../";

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
   *
   * @param dirname
   * @param options
   */
  static getRoot(dirname: string, options = null) {
    if (options === null || typeof options === "string") {
      options = { base: options };
    }
    return nodePath.resolve(
      options.base || nodePath.join(dirname, projectRoot)
    );
  }

  /**
   *
   * @param dirname
   * @param options
   */
  static projectPackage(dirname: string, options = null): string {
    let base = Package.getRoot(dirname, options || {});
    return base.replace(/\/package\.json$/, "") + "/package.json";
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
      root: Package.getRoot(dirname, options)
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
