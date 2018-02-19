import "ts-node";
import "mocha";
import { expect } from "chai";
import { JSONType, JsonReader } from "./../JSONUtils";

describe("JSON WRAPPER", () => {
  let reader: any;
  let wrapper: any;
  beforeEach(function() {
    reader = new JsonReader("test/fake/config", true);
    wrapper = reader.readFile();
  });

  afterEach(function() {});

  it("deberia encontrar una version del indice", () => {
    expect(wrapper.haystack).to.be.not.null;
    const content = wrapper.seek("foo", "", wrapper.haystack);
    expect(content).to.be.not.null;
    expect(content["dev"]).to.be.equal("bar");
    expect(wrapper.seek("not__exits_foo", "", wrapper.haystack)).to.be.null;
    expect(wrapper.seek("foo", "dev", wrapper.haystack)).to.be.equal("bar");
  });

  it("deberia encontrar una version del indice usando el predeterminado", () => {
    expect(wrapper.haystack).to.be.not.null;
    const content = wrapper.read("foo", "dev");
    expect(content).to.be.equal("bar");
  });

  it("deberia leer en cadena una version", () => {
    expect(wrapper.haystack).to.be.not.null;
    let content = wrapper.readCycl("foo>version>v2>b");
    expect(content).to.be.equal("bbb2");
    content = wrapper.readCycl("microservices>API2", "dev");
    expect(content).to.contain({ foo: "bar" });
  });

  it("find parent", () => {
    expect(wrapper.haystack).to.be.not.null;
    const content = wrapper.findParent("microservices", wrapper.haystack);
    expect(content).to.contains.keys("API1");
  });
  it("find parent cycl", () => {
    expect(wrapper.haystack).to.be.not.null;
    const content = wrapper.findParentCycl(
      "microservices>APIxxx>dev>c",
      wrapper.haystack
    );
    expect(content).to.contains.keys("fooc");
  });

  it("adv find attr", () => {
    expect(wrapper.haystack).to.be.not.null;
    let content = wrapper.findByAttr(
      "listarpaises",
      wrapper.haystack["microservices"]["routes"]
    );
    expect(content).to.contains.keys("route");
    content = wrapper.findByAttr("API1");
    expect(content).to.contains.keys("dev");
    content = wrapper.readCycl("microservices>routes");
    expect(content).to.not.be.undefined;
    const result = wrapper.findByAttr("listarpaises", content);
    expect(result).to.contains.keys("route");
    expect(result["parent"]).to.be.not.null;
  });

  it("Deberia abstraer un objeto JSON con JSONType", () => {
    const xjson = {
      foo: "daa",
      bar: "eeer",
      foobare: "wre",
      goob: "cvb"
    };
    const jt: JSONType<string, any> = new JSONType<string, any>(xjson);
    expect(jt.get("noexisat")).to.be.null;
    expect(jt.get("bar")).to.be.equals("eeer");
    jt.put("111", "222");
    expect(jt.get("111")).to.be.equals("222");
  });
});
