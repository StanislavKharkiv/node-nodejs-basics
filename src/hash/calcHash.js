import { createReadStream } from "node:fs";
import { getDirName } from "../helpers/files.mjs";
const { createHash } = await import("node:crypto");

const calculateHash = async () => {
  const filename = `${getDirName(import.meta.url)}/files/fileToCalculateHashFor.txt`;
  const hash = createHash("sha256");

  const input = createReadStream(filename);
  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(hash.digest("hex"));
    }
  });
};

await calculateHash();
