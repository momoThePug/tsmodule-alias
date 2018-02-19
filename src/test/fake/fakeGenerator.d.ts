import { HashMap } from "./../../type-definitions";
import { IHashMapGenerator } from "./../../Generator/Generator";
declare class ModuleAliasGenerator implements IHashMapGenerator {
    build(dataHelper: string): HashMap<string, string>;
}
export = ModuleAliasGenerator;
