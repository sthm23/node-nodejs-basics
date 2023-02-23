import {stdin} from 'node:process';
import {createWriteStream} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToWrite.txt');

const write = async () => {
    const writable = createWriteStream(sourcePath);
    stdin.on('data', (chunk)=>{
        writable.write(chunk.toString());
    });

    stdin.on('error', (err)=>{
        throw new Error(err);
    })
};

await write();