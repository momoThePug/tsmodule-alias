"use strict";
/*=--------------------------------------------------------------=

 TSPath - Typescript Path Resolver

 Author : Patrik Forsberg
 Email  : patrik.forsberg@coldmind.com
 GitHub : https://github.com/duffman

 I hope this piece of software brings joy into your life, makes
 you sleep better knowing that you are no longer in path hell!

 Use this software free of charge, the only thing I ask is that
 you obey to the terms stated in the license, i would also like
 you to keep the file header intact.

 Also, I would love to see you getting involved in the project!

 Enjoy!

 This software is subject to the LGPL v2 License, please find
 the full license attached in LICENCE.md

 =---------------------------------------------------------------=

 Json Comment Stripper

 Simple Parser used to strip block and line comments form a
 JSON formatted string.

 Worth knowing: The parser treat " and ' the same, so it´s
 possible to start a string with " and end it with '

 This file is part of the TypeScript Path Igniter Project:
 https://github.com/duffman/ts-path-igniter

 Author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 Date: 2017-09-02

 =---------------------------------------------------------------= */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils_1 = require("./utils");
class FileFindResult {
    constructor(_fileFound = false, _path = "", _result = "") {
        this._fileFound = _fileFound;
        this._path = _path;
        this._result = _result;
    }
    get isFound() {
        return this._fileFound;
    }
    get path() {
        return this._path;
    }
    get result() {
        return this._result;
    }
    set isFound(isFound) {
        this._fileFound = isFound;
    }
    set path(path) {
        this._path = path;
    }
    set result(result) {
        this._result = result;
    }
}
exports.FileFindResult = FileFindResult;
class ParentFileFinder {
    static buildPathStack(sep, startPath) {
        let tmpStr = sep;
        let parts = startPath.split(sep);
        for (let i = 0; i < parts.length; i++) {
            tmpStr = path.resolve(tmpStr, parts[i]);
            tmpStr = utils_1.Utils.ensureTrailingPathDelimiter(tmpStr);
            parts[i] = tmpStr;
        }
        return parts;
    }
    /**
     * Slice n number of places
     * @param currentPath
     * @param places
     */
    static ignorePlaces(currentPath, places) {
        for (let i = 1; i <= places; i++) {
            currentPath = path.dirname(currentPath);
        }
        return currentPath;
    }
    /**
     * File finder which traverses parent directories
     * until a given filename is found.
     * @param startPath
     * @param filename
     * @returns {FileFindResult}
     */
    static findFile(startPath, filename, ignorePlaces = 0) {
        let result = new FileFindResult();
        startPath = ParentFileFinder.ignorePlaces(startPath, ignorePlaces);
        let parts = ParentFileFinder.buildPathStack(path.sep, startPath);
        for (let i = parts.length - 1; i > 0; i--) {
            let tmpStr = parts[i];
            let tmpfilename = path.resolve(tmpStr, filename);
            if (fs.existsSync(tmpfilename)) {
                result.isFound = true;
                result.path = tmpStr;
                result.result = tmpfilename;
                break;
            }
        }
        return result;
    }
}
exports.ParentFileFinder = ParentFileFinder;
