"use strict";
/**
 * TODO: si contiene mas de un item el array se utiliza el primer indice y el resto se registra como paths de busqueda.
 */
const type_definitions_1 = require("./../../type-definitions");
const parent_file_finder_1 = require("../../vendor/duffman/parent-file-finder");
const JSONUtils_1 = require("./../../JSONUtils");
const nodePath = require("path");
class TypescriptAliasGenerator {
    /**
     * @param whereToRead root path to look for
     * @param data any extra data
     * @returns HashMap with alias defined inside typescript file
     */
    build(whereToRead, data) {
        const typescriptProject = nodePath.join(data.get("root"), whereToRead);
        const result = parent_file_finder_1.ParentFileFinder.findFile(typescriptProject, type_definitions_1.TS_CONFIG);
        if (!result.isFound) {
            return null;
        }
        const typescriptConfig = require(result.result);
        return this.extractData(typescriptConfig, result.path);
    }
    /**
     * normalizar(typescriptPath + rootdir + path_registrado_json)
     *
     * @param typescriptConfig
     * @param result
     */
    extractData(typescriptConfig, basePath) {
        const wrapper = new JSONUtils_1.JsonWrapper(typescriptConfig);
        const baseUrl = wrapper.readCycl("compilerOptions>baseUrl");
        const paths = wrapper.readCycl("compilerOptions>paths");
        if (baseUrl === null || paths === null) {
            throw Error("Typescript configuration is not correct, current values:" + JSON.stringify({
                "baseUrl": baseUrl,
                "paths": paths
            }));
        }
        return this.buildAliasMap(baseUrl, paths, basePath);
    }
    /**
     *
     * @param nodes
     * @param result
     */
    buildAliasMap(rootdir, aliasCollection, basePath) {
        const mapResult = new type_definitions_1.HashMap();
        const basePathForAlias = nodePath.join(basePath, rootdir);
        for (const alias in aliasCollection) {
            const currentPathReference = aliasCollection[alias];
            if (currentPathReference === null || currentPathReference.length === 0) {
                continue;
            }
            mapResult.add(alias, nodePath.join(basePathForAlias, currentPathReference[0]));
        }
        return mapResult;
    }
}
module.exports = TypescriptAliasGenerator;
