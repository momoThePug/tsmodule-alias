/**
 * 1 - Buscar el tsconfig file
 * 2 - Leer el json
 * 3 - localizar indices: path, baseurl y  outidr
 * 4 - iterar sobre cada item de path y registrar el alias
 * 5- si contiene mas de un item el array se utiliza el primer indice y el resto se registra como paths de busqueda.
 * 6 - Almacenar el contenido en un archivo temporal llamado modulepathalias.js
 * 7 - retornar el path donde se encuentra el archivo para que el setup lo instale
 */
import { HashMap } from "./../type-definitions";
import { IHashMapGenerator } from "./Generator";
/**
 *
 */
declare class ModuleAliasGenerator implements IHashMapGenerator {
    /**
     * @param sourceName
     */
    build(dataHelper: any, data: HashMap<string, string>): HashMap<string, string>;
}
export = ModuleAliasGenerator;
