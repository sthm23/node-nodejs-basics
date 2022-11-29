import { env } from 'node:process';

const parseEnv = () => {
    let str = '';
    for (const key in env) {
        if (Object.hasOwnProperty.call(env, key)) {
            const element = env[key];
            if(key.startsWith('RSS_')) {
                str += `${key}=${element}; `;
            }
        }
    }
    str = str.split(';')
            .filter((item, ind, arr)=> arr.length-1 !== ind)
            .join(';');
    return console.log(str);
};

parseEnv();