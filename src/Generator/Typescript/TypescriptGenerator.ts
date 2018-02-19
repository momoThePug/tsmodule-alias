/**
 * TODO: si contiene mas de un item el array se utiliza el primer indice y el resto se registra como paths de busqueda.
 */

import { HashMap, TS_CONFIG } from "./../../type-definitions";
import { IHashMapGenerator } from "./../Generator";
import {
  ParentFileFinder,
  FileFindResult
} from "../../vendor/duffman/parent-file-finder";
import { JsonWrapper } from "./../../JSONUtils";
import * as nodePath from "path";

class TypescriptAliasGenerator implements IHashMapGenerator {
  /**
   * @param whereToRead root path to look for
   * @param data any extra data
   * @returns HashMap with alias defined inside typescript file
   */
  build(
    whereToRead: string,
    data: HashMap<string, string>
  ): HashMap<string, string> {
    
    const typescriptProject = nodePath.join(data.get("root"), whereToRead);
    const result: FileFindResult = ParentFileFinder.findFile(
      typescriptProject,
      TS_CONFIG
    );

    if (!result.isFound) {
      return null;
    }

    const typescriptConfig: any = require(result.result);
    return this.extractData(typescriptConfig, result.path);
  }

  /**
   * normalizar(typescriptPath + rootdir + path_registrado_json)
   *
   * @param typescriptConfig
   * @param result
   */
  extractData(
    typescriptConfig: any,
    basePath: string
  ): HashMap<string, string> {
    const wrapper: JsonWrapper = new JsonWrapper(typescriptConfig);
    const rootdir: any = wrapper.readCycl("compilerOptions>rootDir");
    const paths: any = wrapper.readCycl("paths");

    if (rootdir === null || paths === null) {
      return null;
    }

    return this.buildAliasMap(rootdir, paths, basePath);
  }

  /**
   *
   * @param nodes
   * @param result
   */
  buildAliasMap(
    rootdir: string,
    aliasCollection: string[],
    basePath: string
  ): HashMap<string, string> {
    const mapResult = new HashMap<string, string>();
    const basePathForAlias = nodePath.join(basePath, rootdir);

    for (const alias in aliasCollection) {
      const currentPathReference = aliasCollection[alias];
      if (currentPathReference === null || currentPathReference.length === 0) {
        continue;
      }
      mapResult.add(
        alias,
        nodePath.join(basePathForAlias, currentPathReference[0])
      );
    }
    return mapResult;
  }
}

export = TypescriptAliasGenerator;
