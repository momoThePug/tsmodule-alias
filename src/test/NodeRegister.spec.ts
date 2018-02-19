import "ts-node";
import "mocha";
import { expect } from "chai";
const rtrim = require("rtrim");
let result = ""; 
import {
  AliasPathUtil
} from "./../type-definitions";
const testHelper = require("./Util");


// testHelper
describe("AliasPathUtil", () => {
  beforeEach(function() {});
  afterEach(function() {});

  it("Should detect alias inside path", () => {
    expect(AliasPathUtil.hasAlias("@mypath/hello/world/*", "@mypath/*")).to.be.true;
    expect(AliasPathUtil.hasAlias("@mypath/hello/world", "@mypath/*")).to.be.true;
    expect(AliasPathUtil.hasAlias("@mypath/hello/world", "@mypath")).to.be.true;
    expect(AliasPathUtil.hasAlias("foobars/hello/world", "@mypath")).to.be
      .false;
    expect(AliasPathUtil.hasAlias("@_mypath/hello/world", "@mypath")).to.be
      .false;
    expect(AliasPathUtil.hasAlias("@_mypath/hello/world", "")).to.be.false;
    expect(AliasPathUtil.hasAlias("", "")).to.be.false;
  });

  it("Should normalize rightside of aliased paths", () => {
    result = AliasPathUtil.normalizeRightSide("@mypath/hello/world",testHelper.alias);
    expect(result).to.be.equals("/hello/world");
  });

  it("Should normalize alias of aliased paths", () => {
    expect(AliasPathUtil.normalizeAlias("/hello/world/")).to.be.equals(
      "/hello/world"
    );
    expect(AliasPathUtil.normalizeAlias("/hello/world")).to.be.equals(
      "/hello/world"
    );
  });

  it("Should build paths", () => {
    expect(
        AliasPathUtil.buildPath("@mypath/hello/world", testHelper.alias, testHelper.aliaspath)
    ).to.be.equals(testHelper.aliaspath + "/hello/world");
  });

  it("Should build a new path from aliasing", () => {
    // ---
    result = AliasPathUtil.getAliasedPath(
      "@mypath/hello/world",
      testHelper.alias,
      testHelper.aliaspath
    );
    expect(result).to.be.equals(testHelper.aliaspath + "/hello/world");
    // ---
    result = AliasPathUtil.getAliasedPath(
      "@mypath/hello/world",
      testHelper.alias,
      "." + testHelper.aliaspath
    );
    expect(result).to.be.equals("." + testHelper.aliaspath + "/hello/world");
    // ---
    result = AliasPathUtil.getAliasedPath(
      "/@mypath/hello/world",
      testHelper.alias,
      testHelper.aliaspath
    );
    expect(result).to.be.equals("/@mypath/hello/world");
    // ---
    result = AliasPathUtil.getAliasedPath(
      "mypath/hello/world",
      testHelper.alias,
      testHelper.aliaspath
    );
    expect(result).to.be.equals("mypath/hello/world");
    // ---
    result = AliasPathUtil.getAliasedPath("mypath/hello/world", "", testHelper.aliaspath);
    expect(result).to.be.equals("mypath/hello/world");

    // ---
    result = AliasPathUtil.getAliasedPath("mypath/hello/world", "", "");
    expect(result).to.be.equals("mypath/hello/world");

    // ---
    result = AliasPathUtil.getAliasedPath("", "", "");
    expect(result).to.be.equals("");
  });
});

describe("RegisterAlias", () => {
  const helperObject = testHelper.buildDependency();
    beforeEach(function() {});
    afterEach(function() {});
  
    it("It should verifyAliases", () => {
      let file = "/any/file/to/look/for";
      expect(helperObject.registerAlias.verifyAliases("@fakes" + "/fakemodule")).to.be.equals(
          testHelper.paths["@fakes"] + "/fakemodule"
      );
      expect(helperObject.registerAlias.verifyAliases("@root" + file)).to.be.equals(
          testHelper.paths["@root"] + file
      );
      expect(helperObject.registerAlias.verifyAliases("@includes" + file)).to.be.equals(
          testHelper.paths["@includes"] + file
      );
      expect(helperObject.registerAlias.verifyAliases("@system" + file)).to.be.equals(
        rtrim(testHelper.paths["@system"], "/") + file
      );
      expect(helperObject.registerAlias.verifyAliases("@notexists" + file)).to.be.equals(
        "@notexists" + file
      );
      expect(helperObject.registerAlias.verifyAliases("@includes" + file + "/")).to.be.equals(
          testHelper.paths["@includes"] + file + "/"
      );
      expect(helperObject.registerAlias.verifyAliases("/@includes" + file + "/")).to.be.equals(
        "/@includes" + file + "/"
      );
      expect(helperObject.registerAlias.verifyAliases("")).to.be.equals("");

      expect(
        helperObject.registerAlias.verifyAliases("../Generator/Generator")
    ).to.be.equals("../Generator/Generator");
    });
  
  });
