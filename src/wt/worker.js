import { parentPort} from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = (numb) => {
    return nthFibonacci(numb)
};

parentPort.on('message', msg=>{
    // const obj = {
    //     status: 'error',
    //     data: null
    // }
    // if(typeof msg === 'number') {
    //     obj.status = 'resolved';
    //     obj.data = sendResult(msg);
    //     parentPort.postMessage(obj);
    // } else {
    //     parentPort.postMessage(obj);
    // }
    parentPort.postMessage(msg);
    parentPort.close()
})

