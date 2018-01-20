#! /usr/bin/env node
var shell = require("shelljs");

var walk = require('fs-walk');
var fse = require('fs-extra');
var fs = require('fs');

var decamelize = require('decamelize');
var camelcase = require('camelcase');
var uppercamelcase = require('uppercamelcase');

const argv = require('minimist')(process.argv.slice(2));
const FILENAME = process.mainModule.filename;

const mensagemUso = "Uso: apc --c=comando -n=nome-do-modulo [--src=src do projeto] [--modules=diretorio de módulos do projeto]";

var pathPartes = FILENAME.split('\\');
pathPartes.pop();
BIN_PATH = pathPartes.join("\\");

const CURRENT_DIR = process.cwd();
var PROJECT_SRC = CURRENT_DIR + '\\' + argv.src;
var PROJECT_MODULES = CURRENT_DIR + '\\' + argv.modules;

if (!argv.src) {
    PROJECT_SRC = CURRENT_DIR + "\\src";
}
if (!argv.modules) {
    PROJECT_MODULES = CURRENT_DIR + "\\src\\app\\modulos";
}

const DEBUG = false;

if (fse.existsSync('package.json')) {
    var projectPackage = JSON.parse(fse.readFileSync('package.json', 'utf8'));
    if (!projectPackage.dependencies['@angular/common'] || DEBUG) {
        console.log("Não é um projeto Angular");
        if (!DEBUG) {
            process.exit(1);
        }
    }
} else {
    if (!DEBUG) {
        process.exit(2);
    }
}

function removerAcentos( newStringComAcento ) {
    var string = newStringComAcento;
    var mapaAcentosHex 	= {
        a : /[\xE0-\xE6]/g,
        e : /[\xE8-\xEB]/g,
        i : /[\xEC-\xEF]/g,
        o : /[\xF2-\xF6]/g,
        u : /[\xF9-\xFC]/g,
        c : /\xE7/g,
        n : /\xF1/g
    };

    for ( var letra in mapaAcentosHex ) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace( expressaoRegular, letra );
    }

    return string;
}

function dashCase(str) {
    var n = removerAcentos(str);
    n = n.replace(/[^a-zA-Z]/g, "-");
    n = n.toLowerCase();
    return decamelize(n, '-');
}

function refactorRename(name) {
    var dashedName = dashCase(name);
    var upperCamelName = uppercamelcase(dashedName);
    var camelName = camelcase(dashedName);
    var upperName = decamelize(camelName, "_");
    upperName = upperName.toUpperCase();

    var dictNames = {
        "clear-template" : dashedName,
        "ClearTemplate" : upperCamelName,
        "clearTemplate" : camelName,
        "CLEAR_TEMPLATE" : upperName
    };

    return dictNames;

}

function proccessRefactorRename(path, dictNames) {

    walk.walkSync(path, function(basedir, filename, stat) {

        if (!stat.isDirectory()) {

            var file = basedir + "\\" + filename;
            var content = fs.readFileSync(file, "utf8");

            var ext = filename.split(".")
            ext = ext[ext.length - 1];
            var newFile = filename;

            newFile = file.split("clear-template").join(dictNames["clear-template"]);
            newFile = newFile.split("\\\\").join("\\");
            for(var n in dictNames) {
                content = content.split(n).join(dictNames[n]);
            }
            /*
            content = content.split("clear-template").join(dictNames["clear-template"]);
            content = content.split("ClearTemplate").join(dictNames["ClearTemplate"]);
            content = content.split("clearTemplate").join(dictNames["clearTemplate"]);
            content = content.split("CLEAR_TEMPLATE").join(dictNames["CLEAR_TEMPLATE"]);
            */
            console.log(newFile);
            fs.renameSync (file, newFile);
            fs.writeFileSync(newFile, content, { encoding: "utf8" });
        }
    });

    console.log("DONE proccessRefactorRename");
}

switch (argv.c) {

    case "m":
    case "module": {
        if (!argv.n) {
            console.log("Warging: Nome do módulo não definido");
            console.log(mensagemUso);
            process.exit(3);
        }
        var dictNames = refactorRename(argv.n);
        var newModulePath = PROJECT_MODULES + "\\" + dictNames['clear-template'];
        if (newModulePath.charAt(newModulePath.length - 1) != "\\") {
            newModulePath += "\\";
        }
        fse.copySync(BIN_PATH + "\\templates\\module\\clear-template", newModulePath);
        proccessRefactorRename(newModulePath, dictNames);
        break;
    }

    default: {
        console.log(mensagemUso);
    }

}
