"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypescriptAliasGenerator = require("./Generator/Typescript/TypescriptGenerator");
const NodeRegister_1 = require("./NodeRegister");
const Generator_1 = require("./Generator/Generator");
const Global_1 = require("./Global");
/**
 * Main NPM Module
 */
class TsModuleAlias {
    /**
     * @param tsconfigPath
     */
    static play(tsconfigPath, rootPath = null) {
        const instance = new TsModuleAlias(tsconfigPath, rootPath);
        return instance;
    }
    /**
     * @param tsconfigPath root path for typescript project
     */
    constructor(tsconfigPath, rootPath = null) {
        this._packageData = Global_1.Package.projectData(rootPath);
        this.hashMapContainer = Generator_1.HashMapGenerator.generate("Typescript/Typescript", tsconfigPath, this._packageData);
        this._nodeRegister = NodeRegister_1.NodeRegister.useRegister(this.hashMapContainer);
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
