import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const INPUT = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\r\n")
  .filter((row) => row !== "")
  .reduce(
    (acc, curr) => {
      if (curr.includes("fold")) {
        acc[1].push(curr.split(" ")[curr.split(" ").length - 1]);
      } else {
        acc[0].push(curr);
      }
      return acc;
    },
    [[], []]
  );
