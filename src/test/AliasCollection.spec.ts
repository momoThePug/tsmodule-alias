"use strict";

import { HashMap } from "./../type-definitions";
import "ts-node";
import "mocha";
import { expect } from "chai";

describe("AliasCollection", () => {
  let collection = null;
  beforeEach(function() {
    collection = new HashMap<string, string>({
      a: "1",
      b: "2",
      c: "3",
      d: "4"
    });
  });
  afterEach(function() {});

  it("Should iterate over our data", () => {

    expect(collection.each((value: string, key: string) => {
        return "foobar";
      })).to.be.equals("foobar");

    expect( collection.each((value: string, key: string) => {
        return;
    })).to.be.undefined;

    collection.each((value: string, key: string) => {
        expect(value).to.oneOf(["1","2","3","4"]);
        expect(key).to.oneOf(["a","b","c","d"]);
    });
  
  });
});
