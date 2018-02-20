"use strict";
const type_definitions_1 = require("./../type-definitions");
const NodeRegister_1 = require("./../NodeRegister");
const paths = {
    "@root": "./foo/root/bar",
    "@includes": "includes/hello/world",
    "@system": "lorem/ipsum/dolor/consectetur/",
    "@fakes": __dirname + "/fake/deep",
    "@fakes__": __dirname + "/fake",
    "@foooovars/*": __dirname + "/fake/*"
};
module.exports = {
    paths: paths,
    aliaspath: "/my/examples/for/mods",
    alias: "@mypath",
    buildNodeRegister: function (aliases = {}) {
        return NodeRegister_1.NodeRegister.useRegister(new type_definitions_1.HashMap(aliases));
    },
    buildDependency: function (fakeNodejsModule = null) {
        var fakeNodejsModule = fakeNodejsModule === null
            ? NodeRegister_1.NodeJSExtractor.extractModule()
            : fakeNodejsModule;
        let nodeContext = new NodeRegister_1.NodeModuleResolver(fakeNodejsModule);
        let collection = new type_definitions_1.HashMap(paths);
        let registerAlias = new NodeRegister_1.FileNameResolver(nodeContext, collection);
        registerAlias.replaceResolver();
        return {
            fakeNodejsModule: fakeNodejsModule,
            nodeContext: nodeContext,
            collection: collection,
            registerAlias: registerAlias
        };
    }
};
