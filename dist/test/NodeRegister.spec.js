"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const rtrim = require("rtrim");
let result = "";
const type_definitions_1 = require("./../type-definitions");
const testHelper = require("./Util");
// testHelper
describe("AliasPathUtil", () => {
    beforeEach(function () { });
    afterEach(function () { });
    it("Should detect alias inside path", () => {
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("@mypath/hello/world/*", "@mypath/*")).to.be.true;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("@mypath/hello/world", "@mypath/*")).to.be.true;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("@mypath/hello/world", "@mypath")).to.be.true;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("foobars/hello/world", "@mypath")).to.be
            .false;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("@_mypath/hello/world", "@mypath")).to.be
            .false;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("@_mypath/hello/world", "")).to.be.false;
        chai_1.expect(type_definitions_1.AliasPathUtil.hasAlias("", "")).to.be.false;
    });
    it("Should normalize rightside of aliased paths", () => {
        result = type_definitions_1.AliasPathUtil.normalizeRightSide("@mypath/hello/world", testHelper.alias);
        chai_1.expect(result).to.be.equals("/hello/world");
    });
    it("Should normalize alias of aliased paths", () => {
        chai_1.expect(type_definitions_1.AliasPathUtil.normalizeAlias("/hello/world/")).to.be.equals("/hello/world");
        chai_1.expect(type_definitions_1.AliasPathUtil.normalizeAlias("/hello/world")).to.be.equals("/hello/world");
    });
    it("Should build paths", () => {
        chai_1.expect(type_definitions_1.AliasPathUtil.buildPath("@mypath/hello/world", testHelper.alias, testHelper.aliaspath)).to.be.equals(testHelper.aliaspath + "/hello/world");
    });
    it("Should build a new path from aliasing", () => {
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("@mypath/hello/world", testHelper.alias, testHelper.aliaspath);
        chai_1.expect(result).to.be.equals(testHelper.aliaspath + "/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("@mypath/hello/world", testHelper.alias, "." + testHelper.aliaspath);
        chai_1.expect(result).to.be.equals("." + testHelper.aliaspath + "/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("/@mypath/hello/world", testHelper.alias, testHelper.aliaspath);
        chai_1.expect(result).to.be.equals("/@mypath/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("mypath/hello/world", testHelper.alias, testHelper.aliaspath);
        chai_1.expect(result).to.be.equals("mypath/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("mypath/hello/world", "", testHelper.aliaspath);
        chai_1.expect(result).to.be.equals("mypath/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("mypath/hello/world", "", "");
        chai_1.expect(result).to.be.equals("mypath/hello/world");
        // ---
        result = type_definitions_1.AliasPathUtil.getAliasedPath("", "", "");
        chai_1.expect(result).to.be.equals("");
    });
});
describe("RegisterAlias", () => {
    const helperObject = testHelper.buildDependency();
    beforeEach(function () { });
    afterEach(function () { });
    it("It should verifyAliases", () => {
        let file = "/any/file/to/look/for";
        chai_1.expect(helperObject.registerAlias.verifyAliases("@fakes" + "/fakemodule")).to.be.equals(testHelper.paths["@fakes"] + "/fakemodule");
        chai_1.expect(helperObject.registerAlias.verifyAliases("@root" + file)).to.be.equals(testHelper.paths["@root"] + file);
        chai_1.expect(helperObject.registerAlias.verifyAliases("@includes" + file)).to.be.equals(testHelper.paths["@includes"] + file);
        chai_1.expect(helperObject.registerAlias.verifyAliases("@system" + file)).to.be.equals(rtrim(testHelper.paths["@system"], "/") + file);
        chai_1.expect(helperObject.registerAlias.verifyAliases("@notexists" + file)).to.be.equals("@notexists" + file);
        chai_1.expect(helperObject.registerAlias.verifyAliases("@includes" + file + "/")).to.be.equals(testHelper.paths["@includes"] + file + "/");
        chai_1.expect(helperObject.registerAlias.verifyAliases("/@includes" + file + "/")).to.be.equals("/@includes" + file + "/");
        chai_1.expect(helperObject.registerAlias.verifyAliases("")).to.be.equals("");
        chai_1.expect(helperObject.registerAlias.verifyAliases("../Generator/Generator")).to.be.equals("../Generator/Generator");
    });
});
