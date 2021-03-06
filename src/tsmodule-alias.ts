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
  private _nodeRegister: NodeRegister;

  /**
   *
   */
  static use(jsonMap: any, rootPath: string = null): TsModuleAlias {
    const _packageData = Package.projectData(rootPath);
    return TsModuleAlias.__start__(jsonMap, _packageData);
  }

  /**
   * Initialize TsModuleAlias with any HashMap object:
   *   {
   *     alias: path
   *   }
   */
  static __start__(
    jsonMap: HashMap<string, string> | any,
    environment: HashMap<string, string>
  ) {
    if (!(<HashMap<string, string>>jsonMap.add)) {
      jsonMap = new HashMap<string, string>(jsonMap);
    }
    const instance: TsModuleAlias = new TsModuleAlias(jsonMap, environment);
    return instance;
  }

  /**
   * Starts using typescript file as an alias source
   * @param tsconfigPath
   * @param map json to store on the fly alias paths:
   *        {
   *          "@crazyAlias": __dirname + "/path/to/my/object"
   *        }
   * @param rootPath  absolute path to root project, if null momoThePug 
   * will resolve automatically
   */
  static play(
    tsconfigPath: string,
    map = null,
    rootPath: string = null
  ): TsModuleAlias {
    const _packageData = Package.projectData(rootPath);
    const hashMapContainer = HashMapGenerator.generate(
      "Typescript/Typescript",
      tsconfigPath,
      _packageData
    );
    if (map !== null) {
      hashMapContainer.merge(new HashMap<string, string>(map));
    }
    return TsModuleAlias.__start__(hashMapContainer, _packageData);
  }



  /**
   *   Starts using typescript file as an alias source, going backward looking for
   *   our typescript config file.
   *  @param startScanFrom usually __dirname value is passed
   * @param map json to store on the fly alias paths:
   *        {
   *          "@crazyAlias": __dirname + "/path/to/my/object"
   *        }
   * @param rootPath  absolute path to root project, if null momoThePug 
   * will resolve automatically
   */
  static playAuto(startScanFrom: string, map = null, rootPath: string = null) {
    const tsconfigPath = AliasPathUtil.findTSConfigToReadFromRoot(startScanFrom, rootPath);
    return TsModuleAlias.play(tsconfigPath.diff, map, rootPath);
  }

  /**
   * @param tsconfigPath root path for typescript project
   */
  constructor(
    private hashMapContainer: HashMap<string, string>,
    private _packageData: HashMap<string, string>
  ) {
    this._nodeRegister = NodeRegister.useRegister(this.hashMapContainer);
  }

  /**
   * @param alias
   * @param path
   */
  addPathAlias(alias: string, path: string): TsModuleAlias {
    this._nodeRegister.aliasMap.add(alias, path);
    return this;
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
