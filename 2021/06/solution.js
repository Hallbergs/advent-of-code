import { INPUT } from "./input.js";

export default class Solver {
  #initialTimer;
  #newBornTimer;

  constructor() {
    this.#newBornTimer = 8;
    this.#initialTimer = 6;
  }

  #getNumberOfFish = (numDays) => {
    let fish = [...INPUT];
    for (let i = 0; i < numDays; i++) {
      const newFish = [];
      for (let ii = 0; ii < fish.length; ii++) {
        if (fish[ii] !== 0) {
          fish[ii] = fish[ii] - 1;
        } else {
          newFish.push(this.#newBornTimer);
          fish[ii] = this.#initialTimer;
        }
      }
      newFish.forEach((f) => {
        fish.push(f);
      });
    }
    return fish.length;
  };

  solveProblemOne = () => {
    return this.#getNumberOfFish(80);
  };

  solveProblemTwo = () => {
    return this.#getNumberOfFish(80);
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
