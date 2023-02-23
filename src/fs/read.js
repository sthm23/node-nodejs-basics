import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {checkFileExists, checkPathExists} from './checkerExists.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const sourceName = 'fileToRead.txt';
const readFilePath = join(path, sourceName);

const read = async () => {
    const checkFolder = await checkPathExists(path);
    if(checkFolder === true) {
        const checkFile = await checkFileExists(readFilePath);
        if(checkFile !== true) throw new Error('FS operation failed');
        const readText = await fsPromises.readFile(readFilePath, 'utf-8');
        return console.log(readText);
    } else {
        throw new Error('FS operation failed');
    }
};

await read();