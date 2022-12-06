import { INPUT } from "./input.js";

export default class Solver {
  #stringHasRepeats = (s) => {
    return /(.).*\1/.test(s);
  };

  solveProblemOne = () => {
    for (let i = 0; i < INPUT.length; i = i + 1) {
      const chars = INPUT.slice(i, i + 4);
      if (!this.#stringHasRepeats(chars)) {
        return i + 4;
      }
    }
  };

  solveProblemTwo = () => {
    for (let i = 0; i < INPUT.length; i = i + 1) {
      const chars = INPUT.slice(i, i + 14);
      if (!this.#stringHasRepeats(chars)) {
        return i + 14;
      }
    }
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
