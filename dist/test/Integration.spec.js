"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const rtrim = require("rtrim");
let result = "";
const testHelper = require("./Util");
describe("NodeRegister", () => {
    let register;
    beforeEach(function () {
        register = testHelper.buildNodeRegister(testHelper.paths);
    });
    afterEach(function () {
        register.reset();
    });
    it("Should stop && resolve alias resolution", () => {
        const fakedMod2 = require("@fakes/moredeeply/fakemodule2");
        chai_1.expect(fakedMod2).not.to.be.null;
        chai_1.expect(fakedMod2.plus).to.be.equals("viral");
        const fakedMod3 = require("@foooovars/deep/moredeeply/fakemodule2");
        chai_1.expect(fakedMod3).not.to.be.null;
        chai_1.expect(fakedMod3.plus).to.be.equals("viral");
    });
    /*
      it("Should disable alias", () => {
        register.reset();
        expect(require("@fakes/moredeeply/fakemodule31")).to.be.null;
      });*/
    it(" Should load a faked module ", () => {
        const fakedMod = require("./fake/fakemodule");
        chai_1.expect(fakedMod).not.to.be.null;
        chai_1.expect(fakedMod.foo).to.be.equals("bar");
        const fakedMod2 = require("@fakes/moredeeply/fakemodule2");
        chai_1.expect(fakedMod2).not.to.be.null;
        chai_1.expect(fakedMod2.plus).to.be.equals("viral");
        let fakedMod3 = null;
        try {
            fakedMod3 = require("@fakes___x/moredeeply/fakemodule3");
        }
        catch (e) { }
        chai_1.expect(fakedMod3).to.be.null;
    });
});
describe("NODE CONTEXT", () => {
    let helperObject;
    let fakedMod2;
    beforeEach(function () {
        helperObject = testHelper.buildDependency();
        fakedMod2 = require("@fakes/moredeeply/fakemodule2");
    });
    afterEach(function () {
    });
    it("Should verify if a module exists", () => {
        chai_1.expect(helperObject.nodeContext.hasNodeModule("<sasasasaasasasass")).to.be
            .false;
        chai_1.expect(helperObject.nodeContext.hasNodeModule("@fakes/moredeeply/fakemodule2")).to.not.be.false;
    });
    it("Should remove a module", () => {
        chai_1.expect(helperObject.nodeContext.removeCachedNodeModule("<sasasasaasasasass")).to.be.false;
        chai_1.expect(helperObject.nodeContext.removeCachedNodeModule("@fakes/moredeeply/fakemodule2")).to.be.true;
    });
});
