"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_definitions_1 = require("./../type-definitions");
require("ts-node");
require("mocha");
const chai_1 = require("chai");
describe("AliasCollection", () => {
    let collection = null;
    beforeEach(function () {
        collection = new type_definitions_1.HashMap({
            a: "1",
            b: "2",
            c: "3",
            d: "4"
        });
    });
    afterEach(function () { });
    it("Should iterate over our data", () => {
        chai_1.expect(collection.each((value, key) => {
            return "foobar";
        })).to.be.equals("foobar");
        chai_1.expect(collection.each((value, key) => {
            return;
        })).to.be.undefined;
        collection.each((value, key) => {
            chai_1.expect(value).to.oneOf(["1", "2", "3", "4"]);
            chai_1.expect(key).to.oneOf(["a", "b", "c", "d"]);
        });
    });
});
