"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator_1 = require("./../Generator/Generator");
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const setTo = __dirname + "/fake/fakemodule/node_modules/foobar/src";
const typescriptconfg = "tsconfig.json";
const fakegenerator = __dirname + "/fake/fake";
describe("Generator loader", () => {
    it("Should loads a fake generator", () => {
        const result = Generator_1.HashMapGenerator.generate(fakegenerator, typescriptconfg, setTo);
        chai_1.expect(result).to.not.be.null;
        chai_1.expect(result.get("foo")).to.not.be.null;
        chai_1.expect(result.get("foo")).to.not.be.equals("bar");
        chai_1.expect(result.get("foo")).to.be.equals("barez");
    });
});
