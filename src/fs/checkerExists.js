import * as fsPromises from 'fs/promises';

export async function checkFileExists(file) {
    return fsPromises.stat(file)
             .then((res) => res.isFile())
             .catch((err) => err.code === 'ENOENT' ? false : err)
}

export async function checkPathExists(path) {
    return fsPromises.stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
}