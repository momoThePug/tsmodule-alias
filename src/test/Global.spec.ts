import "ts-node";
import "mocha";
import { expect } from "chai";
import { Package } from "./../Global";
import * as path from "path";
import {
  ParentFileFinder,
  FileFindResult
} from "./../vendor/duffman/parent-file-finder";

describe("Project package util", () => {
  const setTo = __dirname + "/fake/fakemodule/node_modules/scope/foobar/src";
  beforeEach(function() {});
  afterEach(function() {});

  it("Should find parent result", () => {
    expect(
      ParentFileFinder.findFile(setTo, "package.json", 1).result.indexOf(
        "/tsmodule-alias/src/test/fake/fakemodule"
      ) > -1
    ).to.be.true;
  });

  it("should resolve package root", () => {
    expect(
      Package.findImplementorRoot(setTo).result.indexOf(
        "/tsmodule-alias/src/test/fake/fakemodule"
      ) > -1
    ).to.be.true;
  });

  it("should resolve projectPackage", () => {
    expect(
      Package.projectPackage(setTo).indexOf(
        "/tsmodule-alias/src/test/fake/fakemodule/package.json"
      ) > -1
    ).to.be.true;
  });

  it("should load package", () => {
    expect(Package.resolvePackageJSON(setTo)).to.not.be.null;
  });
});
