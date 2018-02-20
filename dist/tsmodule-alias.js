"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypescriptAliasGenerator = require("./Generator/Typescript/TypescriptGenerator");
const NodeRegister_1 = require("./NodeRegister");
const Generator_1 = require("./Generator/Generator");
/**
 * Main NPM Module
 */
class TsModuleAlias {
    /**
     * @param tsconfigPath
     */
    static play(tsconfigPath, rootPath = null) {
        const instance = new TsModuleAlias(tsconfigPath, rootPath);
        return instance.nodeRegister;
    }
    /**
     * @param tsconfigPath root path for typescript project
     */
    constructor(tsconfigPath, rootPath = null) {
        this.hashMapContainer = Generator_1.HashMapGenerator.generate("Typescript/Typescript", tsconfigPath, rootPath);
        this._nodeRegister = NodeRegister_1.NodeRegister.useRegister(this.hashMapContainer);
    }
    /**
     * @returns Current instance for NodeRegister
     */
    get nodeRegister() {
        return this._nodeRegister;
    }
}
module.exports = TsModuleAlias;
