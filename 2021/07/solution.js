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

  #getInputAverage = () => {
    // First we get the length of the array
    const inputLength = INPUT.length;
    // If we're passed an empty array we return null
    if (inputLength === 0) return 0;
    // Then we get the sum of the array elements
    const inputSum = INPUT.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
    // The we return the sum divided by the number of elements in the array
    return Math.ceil(inputSum / inputLength);
  };

  // Returns the total cost to the supplied point, either
  // for constant a burn-rate, or for a linear burn-rate.
  #getTotalCostToPoint = (point, burnType) => {
    let totalCost = 0;
    if (burnType === "CONSTANT") {
      INPUT.forEach((position) => {
        totalCost += Math.abs(position - point);
      });
      return totalCost;
    }
    if (burnType === "LINEAR") {
      INPUT.forEach((position) => {
        const distance = Math.abs(position - point);
        totalCost += Math.floor(
          distance * (distance + 1) * ((2 * distance + 1) / 6)
        );
      });
      return totalCost;
    }
    return null;
  };

  solveProblemOne = () => {
    // To get the least total cost for the fuel, we calculate the median position
    // and then we calculate the cost to the median point.
    const median = this.#getInputMedian();
    return this.#getTotalCostToPoint(median, "CONSTANT");
  };

  solveProblemTwo = () => {
    // Turns out that the fuel burn rate is not constant,
    // so the median solution won't give us the correct answer.
    // (Since we might have outliers far away that will make the
    // fuel consumption explode). Let's try with the average instead!
    const average = this.#getInputAverage();
    return this.#getTotalCostToPoint(average, "LINEAR");
  };
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
