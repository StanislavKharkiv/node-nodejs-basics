import process from "node:process";
import { createReadStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";
const read = async () => {
  const filePath = `${getDirName(import.meta.url)}/files/fileToRead.txt`;
  createReadStream(filePath).pipe(process.stdout);
};

await read();
