import * as fsPromises from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = _dirname + '/files/fresh.txt';
const text = 'I am fresh and young';

const create = async () => {
    try {
        const stat = await fsPromises.stat(path);
        if(stat.isFile()) throw new Error('FS operation failed');
    } catch (err) {
        if(err.code === 'ENOENT') return await fsPromises.writeFile(path, text);
        return console.log(err);
    }
}

await create();