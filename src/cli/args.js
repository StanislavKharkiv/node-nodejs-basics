import {argv} from 'node:process';

const parseArgs = () => {
    console.log(argv.splice(2).join(' '))
};

parseArgs();
