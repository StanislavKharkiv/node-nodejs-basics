import process from "node:process";
import { createWriteStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";
import { pipeline, Transform } from "node:stream";

const transform = async () => {
  const rs = process.stdin;
  const ws = createWriteStream(
    `${getDirName(import.meta.url)}/files/fileToWrite.txt`
  );

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const reversed = chunk.toString().split('').reverse().join('');
      this.push(reversed);
      cb();
    },
  });

  pipeline(rs, transform, ws, err => console.log(err));
};

await transform();
