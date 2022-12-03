import zlib from "node:zlib";
import { createWriteStream, createReadStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";
import { pipeline } from "node:stream";

const compress = async () => {
  const filesPath = `${getDirName(import.meta.url)}/files`;

  pipeline(
    createReadStream(`${filesPath}/fileToCompress.txt`),
    zlib.createGzip(),
    createWriteStream(`${filesPath}/archive.gz`),
    (err) => console.log(err)
  );
};

await compress();
