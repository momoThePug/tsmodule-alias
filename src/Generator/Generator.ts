import { HashMap } from "./../type-definitions";
import { Package } from "./../Global";
const nodeFs = require("fs");
const nodePath = require("path");

/**
 * Main Alias generator
 *
 * Load any strategy for alias generator
 */
export class HashMapGenerator implements IHashMapGenerator {
  private generator: IHashMapGenerator;

  /**
   * @param strategy generator name
   */
  private constructor(strategy: string) {
    this.generator = this.load(strategy);
  }

  /**
   * @param strategy
   */
  private load(strategy: string): IHashMapGenerator {
    const generatorModule = strategy + "Generator";
    const generatorPath = nodePath.resolve(__dirname, generatorModule);
    let generator = null;

    if (Package.moduleExists(generatorPath)) {
      generator = require(generatorPath);
    } else if (Package.moduleExists(generatorModule)) {
      generator = require(generatorModule);
    } else {
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
  static generate(
    strategy: string,
    dataHelper: any,
    packageData:  HashMap<string, string>
  ): HashMap<string, string> {
    const mygenerator = new HashMapGenerator(strategy);
    return mygenerator.build(dataHelper, packageData);
  }

  /**
   * Invoke build operation to retrieve a hashmap of aliases
   * @param sourceName
   */
  build(dataHelper: any, data: any): HashMap<string, string> {
    return this.generator.build(dataHelper, data);
  }
}

/**
 * interface needed to act like a generator
 */
export interface IHashMapGenerator {
  build(dataHelper: any, data: any): HashMap<string, string>;
}
