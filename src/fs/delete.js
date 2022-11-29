import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {checkFileExists, checkPathExists} from './checkerExists.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const sourceName = 'fileToRemove.txt'
const deleteFilePath = join(path, sourceName);

const remove = async () => {
    const checkFolder = await checkPathExists(path);
    if(checkFolder === true) {
        const checkFile = await checkFileExists(deleteFilePath);
        if(checkFile === true) return await fsPromises.rm(deleteFilePath, {force: true}) || console.log('File removed!');
        throw checkFile === false ? new Error('FS operation failed') : new Error(checkFile);
    } else {
        throw checkFolder === false ? new Error('Incorrect path!') : new Error(checkFolder);
    }
};

await remove();