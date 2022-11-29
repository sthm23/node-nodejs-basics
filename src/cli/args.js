import {argv} from 'node:process';

const parseArgs = () => {
    const args = argv.slice(2)
    let str = args.reduce((acc, item, ind, arr) => {
        if(arr.length - 1 === ind && arr[ind-1].startsWith('--')){
            return acc += item;
        }else if(item.startsWith('--') && !arr[ind+1].startsWith('--')) {
            return acc += item + ' is ';
        }
        else if(!item.startsWith('--') && arr[ind-1]?.startsWith('--')) {
            return acc += item + ', '
        }else {
            return acc;
        }
    },'');

    return console.log(str);
};

parseArgs();