import { INPUT } from "./input.js";

export default class Solver {
  #rowLength;
  #adjacentIndexes;

  constructor() {
    this.#rowLength = INPUT[0].length;
    this.#adjacentIndexes = [-1, 1, -this.#rowLength, this.#rowLength];
  }

  solveProblemOne = () => {
    // Let's get the input as an array
    const combinedInput = [...INPUT].join("").split("");
    // Then we'll get the low-points...
    const lowPoints = combinedInput.reduce((acc, curr, cIndex) => {
      // We have a low-point if every index in the adjacent-array
      // leads to a value which is larger (or undefined) than the current value
      const currentIsLow = this.#adjacentIndexes.every((index) => {
        return parseInt(combinedInput[cIndex + index] ?? 99) > parseInt(curr);
      });
      // If we're dealing with a low-point, let's push it to the array.
      currentIsLow && acc.push(curr);
      return acc;
    }, []);
    // We want to return the sum of each low-point incremented by one,
    // so let's summarize.
    return lowPoints.reduce((acc, curr) => {
      return (acc += parseInt(curr) + 1);
    }, 0);
  };

  solveProblemTwo = () => {};
}
// Initiate the class
const solver = new Solver();
// And run the solvers
console.time("P1");
const answerOne = solver.solveProblemOne();
console.timeEnd("P1");

console.time("P2");
const answerTwo = solver.solveProblemTwo();
console.timeEnd("P2");

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
