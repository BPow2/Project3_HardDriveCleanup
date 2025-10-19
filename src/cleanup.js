"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import fs = require('fs');
var fs = require("fs");
//import path = require('path');
var path = require("path");
var filesize_1 = require("filesize");
var startingFolder = "C:\\Users\\bpow2\\Projects\\Coding\\testDir";
function fileStats(file) {
    var size = getFileSize(file);
    return (0, filesize_1.filesize)(size);
}
function getFileSize(file) {
    return fs.statSync(file).size;
}
function readFile(fileName) {
    try {
        return fs.readFileSync(fileName, "utf8");
    }
    catch (err) {
        console.error("Error:", err);
    }
}
function readDirRecursive(dir, parentDir) {
    if (parentDir === void 0) { parentDir = './'; }
    try {
        var files = fs.readdirSync(dir);
        files.forEach(function (file) {
            var filePath = path.join(dir, file);
            var stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                dirArr.push({
                    "path": filePath,
                    "type": "directory",
                    "parent": parentDir
                });
                readDirRecursive(filePath, filePath);
            }
            else {
                dirArr.push({
                    "name": file,
                    "path": filePath,
                    "type": "file",
                    "size": fileStats(filePath),
                    "parent": parentDir
                });
            }
        });
    }
    catch (err) {
        console.error("Error reading directory:", dir, err);
    }
}
if (process.argv.includes("-h") || process.argv.includes("--help")) {
    console.log(readFile("./help.txt"));
}
var dirArr = [];
readDirRecursive(startingFolder);
console.log(dirArr);
