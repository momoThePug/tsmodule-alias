const TypescriptAliasGenerator = require("./Generator/Typescript/TypescriptGenerator");
import { NodeRegister } from "./NodeRegister";
import { HashMapGenerator } from "./Generator/Generator";
import { HashMap } from "./type-definitions";
import { AliasPathUtil } from "./AliasPathUtil";
import { Package } from "./Global";

/**
 * Main NPM Module
 */
class TsModuleAlias {
  private hashMapContainer: HashMap<string, string>;
  private _nodeRegister: NodeRegister;
  private _packageData: HashMap<string, string>;
  /**
   * @param tsconfigPath
   */
  static play(tsconfigPath: string, rootPath: string = null): TsModuleAlias {
    const instance: TsModuleAlias = new TsModuleAlias(tsconfigPath, rootPath);
    return instance;
  }

  /**
   * @param tsconfigPath root path for typescript project
   */
  constructor(tsconfigPath: string, rootPath: string = null) {
    this._packageData = Package.projectData(rootPath);
    this.hashMapContainer = HashMapGenerator.generate(
      "Typescript/Typescript",
      tsconfigPath,
      this._packageData
    );
    this._nodeRegister = NodeRegister.useRegister(this.hashMapContainer);
  }

  /**
   * @returns Current instance for NodeRegister
   */
  get nodeRegister(): NodeRegister {
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
