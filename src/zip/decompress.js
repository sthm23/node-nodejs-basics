import {pipeline} from 'node:stream';
import {createWriteStream, createReadStream} from 'node:fs';
import {createUnzip, constants} from 'node:zlib';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'archive.gz');
const newFilePath = join(path, 'fileToCompress.txt');

const decompress = async () => {
    pipeline(
        createReadStream(sourcePath),
        createUnzip(),
        createWriteStream(newFilePath),
        (err) => {
          if (err) {
            console.error('decompress failed.', err);
          } else {
            console.log('decompress succeeded.');
          }
        }
      );
};

await decompress();