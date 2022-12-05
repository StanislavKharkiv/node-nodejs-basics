import threads from "node:worker_threads";
// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // This function sends result of nthFibonacci computations to main thread
  threads.parentPort.on('message', data => {
    threads.parentPort.postMessage(nthFibonacci(data));
    process.exit(0);
  })
};

sendResult();
