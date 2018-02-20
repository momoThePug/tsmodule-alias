import "ts-node";
import "mocha";
import { expect } from "chai";
import { Package } from "./../Global";

const TSModuleAlias = require("./../tsmodule-alias");
const tsconfigToReadFromRoot = "./";
const modInNodeModules = __dirname + "/fake/fakemodule/node_modules/scope/foobar/src";

describe("NPM MODULE TSModuleAlias", () => {
  it("Should load alias for node requirejs", () => {
    expect(TSModuleAlias.play(tsconfigToReadFromRoot, modInNodeModules)).to.not
      .be.null;

    const momoPug = require("@other");
    expect(momoPug).to.not.be.null;
    expect(momoPug.momo).to.be.equals("pug");
  });

});
