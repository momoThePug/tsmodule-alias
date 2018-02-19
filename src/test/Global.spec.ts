import "ts-node";
import "mocha";
import { expect } from "chai";
import {Package} from "./../Global";

describe("Project package util", () => {
    const setTo = __dirname + "/fake/fakemodule/node_modules/foobar/src";
    beforeEach(function() {
    });
    afterEach(function() {
    });

    it("should resolve projectPackage", ()=>{
        expect(Package.projectPackage(setTo).indexOf("/tsmodule-alias/src/test/fake/fakemodule/package.json")>-1).to.be.true;
    });

    it("should resolve package root", ()=>{
        expect((Package.getRoot(setTo)).indexOf("/tsmodule-alias/src/test/fake/fakemodule") > -1).to.be.true;
    });

    it("should load package", ()=>{
        expect(Package.resolvePackageJSON(setTo)).to.not.be.null;
    });
});


