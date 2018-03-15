"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypescriptAliasGenerator = require("./Generator/Typescript/TypescriptGenerator");
const NodeRegister_1 = require("./NodeRegister");
const Generator_1 = require("./Generator/Generator");
const type_definitions_1 = require("./type-definitions");
const Global_1 = require("./Global");
/**
 * Main NPM Module
 */
class TsModuleAlias {
    /**
     * @param tsconfigPath root path for typescript project
     */
    constructor(hashMapContainer, _packageData) {
        this.hashMapContainer = hashMapContainer;
        this._packageData = _packageData;
        this._nodeRegister = NodeRegister_1.NodeRegister.useRegister(this.hashMapContainer);
    }
    /**
     *
     */
    static use(jsonMap, rootPath = null) {
        const _packageData = Global_1.Package.projectData(rootPath);
        return TsModuleAlias.__start__(jsonMap, _packageData);
    }
    /**
     * Initialize TsModuleAlias with any HashMap object:
     *   {
     *     alias: path
     *   }
     */
    static __start__(jsonMap, environment) {
        if (!jsonMap.add) {
            jsonMap = new type_definitions_1.HashMap(jsonMap);
        }
        const instance = new TsModuleAlias(jsonMap, environment);
        return instance;
    }
    /**
     * Starts using typescript file as an alias source
     */
    static play(tsconfigPath, rootPath = null) {
        const _packageData = Global_1.Package.projectData(rootPath);
        const hashMapContainer = Generator_1.HashMapGenerator.generate("Typescript/Typescript", tsconfigPath, _packageData);
        return TsModuleAlias.__start__(hashMapContainer, _packageData);
    }
    /**
     * @param alias
     * @param path
     */
    addPathAlias(alias, path) {
        this.nodeRegister.aliasMap.add(alias, path);
        return this;
    }
    /**
     * @returns Current instance for NodeRegister
     */
    get nodeRegister() {
        return this._nodeRegister;
    }
    /**
     * @returns Data used to load typescript modules and aliases
     */
    get currentEnvironmentData() {
        return this._packageData;
    }
}
module.exports = TsModuleAlias;
