/**
 * TODO: si contiene mas de un item el array se utiliza el primer indice y el resto se registra como paths de busqueda.
 */
import { HashMap } from "./../../type-definitions";
import { IHashMapGenerator } from "./../Generator";
declare class TypescriptAliasGenerator implements IHashMapGenerator {
    /**
     * @param whereToRead root path to look for
     * @param data any extra data
     * @returns HashMap with alias defined inside typescript file
     */
    build(whereToRead: string, data: HashMap<string, string>): HashMap<string, string>;
    /**
     * normalizar(typescriptPath + rootdir + path_registrado_json)
     *
     * @param typescriptConfig
     * @param result
     */
    extractData(typescriptConfig: any, basePath: string): HashMap<string, string>;
    /**
     *
     * @param nodes
     * @param result
     */
    buildAliasMap(rootdir: string, aliasCollection: string[], basePath: string): HashMap<string, string>;
}
export = TypescriptAliasGenerator;
