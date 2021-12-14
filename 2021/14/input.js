import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const INPUT = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\r\n")
  .reduce(
    (acc, line) => {
      if (line === "") {
        return acc;
      }
      if (line.includes("->")) {
        acc[1].push(line);
      } else {
        acc[0] = acc[0].concat(line);
      }
      return acc;
    },
    ["", []]
  );
