import { HashMap } from "./../type-definitions";
import { AliasPathUtil } from "./../AliasPathUtil";

import {
  NodeModuleResolver,
  FileNameResolver,
  NodeJSExtractor,
  NodeRegister
} from "./../NodeRegister";

const paths = {
  "@root": "./foo/root/bar",
  "@includes": "includes/hello/world",
  "@system": "lorem/ipsum/dolor/consectetur/",
  "@fakes": __dirname + "/fake/deep",
  "@fakes__": __dirname + "/fake",
  "@foooovars/*": __dirname + "/fake/*",
  "@windowsfakes/bar/*": __dirname + "aaa/bbb/ccc/fakemo/dule/foo/bar"
};

export = {
  paths: paths,
  aliaspath: "/my/examples/for/mods",
  alias: "@mypath",
  buildNodeRegister: function(aliases: any = {}) {
    return NodeRegister.useRegister(new HashMap<string, string>(aliases));
  },
  buildDependency: function(fakeNodejsModule = null) {
    var fakeNodejsModule =
      fakeNodejsModule === null
        ? NodeJSExtractor.extractModule()
        : fakeNodejsModule;
    let nodeContext: NodeModuleResolver = new NodeModuleResolver(
      fakeNodejsModule
    );
    let collection: HashMap<string, string> = new HashMap<string, string>(
      paths
    );
    let registerAlias: FileNameResolver = new FileNameResolver(
      nodeContext,
      collection
    );
    registerAlias.replaceResolver();
    return {
      fakeNodejsModule: fakeNodejsModule,
      nodeContext: nodeContext,
      collection: collection,
      registerAlias: registerAlias
    };
  }
};
