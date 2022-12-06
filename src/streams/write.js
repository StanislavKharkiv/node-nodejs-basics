import process from "node:process";
import { createWriteStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";

const write = async () => {
  const ws = createWriteStream(
    `${getDirName(import.meta.url)}/files/fileToWrite.txt`
  );

  process.stdin.on("data", (data) => {
    ws.write(data);
  })
};

await write();
