export const FILE_ENCODING = "UTF-8";
const nodePath = require("path");
const rtrim = require("rtrim");

/**
 * Helpers to resolve Path alias format and normalization
 */
export class AliasPathUtil {
  /**
   * @param path nodejs request
   * @param alias to verify
   * @returns true if an alias is inside nodejs request otherwise false
   */
  static hasAlias(path: string, alias: string) {
    alias = AliasPathUtil.stripWildcard(alias);
    if (!path) {
      return false;
    }
    const onlyAlias = path.length === alias.length;
    const hasSubdirectory =
      path[alias.length] === "/" || path[alias.length] === "\\";
    const containsAlias = path.indexOf(alias) === 0;
    return containsAlias && (onlyAlias || hasSubdirectory);
  }

  /**
   * Alias is replaced by its value if is defined inside a request
   * @param request
   * @param alias
   * @param aliasPath
   */
  static getAliasedPath(
    request: string,
    alias: string,
    aliasPath: string
  ): string {
    if (!AliasPathUtil.hasAlias(request, alias)) {
      return request;
    }
    return AliasPathUtil.buildPath(request, alias, aliasPath);
  }

  /**
   * Alias is replaced by its value if is defined inside a request
   *
   * @param request
   * @param alias
   * @param aliasPath
   */
  static buildPath(request: string, alias: string, aliasPath: string): string {
    const rightSide = AliasPathUtil.normalizeRightSide(request, alias);
    const normalizedAlias = AliasPathUtil.normalizeAlias(aliasPath);
    const result = nodePath.join(normalizedAlias, rightSide);
    return nodePath.normalize(result);
  }

  /**
   * Removes alias inside nodejs require request
   * @param path
   * @param alias
   *
   * @example
   * require('@foobar/any/mod') => require('/any/mod')
   */
  static normalizeRightSide(path: string, alias: string): string {
    alias = AliasPathUtil.stripWildcard(alias);
    return path.substr(alias.length);
  }

  /**
   * Removes the trailing "*" from a string (if any)
   * @param path
   * @returns {string}
   */
  static stripWildcard(path: string): string {
    if (path.endsWith("/*") || path.endsWith("\\*")) {
      path = path.substr(0, path.length - 2);
    }

    return path;
  }
  /**
   * Removes trailing slash
   * @param aliasPath value of alias:
   *
   * @example
   *  aliasPath =  {
   *      alias : aliasPath
   *    }
   */
  static normalizeAlias(aliasPath: string): string {
    aliasPath = AliasPathUtil.stripWildcard(aliasPath);
    if (aliasPath.endsWith("/") || aliasPath.endsWith("\\")) {
      aliasPath = aliasPath.substr(0, aliasPath.length - 1);
    }
    return aliasPath;
  }
}
