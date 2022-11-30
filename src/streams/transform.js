import {Transform, pipeline} from 'stream';
import {stdin, stdout} from 'node:process';

const readable = stdin;
const writable = stdout;

const transform = async () => {
    const transform = new Transform({
        transform(chunk, enc, cb) {
            const chunkStr = chunk.toString().trim();
            const newStr = chunkStr.split('').reverse().join('');
            // this.push(newStr + '\n');
            // cb(new Error('oops'), newStr+'\n')
            cb(null, newStr+'\n')
        }
    });

    pipeline(
        readable,
        transform,
        writable,
        err=>{console.log(err);
        }
    );
};

await transform();