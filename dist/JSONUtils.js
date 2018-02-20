"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Se cargan las dependencias del sistema
 */
const fs = require("fs");
const pathToRoot = __dirname + "/";
/**
 * Simula el MAP de java para abstraer cualquier objeto JSON.
 *
 * Wrapper para JSON
 */
class JSONType {
    constructor(customdata = {}) {
        this.customdata = customdata;
        this.data = {};
        this.data = customdata;
    }
    /**
     * Agrega un nuevo indice al mapa
     * @param key
     * @param value
     */
    put(key, value) {
        this.data[key] = value;
    }
    /**
     * Remover un indice del mapa
     * @param key
     */
    remove(key) {
        delete this.data[key];
    }
    /**
     * Vacía todos los indices del mapa
     */
    removeAll() {
        delete this.data;
        this.data = {};
    }
    /**
     * Retornar un indice del mapa
     * @param key
     */
    get(key) {
        if (typeof this.data[key] === "undefined") {
            return null;
        }
        return this.data[key];
    }
    /**
     * Agrega indices obteniendolos de un objeto json
     * @param json
     */
    putAll(json) {
        for (const index in json) {
            if (json[index] !== null) {
                this.put(index, json[index]);
            }
        }
    }
    /**
     * Verifica si existe un indice en el mapa
     * @param key
     */
    has(key) {
        return typeof this.data[key] === "undefined" ? false : true;
    }
}
exports.JSONType = JSONType;
class JsonUtils {
    static extractJSONFromMethod(context, originalMethod, path) {
        const jsonValue = originalMethod.apply(context, arguments);
        const wrapper = new JsonWrapper(jsonValue);
        return wrapper.readCycl(path);
    }
}
exports.JsonUtils = JsonUtils;
class JsonResult {
    constructor(_resultIndex = null, _result = null, _isFound = false, _parent = null) {
        this._resultIndex = _resultIndex;
        this._result = _result;
        this._isFound = _isFound;
        this._parent = _parent;
    }
    get isFound() {
        return this._isFound;
    }
    get result() {
        return this._result;
    }
    get resultIndex() {
        return this._resultIndex;
    }
    get parent() {
        return this._parent;
    }
    set isFound(value) {
        this._isFound = value;
    }
    set result(value) {
        this._result = value;
    }
    set resultIndex(value) {
        this._resultIndex = value;
    }
    set parent(value) {
        this._parent = value;
    }
}
exports.JsonResult = JsonResult;
/**
 * Wrapper de lecturas JSON
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
class JsonWrapper {
    /**
     * @param json contenido json
     */
    constructor(json) {
        this.json = json;
    }
    /**
     * Busca dentro de una cadena de llaves, utilizando cada llave una version dentro de una pila de datos.
     */
    readCycl(needlesPath, version = null, haystack = false) {
        const needles = needlesPath.split(">");
        for (const needle of needles) {
            haystack = this.read(needle, version, haystack);
        }
        return haystack;
    }
    /**
     * Busca una llave de una pila de datos, si no se asigna datos entonces se utiliza el pasado como
     * argumento a la clase.
     *
     * @param needle
     * @param version
     * @param haystack
     */
    read(needle, version = null, haystack = false) {
        if (!haystack) {
            haystack = this.json;
        }
        return this.seek(needle, version, haystack);
    }
    toJSON() {
        return this.json;
    }
    get haystack() {
        return this.json;
    }
    /**
     * @param needle   que se va a buscar
     * @param version   que version se va a buscar
     * @param haystack de donde se va a buscar
     *
     * @return si existe la version se retorna, si no se retorna sin version
     */
    seek(needle, version = "", haystack) {
        if (typeof haystack[needle] === "undefined") {
            return null;
        }
        const newhaystack = haystack[needle];
        if (typeof newhaystack[version] === "undefined") {
            return newhaystack;
        }
        const result = newhaystack[version];
        if (typeof result === "object") {
            result["parent"] = version;
            result["needle"] = needle;
            this.decorateMatch(newhaystack, result, "common");
        }
        return result;
    }
    findParentCycl(needlesPath, haystack = null) {
        haystack = haystack === null ? this.json : haystack;
        const needles = needlesPath.split(">");
        for (const needle of needles) {
            haystack = this.findParent(needle, haystack);
        }
        return haystack;
    }
    findParent(needle, haystack = null) {
        haystack = haystack === null ? this.json : haystack;
        for (const index in haystack) {
            if (index === needle) {
                return haystack[index];
            }
        }
        return haystack;
    }
    decorateMatch(haystack, match, needle) {
        if (typeof haystack[needle] !== "undefined") {
            match[needle] = haystack[needle];
        }
        return match;
    }
    findByAttr(attr, haystack = null) {
        haystack = haystack === null ? this.json : haystack;
        for (const index in haystack) {
            if (typeof haystack[index] === "undefined" ||
                typeof haystack[index][attr] === "undefined") {
                continue;
            }
            const currentHaystack = haystack[index];
            const currentMatch = currentHaystack[attr];
            currentMatch["parent"] = index;
            currentMatch["name"] = attr;
            return currentMatch;
        }
        return haystack;
    }
}
exports.JsonWrapper = JsonWrapper;
/**
 * Lector de archivos json
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
class JsonReader {
    /**
     * @param fileToRead archivo que se cargará
     * @param useReader true si se necesita un wrapper o false de lo contrario.
     */
    constructor(fileToRead, useReader = false) {
        this.fileToRead = fileToRead;
        this.useReader = useReader;
        this.extension = ".json";
        this.formatFileName();
    }
    formatFileName() {
        this.fileName = pathToRoot + this.fileToRead + this.extension;
    }
    /**
     * Leer archivo
     */
    readFile() {
        const json = JSON.parse(fs.readFileSync(this.fileName, "utf8"));
        if (this.useReader) {
            return new JsonWrapper(json);
        }
        return json;
    }
    get dataSource() {
        return this.fileToRead;
    }
    set dataSource(data) {
        this.fileToRead = data;
        this.formatFileName();
    }
}
exports.JsonReader = JsonReader;
