import { spawn } from 'node:child_process';

// const spawnChildProcess = async (args) => {
//     // Write your code here
// };

// spawnChildProcess();

const ls = spawn('node', ['src/wt/main.js', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});