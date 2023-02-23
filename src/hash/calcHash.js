import { createHash } from 'node:crypto';
import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {checkFileExists} from '../fs/checkerExists.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const sourceFileName = 'fileToCalculateHashFor.txt';
const pathFile = join(path, sourceFileName);

const calculateHash = async () => {
    const checkFile = await checkFileExists(pathFile);
    if(checkFile !== true) throw new Error('File not found');
    const text = await fs.readFile(pathFile);
    const hash = createHash('sha256')
                  .update(text)
                    .digest('hex');
    return console.log(hash);
};

await calculateHash();
