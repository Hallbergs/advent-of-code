import { INPUT } from "./input.js";

export default class Solver {
  solveProblemOne = () => {
    const moves = { p: ["X", "Y", "Z"], o: ["A", "B", "C"] };
    const mb = new Map([
      ["X", "C"],
      ["Y", "A"],
      ["Z", "B"],
    ]);
    return INPUT.reduce((a, c) => {
      const [o, p] = c.split(" ");
      const mi = moves.p.indexOf(p);
      return a + (mb.get(p) === o ? 6 : o === moves.o[mi] ? 3 : 0) + mi + 1;
    }, 0);
  };

  solveProblemTwo = () => {};
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
