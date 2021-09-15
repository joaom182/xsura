import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { COPY_COMMAND } from './commands/copy';

function init() {
  const yargsInstance = yargs(hideBin(process.argv));
  COPY_COMMAND(yargsInstance).argv;
}

init();

export {};
