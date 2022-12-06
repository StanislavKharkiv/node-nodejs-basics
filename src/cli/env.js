import {env} from 'node:process';

const parseEnv = () => {
    const rssKeys = Object.keys(env).filter(item => item.startsWith('RSS_'))
    const rssEnvItems = rssKeys.map(item => `${item}=${env[item]}`)
    console.log(rssEnvItems.join('; '))
};

parseEnv();
