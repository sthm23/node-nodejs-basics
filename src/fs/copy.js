import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = _dirname + '/files';
const copyPath = _dirname + '/files_copy';

const copy = async () => {
    fs.stat(path, async (err, stat) => {
        if(err === null) {

            fs.stat(copyPath, async (copyErr, re) => {
                if(copyErr === null) {
                    throw new Error('FS operation failed');
                } else if (copyErr.code === 'ENOENT') {
                    await fsPromises.mkdir(copyPath);
                    const files = await fsPromises.readdir(path);
                    for (const file of files) {
                        const source = join(path, file);
                        const destination = join(copyPath, file);
                        await fsPromises.copyFile(source, destination);
                    }
                } else {
                    throw new Error(copyErr);
                }
            })

        } else if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err);
        }
    })
}

copy();