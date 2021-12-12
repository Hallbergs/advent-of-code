import { INPUT } from "./input.js";

export default class Solver {
  #rowLength;
  #totalFlashes;

  constructor() {
    this.#rowLength = INPUT[0].length;
    this.#totalFlashes = 0;
  }

  // Returns the indexes of all points adjacent to the supplied index
  #getAdjacentIndexes = (index, array) => {
    return index % this.#rowLength === 0 || index === 0
      ? [
          index + 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength + 1,
          index + this.#rowLength + 1,
        ].filter((index) => index >= 0 && index < array.length)
      : (index + 1) % this.#rowLength === 0
      ? [
          index - 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength - 1,
          index + this.#rowLength - 1,
        ].filter((index) => index >= 0 && index < array.length)
      : [
          index - 1,
          index + 1,
          index - this.#rowLength,
          index + this.#rowLength,
          index - this.#rowLength - 1,
          index + this.#rowLength - 1,
          index - this.#rowLength + 1,
          index + this.#rowLength + 1,
        ].filter((index) => index >= 0 && index < array.length);
  };

  // Entrypoint for each step, increments each value by one
  // then checks if there is a flash, and handles it accordingly
  #handleStep = (energyLevels) => {
    // We need a Set to keep track of all the subs that have
    // already flashed
    const hasFlashed = new Set();
    // Then we increment each energyLevel by one
    for (let i = 0; i < energyLevels.length; i++) {
      energyLevels[i]++;
    }
    // Then we check for flashes...
    for (let j = 0; j < energyLevels.length; j++) {
      if (energyLevels[j] > 9) {
        // If we have a flash, we add the sub to the Set of
        // flashers
        hasFlashed.add(j);
        // Then we set the energy level to 0 (according to the instructions)
        energyLevels[j] = 0;
        // Then we handle the side-effects
        this.#handleFlashSideEffects(energyLevels, j, hasFlashed);
      }
    }
    // Finally, we add all flashed from this step to the total number of flashes.
    this.#totalFlashes += hasFlashed.size;
  };

  // Handles the side-effects when a sub has flashed
  #handleFlashSideEffects = (energyLevels, flashIndex, hasFlashed) => {
    // When a sub flashes, all surrounding subs increments their energy by one.
    // First we get all surrounding indexes.
    const adjacentIndexes = this.#getAdjacentIndexes(flashIndex, energyLevels);
    for (let i = 0; i < adjacentIndexes.length; i++) {
      const index = adjacentIndexes[i];
      // If the energy of the surrounding sub isn't 0 (already flashed)
      // we increment its energy by one.
      energyLevels[index] !== 0 && energyLevels[index]++;
      // If the energy is large enough to create a flash, and if the sub
      // hasn't already flashed this step, it will flash!
      if (energyLevels[index] > 9 && !hasFlashed.has(index)) {
        // If we have a flash, we add the sub to the Set of
        // flashers
        hasFlashed.add(index);
        // Then we set the energy level to 0 (according to the instructions)
        energyLevels[index] = 0;
        // Then we handle the side-effects
        this.#handleFlashSideEffects(energyLevels, index, hasFlashed);
      }
    }
  };

  solveProblemOne = () => {
    const energyLevels = [...INPUT]
      .join("")
      .split("")
      .map((string) => parseInt(string));
    for (let i = 0; i < 100; i++) {
      this.#handleStep(energyLevels);
    }
    return this.#totalFlashes;
  };

  solveProblemTwo = () => {
    const energyLevels = [...INPUT]
      .join("")
      .split("")
      .map((string) => parseInt(string));
    let step = 0;
    // In P2 we want to check at which step all subs will flash at
    // the same time. This will occur the step after all subs have a
    // energy-level of zero. Let's check for that!
    while (step > -1) {
      this.#handleStep(energyLevels);
      const allFlashed = energyLevels.every((energyLevel) => {
        return energyLevel === 0;
      });
      if (allFlashed) {
        return step + 1;
      }
      step++;
    }
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
