export interface IJSONType<K, V> {
    put(key: K | string, value: V): void;
    remove(key: K): void;
    removeAll(): void;
    get(key: K): V;
    putAll(json: any): void;
    has(key: K): boolean;
}
/**
 * Simula el MAP de java para abstraer cualquier objeto JSON.
 *
 * Wrapper para JSON
 */
export declare class JSONType<K, V> implements IJSONType<K, V> {
    private customdata;
    private data;
    constructor(customdata?: any);
    /**
     * Agrega un nuevo indice al mapa
     * @param key
     * @param value
     */
    put(key: K | string, value: V): void;
    /**
     * Remover un indice del mapa
     * @param key
     */
    remove(key: K): void;
    /**
     * Vacía todos los indices del mapa
     */
    removeAll(): void;
    /**
     * Retornar un indice del mapa
     * @param key
     */
    get(key: K): V;
    /**
     * Agrega indices obteniendolos de un objeto json
     * @param json
     */
    putAll(json: any): void;
    /**
     * Verifica si existe un indice en el mapa
     * @param key
     */
    has(key: K): boolean;
}
export declare class JsonUtils {
    static extractJSONFromMethod(context: any, originalMethod: any, path: string): any;
}
export declare class JsonResult<K, V> {
    private _resultIndex;
    private _result;
    private _isFound;
    private _parent;
    constructor(_resultIndex?: string, _result?: JSONType<K, V>, _isFound?: boolean, _parent?: string);
    isFound: boolean;
    result: JSONType<K, V>;
    resultIndex: string;
    parent: string;
}
/**
 * Wrapper de lecturas JSON
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
export declare class JsonWrapper {
    private json;
    /**
     * @param json contenido json
     */
    constructor(json: any);
    /**
     * Busca dentro de una cadena de llaves, utilizando cada llave una version dentro de una pila de datos.
     */
    readCycl(needlesPath: string, version?: string, haystack?: any): any;
    /**
     * Busca una llave de una pila de datos, si no se asigna datos entonces se utiliza el pasado como
     * argumento a la clase.
     *
     * @param needle
     * @param version
     * @param haystack
     */
    read(needle: string, version?: string, haystack?: any): any;
    toJSON(): any;
    readonly haystack: any;
    /**
     * @param needle   que se va a buscar
     * @param version   que version se va a buscar
     * @param haystack de donde se va a buscar
     *
     * @return si existe la version se retorna, si no se retorna sin version
     */
    seek(needle: string, version: string, haystack: any): any;
    findParentCycl(needlesPath: string, haystack?: any): any;
    findParent(needle: string, haystack?: any): any;
    decorateMatch(haystack: any, match: any, needle: string): any;
    findByAttr(attr: string, haystack?: any): any;
}
/**
 * Lector de archivos json
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
export declare class JsonReader {
    private fileToRead;
    private useReader;
    private fileName;
    private extension;
    /**
     * @param fileToRead archivo que se cargará
     * @param useReader true si se necesita un wrapper o false de lo contrario.
     */
    constructor(fileToRead: string, useReader?: boolean);
    private formatFileName;
    /**
     * Leer archivo
     */
    readFile(): any;
    dataSource: string;
}
