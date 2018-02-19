import { HashMapGenerator } from "./../Generator/Generator";
import "ts-node";
import "mocha";
import { expect } from "chai";

const setTo = __dirname + "/fake/fakemodule/node_modules/foobar/src";
const typescriptconfg = "tsconfig.json";
const fakegenerator = __dirname + "/fake/fake";

describe("Generator loader", () => {
  it("Should loads a fake generator", () => {
    const result = HashMapGenerator.generate(
      fakegenerator,
      typescriptconfg,
      setTo
    );
    expect(result).to.not.be.null;
    expect(result.get("foo")).to.not.be.null;
    expect(result.get("foo")).to.not.be.equals("bar");
    expect(result.get("foo")).to.be.equals("barez");
  });
});
