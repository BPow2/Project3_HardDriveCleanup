//import fs = require('fs');
import * as fs from 'fs';
//import path = require('path');
import * as path from 'path';
import {filesize} from "filesize";

const startingFolder = "C:\\Users\\bpow2\\Projects\\Coding\\testDir"

function fileStats(file: string): string {
    const size: number = getFileSize(file);
    return filesize(size);
}

function getFileSize(file: string): number {
    return fs.statSync(file).size;
}

function readFile(fileName: string): any {
    try {
        return fs.readFileSync(fileName, "utf8");
    } catch (err) {
        console.error("Error:", err);
    }
}

function readDirRecursive(dir: string, parentDir = './'): void {
    try {
        const files: string[]  = fs.readdirSync(dir);
        files.forEach((file:string) => {
            const filePath: string = path.join(dir, file);
            const stat: any = fs.statSync(filePath);
            if (stat.isDirectory()) {
                dirArr.push(
                    {
                        "path": filePath,
                        "type": "directory" ,  
                        "parent" : parentDir              
                    }
                )
                readDirRecursive(filePath, filePath);
            } else {
                dirArr.push(
                    {
                        "name": file,
                        "path": filePath,
                        "type": "file",
                        "size": fileStats(filePath),
                        "parent": parentDir
                    }
                )   
            }
        });
    } catch (err) {
        console.error("Error reading directory:", dir, err);
    }
}

if (process.argv.includes("-h") || process.argv.includes("--help")) {
    console.log(readFile("./help.txt"));
}

let dirArr: Array<object> = []
readDirRecursive(startingFolder);
console.log(dirArr)