import { HashMap, AliasPathUtil} from "./type-definitions";

/**
 *Wrapps Node's module instance to perform module resolution
 */
export class NodeModuleResolver {
  private nodeFileNameResolver: Function;
  private nodeContext: any;

  /**
   * Current nodejs module instance
   * @param nodejsModule
   */
  constructor(private nodejsModule: any) {
    this.nodeFileNameResolver = nodejsModule._resolveFilename;
    this.nodeContext = nodejsModule.constructor;
  }

  /**
   * Verifies if module is defined in nodejs loader
   * @param modname
   */
  hasNodeModule(modname: string): boolean | string {
    let resolvedMod = "";

    try {
      resolvedMod = require.resolve(modname);
    } catch (e) {
      return false;
    }

    return typeof require.cache[<string>resolvedMod] === "undefined"
      ? false
      : resolvedMod;
  }

  /**
   * @param modname
   */
  removeCachedNodeModule(modname: string): boolean {
    const nodeMod = this.hasNodeModule(modname);
    if (!nodeMod) {
      return false;
    }
    return delete require.cache[<string>nodeMod];
  }

  /**
   * original nodejs file name resolver
   */
  get fileNameResolver(): Function {
    return this.fileNameResolver;
  }

  /**
   * @returns original nodejs module resolver
   */
  get originalFileNameResolver() {
    return this.nodeFileNameResolver;
  }

  /**
   * nodejs module context
   */
  get context(): any {
    return this.nodeContext;
  }

  /**
   * nodejs module instance
   */
  get nodeModule(): any {
    return this.nodejsModule;
  }

  /**
   * original file name resolver
   */
  invokeFilenameResolver(context, request: string, parent, isMain) {
    return this.nodeFileNameResolver.call(context, request, parent, isMain);
  }

  setResolver(context: any, resolver: Function = null) {
    if (resolver === null) {
      resolver = this.originalFileNameResolver;
    }
    this.nodeModule._resolveFilename = resolver.bind(context);
  }
}

/**
 * Main class to register a file name resolver for
 *  any alias collection object.
 */
export class FileNameResolver {
  private enabled: boolean = true;
  private cached: HashMap<string, string>;

  constructor(
    private nodeContext: NodeModuleResolver,
    private aliasCollection: HashMap<string, string>
  ) {
    this.cached = new HashMap<string, string>();
  }

  /**
   * Filename resolver, try to resolves any alias otherwise request is passed to original nodejs resolver.
   * @param request
   * @param parent
   * @param isMain
   */
  private customFileNameResolver(request: string, parent, isMain) {
    if (this.enabled) {
      request = this.verifyAliases(request);
    }
    return this.nodeContext.invokeFilenameResolver(
      this,
      request,
      parent,
      isMain
    );
  }

  set alias(collection: HashMap<string, string>) {
    this.aliasCollection = collection;
  }

  get alias(): HashMap<string, string> {
    return this.aliasCollection;
  }

  /**
   *  overrides nodejs _resolveFilename function with our own resolver.
   */
  replaceResolver() {
    this.enabled = true;
    this.nodeContext.setResolver(this, this.customFileNameResolver);
  }

  /**
   * Resolves if an alias is defined by iterating over every alias map
   * otherwise invokes node resolution.
   *
   * @param path current path or module invoked using:
   *    require('@myalias/foo/bar/mymod');
   */
  verifyAliases(path: string): string {
    if (this.cached.has(path)) {
      return this.cached.get(path)["resolved"];
    }

    const mypath = this.getAliasData(path);
    if (!mypath || typeof mypath["resolved"] === "undefined") {
      return path;
    }
    this.cached.add(path, mypath);
    return mypath["resolved"];
  }

  /**
   *
   * @param path
   */
  getAliasData(path: string): any {
    const data = this.aliasCollection.each(
      (aliasPath: string, aliasIndex: string) => {
        if (!AliasPathUtil.hasAlias(path, aliasIndex)) {
          return;
        }

        return {
          request: path,
          resolved: AliasPathUtil.getAliasedPath(path, aliasIndex, aliasPath),
          alias: aliasIndex,
          path: aliasPath
        };
      }
    );
    return data || null;
  }

  /**
   *
   */
  stop(): void {
    this.enabled = false;
  }

  /**
   *
   */
  reset(): void {
    if (this.cached.isEmpty()) {
      return;
    }

    this.cached.each((element: any, key: string) => {
      this.nodeContext.removeCachedNodeModule(element.request);
    });

    this.aliasCollection.removeAll();
    this.cached.removeAll();
    this.nodeContext.setResolver(this.nodeContext.context);
  }
}

/**
 * Perform node extraction operations over current module instance.
 */
export class NodeJSExtractor {
  /**
   * @returns current module constructor used by node
   */
  static extractModule(): any {
    return module.constructor.length > 1
      ? module.constructor
      : require("module");
  }
}

/**
 * Middleware to register/deregister alias for nodejs require system
 */
export class NodeRegister {
  private nodeContext: NodeModuleResolver;
  private registerAlias: FileNameResolver;

  /**
   * Create new instance of node register:
   *
   * @param aliases Register a collection of aliases is "aliases param" is passed otherwise no registration is done.
   */
  static useRegister(aliases: HashMap<string, string> = null): NodeRegister {
    const register = new NodeRegister();
    if (aliases !== null) {
      register.aliasMap.merge(aliases);
    }
    register.start();
    return register;
  }

  constructor(nodejsmodule: any = false) {
    this.initialize(nodejsmodule);
  }

  private initialize(nodejsmodule: any = false) {
    nodejsmodule = nodejsmodule || NodeJSExtractor.extractModule();
    this.nodeContext = new NodeModuleResolver(nodejsmodule);
    this.registerAlias = new FileNameResolver(
      this.nodeContext,
      new HashMap<string, string>()
    );
  }

  get aliasMap(): HashMap<string, string> {
    return this.registerAlias.alias;
  }

  set aliasMap(collection: HashMap<string, string>) {
    this.registerAlias.alias = collection;
  }

  /**
   * TODO: make it works
   */
  reset(): void {
    this.registerAlias.reset();
  }

  /**
   * TODO: make it works
   */
  stop(): void {
    this.registerAlias.stop();
  }
  /**
   * add alias verification system to nodejs
   */
  start(): void {
    this.registerAlias.replaceResolver();
  }
}
