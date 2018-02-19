import { HashMap } from "./../type-definitions";
import { NodeModuleResolver, FileNameResolver, NodeRegister } from "./../NodeRegister";
declare const _default: {
    paths: {
        "@root": string;
        "@includes": string;
        "@system": string;
        "@fakes": string;
        "@fakes__": string;
    };
    aliaspath: string;
    alias: string;
    buildNodeRegister: (aliases?: any) => NodeRegister;
    buildDependency: (fakeNodejsModule?: any) => {
        fakeNodejsModule: any;
        nodeContext: NodeModuleResolver;
        collection: HashMap<string, string>;
        registerAlias: FileNameResolver;
    };
};
export = _default;
