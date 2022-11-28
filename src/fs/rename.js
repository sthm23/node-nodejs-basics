import * as fsPromises from 'fs/promises';
import * as fs from 'fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const sourceName = 'wrongFilename.txt'
const newName = 'properFilename.md';
const oldPath = join(path, sourceName);
const newPath = join(path, newName);


const rename = async () => {
    fs.stat(path, async (err, stat) => {
        if(err === null) {
            const newFile = await checkFileExists(newPath);
            const oldFile = await checkFileExists(oldPath);

            if(newFile && oldFile) {
                throw new Error('FS operation failed');
            } else if(newFile && !oldFile) {
                throw new Error('FS operation failed');
            } else if(!newFile && !oldFile) {
                throw new Error('FS operation failed');
            } else {
                fs.rename(oldPath, newPath, (renameErr) => {
                    if (err) throw renameErr;
                    console.log('Rename complete!');
                })
            }
        } else if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err);
        }
    })
};

await rename();

async function checkFileExists(file) {
    return fsPromises.access(file, fs.constants.F_OK)
             .then(() => true)
             .catch(() => false)
}
