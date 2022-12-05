import {Worker, isMainThread} from 'node:worker_threads';
import * as os from 'os';
import {fileURLToPath} from 'node:url';
import { dirname, join } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = join(__dirname, 'worker.js');
const cpuCores = os.cpus();
const START_NUMBER = 10;

const performCalculations = async () => {
  const arrResultWorkers = [];

    if(isMainThread){
      for (let i = 0; i < cpuCores.length; i++) {
        const worker = new Worker(path);
        worker.postMessage(START_NUMBER + i)
        worker.on('message', (msg)=>{
          if(msg instanceof Error) {
            arrResultWorkers.push({
              status: 'Error',
              data: null
            });
          } else {
            arrResultWorkers.push({
              status: 'Resolved',
              data: msg
            });
          }
        })

        if(i === cpuCores.length - 1) {
          worker.on('exit', ()=>{
            console.log(arrResultWorkers);
          })
        }
      }
    }

};

await performCalculations();

