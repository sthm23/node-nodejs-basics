import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { checkFileExists } from './checkerExists';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = _dirname + '/files/fresh.txt';
const text = 'I am fresh and young';

const create = async () => {
    const checkFile = await checkFileExists(path);
    if(checkFile === true) {
        throw new Error('FS operation failed');
    } else if (checkFile === false) {
        return await fsPromises.writeFile(path, text);
    } else {
        throw new Error(checkFile);
    }
}

await create();