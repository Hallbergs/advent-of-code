import { INPUT } from "./input.js";

export default class Solver {
  constructor() {
    this.stack = new Map([
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

    this.stack2 = new Map([
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
  }
  solveProblemOne = () => {
    INPUT.forEach((row) => {
      const [num, from, to] = row.split(",");
      const chars = this.stack.get(from).slice(-num);
      this.stack.set(
        from,
        this.stack.get(from).slice(0, this.stack.get(from).length - num)
      );
      this.stack.set(
        to,
        `${this.stack.get(to)}${chars.split("").reverse().join("")}`
      );
    });
    return [...this.stack.values()].reduce(
      (a, c) => `${a}${c[c.length - 1]}`,
      ""
    );
  };

  solveProblemTwo = () => {
    INPUT.forEach((row) => {
      const [num, from, to] = row.split(",");
      const chars = this.stack2.get(from).slice(-num);
      this.stack2.set(
        from,
        this.stack2.get(from).slice(0, this.stack2.get(from).length - num)
      );
      this.stack2.set(to, `${this.stack2.get(to)}${chars}`);
    });
    return [...this.stack2.values()].reduce(
      (a, c) => `${a}${c[c.length - 1]}`,
      ""
    );
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
