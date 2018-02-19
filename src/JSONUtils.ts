/**
 * Se cargan las dependencias del sistema
 */
const fs = require("fs");
const pathToRoot = __dirname + "/";

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
export class JSONType<K, V> implements IJSONType<K, V> {
  private data: any = {};

  constructor(private customdata: any = {}) {
    this.data = customdata;
  }

  /**
   * Agrega un nuevo indice al mapa
   * @param key
   * @param value
   */
  put(key: K | string, value: V): void {
    this.data[key] = value;
  }

  /**
   * Remover un indice del mapa
   * @param key
   */
  remove(key: K): void {
    delete this.data[key];
  }

  /**
   * Vacía todos los indices del mapa
   */
  removeAll(): void {
    delete this.data;
    this.data = {};
  }

  /**
   * Retornar un indice del mapa
   * @param key
   */
  get(key: K): V {
    if (typeof this.data[key] === "undefined") {
      return null;
    }
    return this.data[key];
  }

  /**
   * Agrega indices obteniendolos de un objeto json
   * @param json
   */
  putAll(json: any): void {
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
  has(key: K): boolean {
    return typeof this.data[key] === "undefined" ? false : true;
  }
}

export class JsonUtils {
  static extractJSONFromMethod(
    context: any,
    originalMethod: any,
    path: string
  ): any {
    const jsonValue = originalMethod.apply(context, arguments);
    const wrapper = new JsonWrapper(jsonValue);
    return wrapper.readCycl(path);
  }
}

export class JsonResult<K, V> {
  constructor(
    private _resultIndex: string = null,
    private _result: JSONType<K, V> = null,
    private _isFound: boolean = false,
    private _parent: string = null
  ) {}

  get isFound(): boolean {
    return this._isFound;
  }
  get result(): JSONType<K, V> {
    return this._result;
  }
  get resultIndex(): string {
    return this._resultIndex;
  }

  get parent(): string {
    return this._parent;
  }

  set isFound(value: boolean) {
    this._isFound = value;
  }
  set result(value: JSONType<K, V>) {
    this._result = value;
  }
  set resultIndex(value: string) {
    this._resultIndex = value;
  }

  set parent(value: string) {
    this._parent = value;
  }
}

/**
 * Wrapper de lecturas JSON
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
export class JsonWrapper {
  /**
   * @param json contenido json
   */
  constructor(private json: any) {}

  /**
   * Busca dentro de una cadena de llaves, utilizando cada llave una version dentro de una pila de datos.
   */
  readCycl(needlesPath: string, version: string = null, haystack: any = false) {
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
  read(needle: string, version: string = null, haystack: any = false) {
    if (!haystack) {
      haystack = this.json;
    }
    return this.seek(needle, version, haystack);
  }

  toJSON(): any {
    return this.json;
  }

  get haystack(): any {
    return this.json;
  }
  /**
   * @param needle   que se va a buscar
   * @param version   que version se va a buscar
   * @param haystack de donde se va a buscar
   *
   * @return si existe la version se retorna, si no se retorna sin version
   */
  seek(needle: string, version: string = "", haystack: any) {
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

  findParentCycl(needlesPath: string, haystack: any = null) {
    haystack = haystack === null ? this.json : haystack;
    const needles = needlesPath.split(">");
    for (const needle of needles) {
      haystack = this.findParent(needle, haystack);
    }
    return haystack;
  }

  findParent(needle: string, haystack: any = null) {
    haystack = haystack === null ? this.json : haystack;
    for (const index in haystack) {
      if (index === needle) {
        return haystack[index];
      }
    }
    return haystack;
  }

  decorateMatch(haystack: any, match: any, needle: string): any {
    if (typeof haystack[needle] !== "undefined") {
      match[needle] = haystack[needle];
    }
    return match;
  }

  findByAttr(attr: string, haystack: any = null) {
    haystack = haystack === null ? this.json : haystack;

    for (const index in haystack) {
      if (
        typeof haystack[index] === "undefined" ||
        typeof haystack[index][attr] === "undefined"
      ) {
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

/**
 * Lector de archivos json
 * @author Daniel Vera Morales <dvera at sunset.com.mx>
 */
export class JsonReader {
  private fileName: string;
  private extension: string = ".json";

  /**
   * @param fileToRead archivo que se cargará
   * @param useReader true si se necesita un wrapper o false de lo contrario.
   */
  constructor(private fileToRead: string, private useReader: boolean = false) {
    this.formatFileName();
  }

  private formatFileName() {
    this.fileName = pathToRoot + this.fileToRead + this.extension;
  }

  /**
   * Leer archivo
   */
  readFile(): any {
    const json: any = JSON.parse(fs.readFileSync(this.fileName, "utf8"));
    if (this.useReader) {
      return new JsonWrapper(json);
    }
    return json;
  }

  get dataSource(): string {
    return this.fileToRead;
  }

  set dataSource(data: string) {
    this.fileToRead = data;
    this.formatFileName();
  }
}
