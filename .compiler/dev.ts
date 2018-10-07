import devServer from './dev.server'
import electron from 'electron';
import { spawn } from 'child_process';
// import mainServer  from './main.server';
console.log(electron);
spawn(`${electron}`);
const init = async function f() : Promise<void> {
  try {
    await devServer()
  } catch (error) {
    console.log(error)
  }
}

init()
