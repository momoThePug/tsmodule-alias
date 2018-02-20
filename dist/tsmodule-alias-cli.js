"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 1 - Verificar si se pasa el project como argumento, de lo contrario usar el current path
 * 2 - Verificar si existe un archivo llamado tsconfig.json
 * 3 - si no existe, buscar el archivo
 * 4 - invocar el ModuleAliasGenerator
 * 5 - si se paso un segundo argumento entonces se utiliza como archivo destino invocar a Setup
 */
let fs = require("fs");
let path = require("path");
let chalk = require("chalk");
let Confirm = require('prompt-confirm');
const log = console.log;
const pkg = require('../package.json');
class TSModuleAlias {
}
exports.TSModuleAlias = TSModuleAlias;
let tsModuleAlias = new TSModuleAlias();
