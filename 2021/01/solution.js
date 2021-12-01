import { INPUT } from "./input.js";

export default class Solver {
  constructor() {
    this.numIncrements = 0;
  }

  solveProblemOne = () => {
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

  solveProblemTwo = () => {
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
const solver = new Solver();
// And run the solvers
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
