# tsmodule-alias

[![NPM Version][npm-image]][npm-url]

Adds to the Node module loader any alias defined in a Typescript configuration file. An example is available at https://github.com/momoThePug/tsmodule-alias-example

## Install

```
npm i --save @momothepug/tsmodule-alias
```

## Usage

Add this line to the main file of your app, before any code:

```js
// www.js, index.js, main.js, etc
const TSModuleAlias = require("@momothepug/tsmodule-alias");
// Path from package.json to your tsconfig.json file
const tsconfigToReadFromRoot = "./";
// Makes it work with play method
const aliasRegister = TSModuleAlias.play(tsconfigToReadFromRoot);
// Alias map loaded to nodejs from typescript paths
console.log(aliasRegister.nodeRegister.aliasMap);
// Displays root module and typescript project path
console.log(aliasRegister.currentEnvironmentData);
```

## Nodejs & Typescript problem background

To avoid this:

```typescript
import { MyClass } from "../../../my/own/module";
```

We can define in a typescript configuration file:

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

Now we can use our alias in any import:

```typescript
import { MyClass } from "@deepmodule";
```

But... there is a problem when you compile this project to be used by a Node interpreter: Node interpreter cannot understand what the hell are typescript **Path Aliases**!

To solve that we can use tsmodule-alias to read and load aliases from our tsconfig file.

[npm-image]: https://img.shields.io/npm/v/@momothepug/tsmodule-alias.svg
[npm-url]: https://npmjs.org/package/@momothepug/tsmodule-alias
