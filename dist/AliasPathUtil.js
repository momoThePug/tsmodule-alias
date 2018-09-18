"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("./Global");
exports.FILE_ENCODING = "UTF-8";
const nodePath = require("path");
const rtrim = require("rtrim");
const fs = require('fs');
/**
 * Helpers to resolve Path alias format and normalization
 */
class AliasPathUtil {
    /**
     * @param path nodejs request
     * @param alias to verify
     * @returns true if an alias is inside nodejs request otherwise false
     */
    static hasAlias(path, alias) {
        alias = AliasPathUtil.stripWildcard(alias);
        if (!path) {
            return false;
        }
        const onlyAlias = path.length === alias.length;
        const hasSubdirectory = path[alias.length] === "/" || path[alias.length] === "\\";
        const containsAlias = path.indexOf(alias) === 0;
        return containsAlias && (onlyAlias || hasSubdirectory);
    }
    /**
     * Alias is replaced by its value if is defined inside a request
     * @param request
     * @param alias
     * @param aliasPath
     */
    static getAliasedPath(request, alias, aliasPath) {
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
    static buildPath(request, alias, aliasPath) {
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
    static normalizeRightSide(path, alias) {
        alias = AliasPathUtil.stripWildcard(alias);
        return path.substr(alias.length);
    }
    /**
     * Removes the trailing "*" from a string (if any)
     * @param path
     * @returns {string}
     */
    static stripWildcard(path) {
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
    static normalizeAlias(aliasPath) {
        aliasPath = AliasPathUtil.stripWildcard(aliasPath);
        if (aliasPath.endsWith("/") || aliasPath.endsWith("\\")) {
            aliasPath = aliasPath.substr(0, aliasPath.length - 1);
        }
        return aliasPath;
    }
    /**
     * Find any directory using a file name as needle.
     *
     * @param startScanFrom base directory to start searching
     * @param fileToSearchFor the needle to look for
     * @param maxTry  max number of iterations
     * @return object with indexes:
     *  file: (string) the needle with directory prepended
     *  directory: (string) current directory found
     *  fileExists: (boolen) true if directory is found otherwise false
     */
    static findFileDirectory(startScanFrom, fileToSearchFor, maxTry = 10) {
        let file = "";
        let directory = startScanFrom;
        let maxNum = 0;
        let fileExists = false;
        do {
            directory = nodePath.normalize(directory + "/..");
            file = nodePath.join(directory, fileToSearchFor);
            fileExists = fs.existsSync(file);
            maxNum++;
        } while (!fileExists && maxNum < maxTry);
        return {
            file: file,
            directory: directory,
            fileExists: fileExists
        };
    }
    /**
     * Extracts a string from a base string.
     * @param base  string which will be looked for
     * @param stripFrom  string to be removed from the base
     * @param stripStartsWith characters to be stripped out from the resulting string
     */
    static diffString(base, stripFrom, stripStartsWith = null) {
        const strResult = (base.slice(stripFrom.length, base.length));
        if (stripStartsWith) {
            return strResult.startsWith(stripStartsWith) ? strResult.slice(stripStartsWith.length, strResult.length) : strResult;
        }
        return strResult;
    }
    /**
     * Find typescript config path, if your class is  invoking
     * momotThePug's module in a linear directory back slashes.
     * @param startScanFrom usually __dirname value is passed
     * @param rootProjectFile file that marks a directory as root
     * @param tsconfigFile tsconfig file that marks as typescript project
     */
    static findTSConfigToReadFromRoot(startScanFrom, rootPath = null, tsconfigFile = "tsconfig.json") {
        const tsConfigFile = AliasPathUtil.findFileDirectory(startScanFrom, tsconfigFile);
        const _packageData = Global_1.Package.projectData(rootPath);
        if (tsConfigFile.fileExists) {
            return {
                diff: AliasPathUtil.diffString(tsConfigFile.directory, _packageData.get("root"), nodePath.sep),
                ts: tsConfigFile
            };
        }
        throw `Cannot find ${tsconfigFile}: \n tsConfigFile: ${JSON.stringify(tsConfigFile)} `;
    }
}
exports.AliasPathUtil = AliasPathUtil;
