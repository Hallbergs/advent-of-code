import { INPUT } from "./input.js";

export default class Day_01 {
  constructor() {
    this.numIncrements = 0;
  }

  problem_01 = () => {
    // Let's make sure we're dealing with proper input
    if (!INPUT || INPUT.length < 1) return 0;
    // Make sure the counter is reset before beginning.
    this.numIncrements = 0;
    // Let's loop trough the array once
    for (let i = 0; i < INPUT.length - 1; i++) {
      // Get the current and next value
      const current = INPUT[i];
      const next = INPUT[i + 1];
      // If the next value is larger, we increment the counter
      if (next > current) {
        this.numIncrements++;
      }
    }
    // Finally, we return the results
    return this.numIncrements;
  };

  problem_02 = () => {
    // Let's make sure we're dealing with proper input
    if (!INPUT || INPUT.length < 3) return 0;
    // Make sure the counter is reset before beginning.
    this.numIncrements = 0;
    // Let's loop trough the array once
    for (let i = 0; i < INPUT.length - 3; i++) {
      // Let's calculate the current and next "window"
      const currentWindow = INPUT[i] + INPUT[i + 1] + INPUT[i + 2];
      const nextWindow = INPUT[i + 1] + INPUT[i + 2] + INPUT[i + 3];
      // If nextWindow is larger than the current window, we increment the counter
      if (nextWindow > currentWindow) {
        this.numIncrements++;
      }
    }
    // Finally, we return the results
    return this.numIncrements;
  };
}
// Initiate the class
const day_01 = new Day_01();
// And run the solvers
const answer_01 = day_01.problem_01();
const answer_02 = day_01.problem_02();

console.log(
  `Answer for problem 01: ${answer_01}. Answer for problem 02: ${answer_02}`
);
