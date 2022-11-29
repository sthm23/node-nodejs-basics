import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {checkPathExists} from './checkerExists.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = _dirname + '/files';
const copyPath = _dirname + '/files_copy';

const copy = async () => {
    const checkPath = await checkPathExists(path);
    if(checkPath === false) {
        throw new Error('FS operation failed');
    } else if (checkPath === true) {

        const checkCopyPath = await checkPathExists(copyPath);
        if(checkCopyPath === true) {
            throw new Error('FS operation failed');
        } else if(checkCopyPath === false) {
            await fsPromises.mkdir(copyPath);
            const files = await fsPromises.readdir(path);
            for (const file of files) {
                const source = join(path, file);
                const destination = join(copyPath, file);
                await fsPromises.copyFile(source, destination);
            }
            return console.log('All files are copied!');
        } else {
            throw new Error(checkCopyPath);
        }
    } else {
        throw new Error(checkPath);
    }
}

copy();