import {pipeline} from 'node:stream';
import {createWriteStream, createReadStream} from 'node:fs';
import {createGzip, constants} from 'node:zlib';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToCompress.txt');
const newFilePath = join(path, 'archive.gz');

const compress = async () => {
    pipeline(
        createReadStream(sourcePath),
        createGzip(),
        createWriteStream(newFilePath),
        (err) => {
          if (err) {
            console.error('compress failed.', err);
          } else {
            console.log('compress succeeded.');
          }
        }
      );
};

await compress();