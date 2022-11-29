import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {checkFileExists, checkPathExists} from './checkerExists.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const sourceName = 'wrongFilename.txt'
const newName = 'properFilename.md';
const oldPath = join(path, sourceName);
const newPath = join(path, newName);

const rename = async () => {
    const checkPath = await checkPathExists(path);
    if(checkPath === false) {
        throw new Error('FS operation failed');
    } else if (checkPath === true) {
        const newFile = await checkFileExists(newPath);
        const oldFile = await checkFileExists(oldPath);

        if(newFile === false && oldFile === true) {
            const result = await fsPromises.rename(oldPath, newPath);
            return result === undefined ? console.log('Rename complete!') : result;
        }
        throw new Error('FS operation failed');
    } else {
        throw new Error(checkPath);
    }
};

await rename();


