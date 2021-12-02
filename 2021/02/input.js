import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const INPUT = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf8")
  .toString()
  .trim()
  .split("\r\n");
