import { INPUT } from "./input.js";

export default class Day_01 {
  constructor() {
    this.numIncrements = 0;
  }

  problem_01 = () => {
    if (INPUT.length < 1) return 0;
    this.numIncrements = 0;
    for (let i = 1; i < INPUT.length; i++) {
      if (INPUT[i] > INPUT[i - 1]) {
        this.numIncrements += 1;
      }
    }
    return this.numIncrements;
  };

  problem_02 = () => {
    if (INPUT.length < 3) return 0;
    this.numIncrements = 0;
    for (let i = 0; i < INPUT.length; i++) {
      if (i + 3 > INPUT.length) break;
      const tempSum1 = INPUT[i] + INPUT[i + 1] + INPUT[i + 2];
      const tempSum2 = INPUT[i + 1] + INPUT[i + 2] + INPUT[i + 3];
      if (tempSum1 < tempSum2) {
        this.numIncrements += 1;
      }
    }
    return this.numIncrements;
  };
}

const day_01 = new Day_01();
const answer_01 = day_01.problem_01();
const answer_02 = day_01.problem_02();

console.log(
  `Answer for problem 01: ${answer_01}. Answer for problem 02: ${answer_02}`
);
