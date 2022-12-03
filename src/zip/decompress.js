import zlib from "node:zlib";
import { createWriteStream, createReadStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";
import { pipeline } from "node:stream";

const decompress = async () => {
  const filesPath = `${getDirName(import.meta.url)}/files`;
  const rs = await createReadStream(`${filesPath}/archive.gz`);
  const ws = createWriteStream(`${filesPath}/fileToCompress.txt`);
  rs.pipe(zlib.createGunzip()).pipe(ws);
};

await decompress();
