import { parentPort } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (numb) => {
    return nthFibonacci(numb)
};

parentPort.once('message', (msg)=>{
    const result = sendResult(msg.num);
    parentPort.postMessage({result: result, ind:msg.ind});
})
