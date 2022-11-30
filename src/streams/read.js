import {stdout} from 'node:process';
import {createReadStream} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToRead.txt');

const read = async () => {
    const readable = createReadStream(sourcePath);
    // let str = '';
    // readable.on('data', (chunk)=>{
        // str += chunk.toString();
    // });

    readable.pipe(stdout);

    readable.on('end', ()=>{
        readable.unpipe(stdout);
        // console.log(str)
    });

    readable.on('error', (err)=>{
        throw new Error(err);
    })
};

await read();