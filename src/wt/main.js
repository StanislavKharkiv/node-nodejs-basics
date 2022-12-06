import threads from "node:worker_threads";
import os from "node:os";
import { getDirName } from "../helpers/files.mjs";
const { Worker } = threads;

const performCalculations = async () => {
  // one worker
  const worker = new Worker(`${getDirName(import.meta.url)}/worker.js`);
  worker.postMessage(8);
  worker.on("message", (data) => {
    console.log("one worker result: ", data);
  });
  worker.on("error", (err) => {
    console.log(err);
  });

  // multiple workers
  const cpuCores = os.cpus().length;
  const workerMessageNumber = 10;
  const workerResults = [];

  async function useWorker(i) {
    return new Promise((resolve) => {
      const worker = new Worker(`${getDirName(import.meta.url)}/worker.js`);
      worker.postMessage(workerMessageNumber + i);
      worker.on("message", (data) => {
        workerResults.push(data);
      });
      worker.on("error", (err) => {
        console.log({ status: "error", data: null });
        process.exit(3);
      });
      worker.on("exit", () => resolve());
    });
  }

  for (let i = 0; i < cpuCores; i++) {
    await useWorker(i);
  }
  console.log({ status: "resolved", data: workerResults });
};

await performCalculations();
