"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("./../Global");
const nodeFs = require("fs");
const nodePath = require("path");
/**
 * Main Alias generator
 *
 * Load any strategy for alias generator
 */
class HashMapGenerator {
    /**
     * @param strategy generator name
     */
    constructor(strategy) {
        this.generator = this.load(strategy);
    }
    /**
     * @param strategy
     */
    load(strategy) {
        const generatorModule = strategy + "Generator";
        const generatorPath = nodePath.resolve(__dirname, generatorModule);
        let generator = null;
        if (Global_1.Package.moduleExists(generatorPath)) {
            generator = require(generatorPath);
        }
        else if (Global_1.Package.moduleExists(generatorModule)) {
            generator = require(generatorModule);
        }
        else {
            throw Error(" Generator strategy cannot be found: " + strategy);
        }
        return new generator();
    }
    /**
     * @param strategy  Strategy name without "Generator" sufix
     * @param dataHelper any data to be passed and proccesed
     * @param dirname (optional) current working directory used to resolve dependencies and generator loading
     * @returns a hashmap with aliases and paths to be registered
     */
    static generate(strategy, dataHelper, packageData) {
        const mygenerator = new HashMapGenerator(strategy);
        return mygenerator.build(dataHelper, packageData);
    }
    /**
     * Invoke build operation to retrieve a hashmap of aliases
     * @param sourceName
     */
    build(dataHelper, data) {
        return this.generator.build(dataHelper, data);
    }
}
exports.HashMapGenerator = HashMapGenerator;
