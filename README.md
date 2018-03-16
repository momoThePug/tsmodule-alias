# tsmodule-alias

[![NPM Version][npm-image]][npm-url]

> **NOTE:** Help me improve this project by reporting any issue.

Adds to Node module loader any alias defined in a Typescript configuration file. An example is available at https://github.com/momoThePug/tsmodule-alias-example

## Install

```
npm i --save @momothepug/tsmodule-alias
```

## Usage

Add these lines to your app's main file, before any code:

**Option A - Alias from Typescript file**

```js
// www.js, index.js, main.js, etc
const TSModuleAlias = require("@momothepug/tsmodule-alias");
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = "./";
// Makes it work with play method
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot);
// Alias map loaded to nodejs from typescript paths (optional)
console.log(aliasRegister.nodeRegister.aliasMap);
// Displays root module and typescript project path (optional)
console.log(aliasRegister.currentEnvironmentData);
```

**Option B - Alias from Typescript file With custom aliases**

```js
// www.js, index.js, main.js, etc
const TSModuleAlias = require("@momothepug/tsmodule-alias");
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = "./";
// Makes it work with play method, merging custom aliases
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot, {
  "@crazyAlias": __dirname + "/path/to/my/object"
});
// Alias map loaded to nodejs from typescript paths (optional)
console.log(aliasRegister.nodeRegister.aliasMap);
// Displays root module and typescript project path (optional)
console.log(aliasRegister.currentEnvironmentData);
```

**Option C - Dynamic aliases on the fly for development purpose**

You can override an alias value or define a new alias on runtime by invoking `addPathAlias("alias", "/path/to/your/module")` just like in our example:

```js
// www.js, index.js, main.js, etc
const TSModuleAlias = require("@momothepug/tsmodule-alias");
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = "./";
// Makes it work with play method
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot);
// Defining/overriding an alias programatically, path value must be an absolute path
aliasRegister.addPathAlias(
  "@my_dynamic_alias",
  __dirname + "/leo/orange/dog/orange"
);
```

**Option D - Dynamic aliases on the fly**

You can register aliases using an object like the following example:

```js
const tSModuleAlias = require("@momothepug/tsmodule-alias");

// make it work using custom alias before execution
const aliasRegister = tSModuleAlias.use({
  "@leoAlias": __dirname + "/leo/orange/dog/orange",
  "@pugpath/pug": __dirname + "/myfooobar/func",
  "@bar": __dirname + "/bar/bar"
});

console.log(require("@bar"));
console.log(require("@pugpath/pug")("Jhon Doe"));
console.log(require("@leoAlias"));
```

## Path resolution strategy

Only index zero will be used for path resolution in any alias definition. Ej:

```js
//  tsmodule-alias will resolve @root/* as "./src/*"
"@root/*": ["./src/*", "./moresrc/*", "./momosrc/*"]
```

## Nodejs & Typescript problem background

To avoid the path hell in typescript like the following example:

```typescript
import { MyClass } from "../../../my/own/module";
```

We can define aliases in tsconfig.json file using "paths" & "baseUrl" indexes:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./",
    "strict": false,
    "baseUrl": "./",
    "declaration": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "paths": {
      "@root/*": ["./src/*"],
      "@test/*": ["./src/test/*"],
      "@mybeautifulModule": ["./src/modules/my/module"],
      "@deepmodule": ["./../../../my/own/module"]
    }
  },
  "include": ["./", "src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

That way we can use our aliases in any import:

```typescript
import { MyClass } from "@deepmodule";
```

**But...**

There is a problem when you compile a typescript project to be consumed by a Node interpreter: Node cannot understand what the hell are typescript **Path Aliases**!. To solve that you can use tsmodule-alias to read and load aliases from your tsconfig file.

**Nodejs Error thrown by the interpreter (example)**

```
   module.js:471
    throw err;
    ^

Error: Cannot find module '@CrazyAliasDefinedInTypescriptAliasConfig'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at Object.<anonymous> (/home/youruser/crazy/path/you-mod/index.js:7:13)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)

npm ERR! CrazyOS 4.14.14-200.fc26.x86_64
npm ERR! argv "/usr/bin/node" "/usr/bin/npm" "run" "start"
npm ERR! node v6.12.0
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! you-mod@1.0.0 start: ` npm run build && node index.js `
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the you-mod@1.0.0 start script ' npm run build && node index.js '.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the you-mod package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!      npm run build && node index.js
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs you-mod
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls you-mod
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     /home/youruser/crazy/path/you-mod/npm-debug.log
```

:p Be happy

[npm-image]: https://img.shields.io/npm/v/@momothepug/tsmodule-alias.svg
[npm-url]: https://npmjs.org/package/@momothepug/tsmodule-alias
