"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const Global_1 = require("./../Global");
const parent_file_finder_1 = require("./../vendor/duffman/parent-file-finder");
describe("Project package util", () => {
    const setTo = __dirname + "/fake/fakemodule/node_modules/scope/foobar/src";
    beforeEach(function () {
    });
    afterEach(function () {
    });
    it("Should find parent result", () => {
        chai_1.expect(parent_file_finder_1.ParentFileFinder.findFile(setTo, "package.json", 1).result.indexOf("/tsmodule-alias/src/test/fake/fakemodule") > -1).to.be.true;
    });
    it("should resolve package root", () => {
        chai_1.expect((Global_1.Package.findImplementorRoot(setTo).result).indexOf("/tsmodule-alias/src/test/fake/fakemodule") > -1).to.be.true;
    });
    it("should resolve projectPackage", () => {
        chai_1.expect(Global_1.Package.projectPackage(setTo).indexOf("/tsmodule-alias/src/test/fake/fakemodule/package.json") > -1).to.be.true;
    });
    it("should load package", () => {
        chai_1.expect(Global_1.Package.resolvePackageJSON(setTo)).to.not.be.null;
    });
});
