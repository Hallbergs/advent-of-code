import { INPUT } from "./input.js";

export default class Solver {
  #getCharacterPriority = (char) =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char) + 1;

  #getBiggestRucksack = (s1, s2, s3) => {
    return [s1, s2, s3].reduce((a, b) => {
      return a.length > b.length ? a : b;
    });
  };

  solveProblemOne = () => {
    let sum = 0;
    INPUT.forEach((row) => {
      const comp1 = row.slice(0, row.length / 2);
      const comp2 = row.slice(row.length / 2, row.length);
      for (const char of comp1) {
        if (comp2.indexOf(char) !== -1) {
          sum += this.#getCharacterPriority(char);
          break;
        }
      }
    });
    return sum;
  };

  solveProblemTwo = () => {
    let sum = 0;
    for (let i = 0; i < INPUT.length; i += 3) {
      const s1 = INPUT[i];
      const s2 = INPUT[i + 1];
      const s3 = INPUT[i + 2];
      for (const char of this.#getBiggestRucksack(s1, s2, s3)) {
        if (s1.includes(char) && s2.includes(char) && s3.includes(char)) {
          sum += this.#getCharacterPriority(char);
          break;
        }
      }
    }
    return sum;
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
