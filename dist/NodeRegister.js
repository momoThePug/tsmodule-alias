"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_definitions_1 = require("./type-definitions");
const AliasPathUtil_1 = require("./AliasPathUtil");
const nodePath = require("path");
/**
 *Wrapps Node's module instance to perform module resolution
 */
class NodeModuleResolver {
    /**
     * Current nodejs module instance
     * @param nodejsModule
     */
    constructor(nodejsModule) {
        this.nodejsModule = nodejsModule;
        this.nodeFileNameResolver = nodejsModule._resolveFilename;
        this.nodeContext = nodejsModule.constructor;
    }
    /**
     * Verifies if module is defined in nodejs loader
     * @param modname
     */
    hasNodeModule(modname) {
        let resolvedMod = "";
        try {
            resolvedMod = require.resolve(modname);
        }
        catch (e) {
            return false;
        }
        return typeof require.cache[resolvedMod] === "undefined"
            ? false
            : resolvedMod;
    }
    /**
     * @param modname
     */
    removeCachedNodeModule(modname) {
        const nodeMod = this.hasNodeModule(modname);
        if (!nodeMod) {
            return false;
        }
        return delete require.cache[nodeMod];
    }
    /**
     * original nodejs file name resolver
     */
    get fileNameResolver() {
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
    get context() {
        return this.nodeContext;
    }
    /**
     * nodejs module instance
     */
    get nodeModule() {
        return this.nodejsModule;
    }
    /**
     * original file name resolver
     */
    invokeFilenameResolver(context, request, parent, isMain) {
        return this.nodeFileNameResolver.call(context, request, parent, isMain);
    }
    setResolver(context, resolver = null) {
        if (resolver === null) {
            resolver = this.originalFileNameResolver;
        }
        this.nodeModule._resolveFilename = resolver.bind(context);
    }
}
exports.NodeModuleResolver = NodeModuleResolver;
/**
 * Main class to register a file name resolver for
 *  any alias collection object.
 */
class FileNameResolver {
    constructor(nodeContext, aliasCollection) {
        this.nodeContext = nodeContext;
        this.aliasCollection = aliasCollection;
        this.enabled = true;
        this.cached = new type_definitions_1.HashMap();
    }
    /**
     * Filename resolver, try to resolves any alias otherwise request is passed to original nodejs resolver.
     * @param request
     * @param parent
     * @param isMain
     */
    customFileNameResolver(request, parent, isMain) {
        if (this.enabled) {
            request = this.verifyAliases(request);
        }
        return this.nodeContext.invokeFilenameResolver(this, request, parent, isMain);
    }
    set alias(collection) {
        this.aliasCollection = collection;
    }
    get alias() {
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
    verifyAliases(path) {
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
     * @param path
     * @returns a set of data to be consumed by file loaders
     */
    getAliasData(path) {
        const data = this.aliasCollection.each((aliasPath, aliasIndex) => {
            aliasPath = nodePath.normalize(aliasPath);
            aliasIndex = nodePath.normalize(aliasIndex);
            path = nodePath.normalize(path);
            if (!AliasPathUtil_1.AliasPathUtil.hasAlias(path, aliasIndex)) {
                return;
            }
            return {
                request: path,
                resolved: AliasPathUtil_1.AliasPathUtil.getAliasedPath(path, aliasIndex, aliasPath),
                alias: aliasIndex,
                path: aliasPath
            };
        });
        return data || null;
    }
    /**
     * TODO
     */
    stop() {
        this.enabled = false;
    }
    /**
     *TODO
     */
    reset() {
        if (this.cached.isEmpty()) {
            return;
        }
        this.cached.each((element, key) => {
            this.nodeContext.removeCachedNodeModule(element.request);
        });
        this.aliasCollection.removeAll();
        this.cached.removeAll();
        this.nodeContext.setResolver(this.nodeContext.context);
    }
}
exports.FileNameResolver = FileNameResolver;
/**
 * Perform node extraction operations over current module instance.
 */
class NodeJSExtractor {
    /**
     * @returns current module constructor used by node
     */
    static extractModule() {
        return module.constructor.length > 1
            ? module.constructor
            : require("module");
    }
}
exports.NodeJSExtractor = NodeJSExtractor;
/**
 * Middleware to register/deregister alias for nodejs require system
 */
class NodeRegister {
    /**
     * Create new instance of node register:
     *
     * @param aliases Register a collection of aliases is "aliases param" is passed otherwise no registration is done.
     */
    static useRegister(aliases = null) {
        const register = new NodeRegister();
        if (aliases !== null) {
            register.aliasMap.merge(aliases);
        }
        register.start();
        return register;
    }
    constructor(nodejsmodule = false) {
        this.initialize(nodejsmodule);
    }
    initialize(nodejsmodule = false) {
        nodejsmodule = nodejsmodule || NodeJSExtractor.extractModule();
        this.nodeContext = new NodeModuleResolver(nodejsmodule);
        this.registerAlias = new FileNameResolver(this.nodeContext, new type_definitions_1.HashMap());
    }
    get aliasMap() {
        return this.registerAlias.alias;
    }
    set aliasMap(collection) {
        this.registerAlias.alias = collection;
    }
    /**
     * TODO: make it works
     */
    reset() {
        this.registerAlias.reset();
    }
    /**
     * TODO: make it works
     */
    stop() {
        this.registerAlias.stop();
    }
    /**
     * add alias verification system to nodejs
     */
    start() {
        this.registerAlias.replaceResolver();
    }
}
exports.NodeRegister = NodeRegister;
