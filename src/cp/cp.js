import { fork } from "node:child_process";
import { getDirName } from "../helpers/files.mjs";

const spawnChildProcess = async (args) => {
  fork(`${getDirName(import.meta.url)}/files/script.js`);
};

spawnChildProcess();
