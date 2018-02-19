const TypescriptAliasGenerator = require("./Generator/Typescript/TypescriptGenerator");
import { NodeRegister } from './NodeRegister';
import { HashMapGenerator } from "./Generator/Generator";
import { HashMap, AliasPathUtil } from "./type-definitions";

/**
 * Main NPM Module
 */
class TsModuleAlias {
  private hashMapContainer: HashMap<string, string>;
  private _nodeRegister: NodeRegister;

  /**
   * @param tsconfigPath
   */
  static play(tsconfigPath: string, rootPath: string = null): NodeRegister {
    const instance: TsModuleAlias = new TsModuleAlias(tsconfigPath, rootPath);
    return instance.nodeRegister;
  }

  /**
   * @param tsconfigPath root path for typescript project
   */
  constructor(tsconfigPath: string, rootPath: string = null) {
    this.hashMapContainer = HashMapGenerator.generate(
      "Typescript/Typescript",
      tsconfigPath,
      rootPath
    );
    this._nodeRegister = NodeRegister.useRegister(this.hashMapContainer);
  }

  /**
   * @returns Current instance for NodeRegister
   */
  get nodeRegister(): NodeRegister {
      return this._nodeRegister;
  }

}

module.exports = TsModuleAlias;