import { HashMap } from "./../../type-definitions";
import {IHashMapGenerator} from "./../../Generator/Generator";

class ModuleAliasGenerator implements IHashMapGenerator{
    build(dataHelper: string): HashMap<string, string>{
        return new HashMap<string, string>({
            "foo": "barez"
        });
    }
}


export = ModuleAliasGenerator; 