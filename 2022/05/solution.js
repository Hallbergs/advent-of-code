import { INPUT } from "./input.js";

export default class Solver {
  #generateOriginalStack = () => {
    return new Map([
      ["1", "JHGMZNTF"],
      ["2", "VWJ"],
      ["3", "GVLJBTH"],
      ["4", "BPJNCDVL"],
      ["5", "FWSMPRG"],
      ["6", "GHCFBNVM"],
      ["7", "DHGMR"],
      ["8", "HNMVZD"],
      ["9", "GNFH"],
    ]);
  };

  solveProblemOne = () => {
    const stack = this.#generateOriginalStack();
    INPUT.forEach((row) => {
      const [num, from, to] = row.split(",");
      const chars = stack.get(from).slice(-num);
      stack.set(from, stack.get(from).slice(0, stack.get(from).length - num));
      stack.set(to, `${stack.get(to)}${chars.split("").reverse().join("")}`);
    });
    return [...stack.values()].reduce((a, c) => `${a}${c[c.length - 1]}`, "");
  };

  solveProblemTwo = () => {
    const stack = this.#generateOriginalStack();
    INPUT.forEach((row) => {
      const [num, from, to] = row.split(",");
      const chars = stack.get(from).slice(-num);
      stack.set(from, stack.get(from).slice(0, stack.get(from).length - num));
      stack.set(to, `${stack.get(to)}${chars}`);
    });
    return [...stack.values()].reduce((a, c) => `${a}${c[c.length - 1]}`, "");
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
