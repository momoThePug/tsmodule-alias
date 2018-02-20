"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const TSModuleAlias = require("./../tsmodule-alias");
const tsconfigToReadFromRoot = "./";
const modInNodeModules = __dirname + "/fake/fakemodule/node_modules/foobar/src";
describe("NPM MODULE TSModuleAlias", () => {
    it("Should load alias for node requirejs", () => {
        chai_1.expect(TSModuleAlias.play(tsconfigToReadFromRoot, modInNodeModules)).to.not
            .be.null;
        const momoPug = require("@other");
        chai_1.expect(momoPug).to.not.be.null;
        chai_1.expect(momoPug.momo).to.be.equals("pug");
    });
});
