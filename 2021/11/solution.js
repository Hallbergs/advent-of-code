import { INPUT } from "./input.js";

export default class Solver {
  #rowLength;
  #totalFlashes;

  constructor() {
    this.#rowLength = INPUT[0].length;
    this.#totalFlashes = 0;
  }

  #getAdjacentIndexes = (index) => {
    return index % this.#rowLength === 0
      ? [
          index + 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength + 1,
          index + this.#rowLength + 1,
        ]
      : (index + 1) % this.#rowLength === 0
      ? [
          index - 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength - 1,
          index + this.#rowLength - 1,
        ]
      : [
          index - 1,
          index + 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength - 1,
          index + this.#rowLength - 1,
          index - this.#rowLength + 1,
          index + this.#rowLength + 1,
        ];
  };

  #handleStep = (energyLevels) => {
    const hasFlashed = new Set();
    for (let i = 0; i < energyLevels.length; i++) {
      energyLevels[i]++;
      if (energyLevels[i] > 9) {
        this.#handleFlash(energyLevels, i, hasFlashed);
      }
    }
  };

  #handleFlash = (energyLevels, flashIndex, hasFlashed) => {
    if (hasFlashed.has(flashIndex)) {
      return;
    }
    hasFlashed.add(flashIndex);
    this.#totalFlashes++;
    energyLevels[flashIndex] = 0;
    const adjacentIndexes = this.#getAdjacentIndexes(flashIndex);
    adjacentIndexes.forEach((index) => {
      if (index < 0 || index > energyLevels.length) return;
      energyLevels[index]++;
      if (energyLevels[index] > 9) {
        this.#handleFlash(energyLevels, index, hasFlashed);
      }
    });
  };

  solveProblemOne = () => {
    const energyLevels = [...INPUT]
      .join("")
      .split("")
      .map((string) => parseInt(string));
    console.log("before: ", energyLevels);
    const numSteps = 100;
    for (let i = 0; i < numSteps; i++) {
      this.#handleStep(energyLevels);
    }
    console.log(energyLevels);
    console.log("numFlashes: ", this.#totalFlashes);
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
