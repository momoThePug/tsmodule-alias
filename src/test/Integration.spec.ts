import "ts-node";
import "mocha";
import { expect } from "chai";
const rtrim = require("rtrim");
let result = "";

const testHelper = require("./Util");

describe("NodeRegister", () => {
  let register;

  beforeEach(function() {
    register = testHelper.buildNodeRegister(testHelper.paths);
  });
  afterEach(function() {
    register.reset();
  });

  it("Should stop && resolve alias resolution", () => {
    const fakedMod2 = require("@fakes/moredeeply/fakemodule2");
    expect(fakedMod2).not.to.be.null;
    expect(fakedMod2.plus).to.be.equals("viral");
  });
/*
  it("Should disable alias", () => {
    register.reset();
    expect(require("@fakes/moredeeply/fakemodule31")).to.be.null;
  });*/

  it(" Should load a faked module ", () => {
    const fakedMod = require("./fake/fakemodule");
    expect(fakedMod).not.to.be.null;
    expect(fakedMod.foo).to.be.equals("bar");

    const fakedMod2 = require("@fakes/moredeeply/fakemodule2");
    expect(fakedMod2).not.to.be.null;
    expect(fakedMod2.plus).to.be.equals("viral");

    let fakedMod3 = null;
    try {
      fakedMod3 = require("@fakes___x/moredeeply/fakemodule3");
    } catch (e) {}
    expect(fakedMod3).to.be.null;
  });
});

describe("NODE CONTEXT", () => {
  let helperObject;
  let fakedMod2;

  beforeEach(function() {
    helperObject = testHelper.buildDependency();
    fakedMod2 = require("@fakes/moredeeply/fakemodule2");
  });
  afterEach(function() {
  });

  it("Should verify if a module exists", () => {
    expect(helperObject.nodeContext.hasNodeModule("<sasasasaasasasass")).to.be
      .false;
    expect(
      helperObject.nodeContext.hasNodeModule("@fakes/moredeeply/fakemodule2")
    ).to.not.be.false;
  });

  it("Should remove a module", () => {
    expect(
      helperObject.nodeContext.removeCachedNodeModule("<sasasasaasasasass")
    ).to.be.false;
    expect(
      helperObject.nodeContext.removeCachedNodeModule(
        "@fakes/moredeeply/fakemodule2"
      )
    ).to.be.true;
  });
});
