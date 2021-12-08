import { INPUT } from "./input.js";

export default class Solver {
  #numberOfSegments;
  constructor() {
    this.#numberOfSegments = this.#initiateSegmentMap();
  }

  // Initiates a map containing the number of segments active
  // for each digit. (Key: number of active segments, value: the digit).
  #initiateSegmentMap = () => {
    const segmentMap = new Map();
    segmentMap.set(0, 6);
    segmentMap.set(1, 2);
    segmentMap.set(2, 5);
    segmentMap.set(3, 5);
    segmentMap.set(4, 4);
    segmentMap.set(5, 5);
    segmentMap.set(6, 6);
    segmentMap.set(7, 3);
    segmentMap.set(8, 7);
    segmentMap.set(9, 6);
    return segmentMap;
  };

  // Returns the digit output format as an array of arrays containing
  // each output string.
  #getArrayOfDigitOutput = () => {
    return [...INPUT].reduce((acc, curr) => {
      acc.push(curr.split(" | ")[1].split(" "));
      return acc;
    }, []);
  };

  solveProblemOne = () => {
    // Let's get only the digits (the part after the pipe, |).
    const digitOutput = this.#getArrayOfDigitOutput();
    // We want to focus on the easy digits
    const easyDigits = [1, 4, 7, 8];
    // Let's get the amount of active segments for each of the easy digits
    const allowedLengths = easyDigits.map((d) => this.#numberOfSegments.get(d));
    // Then we'll iterate over each code, and check if the amount of active segments
    // is included in the array containing the number of allowed active segments.
    // If it is, we increment the counter by one.
    const numEasyDigits = digitOutput.reduce((acc, curr) => {
      curr.map((segment) => {
        if (allowedLengths.includes(segment.length)) {
          acc++;
        }
        return acc;
      });
      return acc;
    }, 0);
    return numEasyDigits;
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
