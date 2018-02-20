"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const TypescriptAliasGenerator = require("./../Generator/Typescript/TypescriptGenerator");
const type_definitions_1 = require("./../type-definitions");
const wheretoread = "./";
const objectToTest = new TypescriptAliasGenerator();
const rootdir = "./node_modules/";
const basePath = __dirname + "/fake/fakemodule";
const map = new type_definitions_1.HashMap({
    "root": basePath
});
const setTo = basePath + "/tsconfig.json";
describe("TypescriptAliasGenerator", () => {
    beforeEach(function () { });
    afterEach(function () { });
    function verify(resultsMap) {
        chai_1.expect(resultsMap.get("@mod")).to.be.equals("/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/morefake/level/");
        chai_1.expect(resultsMap.get("@path")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/momo/');
        chai_1.expect(resultsMap.get("@path2")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/momo');
        chai_1.expect(resultsMap.get("@path1")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/');
        chai_1.expect(resultsMap.get("@pat3")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/xd/momo/');
        chai_1.expect(resultsMap.get("@other")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/node_modules/momo/momo/00000/foooubar');
    }
    it(" should build an alias map", () => {
        const nodes = {
            "@mod": ["morefake/level/"],
            "@path": ["momo/"],
            "@path2": ["momo"],
            "@path1": ["momo/../"],
            "@pat3": ["./xd/momo/"],
            "@other": ["momo/momo/00000/foooubar"]
        };
        const resultsMap = objectToTest.buildAliasMap(rootdir, nodes, basePath);
        verify(resultsMap);
    });
    it(" should extract data from a typescript result", () => {
        const resultsMap = objectToTest.extractData(require(setTo), basePath);
        chai_1.expect(resultsMap.get("@mod")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/morefake/level/');
        chai_1.expect(resultsMap.get("@path")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/momo/');
        chai_1.expect(resultsMap.get("@other")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/momo/momo');
    });
    it(" should find a typescript config", () => {
        const resultsMap = objectToTest.build(wheretoread, map);
        chai_1.expect(resultsMap.get("@mod")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/morefake/level/');
        chai_1.expect(resultsMap.get("@path")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/momo/');
        chai_1.expect(resultsMap.get("@other")).to.be.equals('/home/dvera/Documentos/tsmodule-alias/src/test/fake/fakemodule/momo/momo');
    });
});
