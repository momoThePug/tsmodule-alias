"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node");
require("mocha");
const chai_1 = require("chai");
const JSONUtils_1 = require("./../JSONUtils");
describe("JSON WRAPPER", () => {
    let reader;
    let wrapper;
    beforeEach(function () {
        reader = new JSONUtils_1.JsonReader("test/fake/config", true);
        wrapper = reader.readFile();
    });
    afterEach(function () { });
    it("deberia encontrar una version del indice", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        const content = wrapper.seek("foo", "", wrapper.haystack);
        chai_1.expect(content).to.be.not.null;
        chai_1.expect(content["dev"]).to.be.equal("bar");
        chai_1.expect(wrapper.seek("not__exits_foo", "", wrapper.haystack)).to.be.null;
        chai_1.expect(wrapper.seek("foo", "dev", wrapper.haystack)).to.be.equal("bar");
    });
    it("deberia encontrar una version del indice usando el predeterminado", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        const content = wrapper.read("foo", "dev");
        chai_1.expect(content).to.be.equal("bar");
    });
    it("deberia leer en cadena una version", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        let content = wrapper.readCycl("foo>version>v2>b");
        chai_1.expect(content).to.be.equal("bbb2");
        content = wrapper.readCycl("microservices>API2", "dev");
        chai_1.expect(content).to.contain({ foo: "bar" });
    });
    it("find parent", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        const content = wrapper.findParent("microservices", wrapper.haystack);
        chai_1.expect(content).to.contains.keys("API1");
    });
    it("find parent cycl", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        const content = wrapper.findParentCycl("microservices>APIxxx>dev>c", wrapper.haystack);
        chai_1.expect(content).to.contains.keys("fooc");
    });
    it("adv find attr", () => {
        chai_1.expect(wrapper.haystack).to.be.not.null;
        let content = wrapper.findByAttr("listarpaises", wrapper.haystack["microservices"]["routes"]);
        chai_1.expect(content).to.contains.keys("route");
        content = wrapper.findByAttr("API1");
        chai_1.expect(content).to.contains.keys("dev");
        content = wrapper.readCycl("microservices>routes");
        chai_1.expect(content).to.not.be.undefined;
        const result = wrapper.findByAttr("listarpaises", content);
        chai_1.expect(result).to.contains.keys("route");
        chai_1.expect(result["parent"]).to.be.not.null;
    });
    it("Deberia abstraer un objeto JSON con JSONType", () => {
        const xjson = {
            foo: "daa",
            bar: "eeer",
            foobare: "wre",
            goob: "cvb"
        };
        const jt = new JSONUtils_1.JSONType(xjson);
        chai_1.expect(jt.get("noexisat")).to.be.null;
        chai_1.expect(jt.get("bar")).to.be.equals("eeer");
        jt.put("111", "222");
        chai_1.expect(jt.get("111")).to.be.equals("222");
    });
});
