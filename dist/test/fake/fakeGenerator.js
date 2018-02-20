"use strict";
const type_definitions_1 = require("./../../type-definitions");
class ModuleAliasGenerator {
    build(dataHelper) {
        return new type_definitions_1.HashMap({
            "foo": "barez"
        });
    }
}
module.exports = ModuleAliasGenerator;
