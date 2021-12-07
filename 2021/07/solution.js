import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #getInputMedian = () => {
    // First we get the length of the array
    const inputLength = INPUT.length;
    // If we're passed an empty array we return null
    if (inputLength === 0) return 0;
    // Then we sort the array
    const sortedInput = [...INPUT].sort((a, b) => {
      return a - b;
    });
    console.log(sortedInput);
    // Then we get the middle index
    const middleIndex = Math.floor(inputLength / 2);
    // Uneven inputs are simple, just get the element
    // in the middle
    if (inputLength % 2 !== 0) {
      return sortedInput[middleIndex];
    }
    // If we're dealing with an even input, we have to combine the two
    // elements in the middle and divide by 2.
    return Math.ceil(
      (sortedInput[middleIndex - 1] + sortedInput[middleIndex]) / 2
    );
  };

  // Returns the total cost to the supplied point
  #getTotalCostToPoint = (point) => {
    let totalCost = 0;
    INPUT.forEach((position) => {
      totalCost += Math.abs(position - point);
    });
    return totalCost;
  };

  solveProblemOne = () => {
    // To get the least total cost for the fuel, we calculate the median position
    // and then we calculate the cost to the median point.
    const median = this.#getInputMedian();
    return this.#getTotalCostToPoint(median);
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
