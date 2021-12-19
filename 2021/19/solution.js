import { INPUT } from "./input.js";

export default class Solver {
  #rotations;

  constructor() {
    this.#rotations = [
      ([x, y, z]) => [x, y, z],
      ([x, y, z]) => [y, z, x],
      ([x, y, z]) => [z, x, y],
      ([x, y, z]) => [-x, z, y],
      ([x, y, z]) => [z, y, -x],
      ([x, y, z]) => [y, -x, z],
      ([x, y, z]) => [x, z, -y],
      ([x, y, z]) => [z, -y, x],
      ([x, y, z]) => [-y, x, z],
      ([x, y, z]) => [x, -z, y],
      ([x, y, z]) => [-z, y, x],
      ([x, y, z]) => [y, x, -z],
      ([x, y, z]) => [-x, -y, z],
      ([x, y, z]) => [-y, z, -x],
      ([x, y, z]) => [z, -x, -y],
      ([x, y, z]) => [-x, y, -z],
      ([x, y, z]) => [y, -z, -x],
      ([x, y, z]) => [-z, -x, y],
      ([x, y, z]) => [x, -y, -z],
      ([x, y, z]) => [-y, -z, x],
      ([x, y, z]) => [-z, x, -y],
      ([x, y, z]) => [-x, -z, -y],
      ([x, y, z]) => [-z, -y, -x],
      ([x, y, z]) => [-y, -x, -z],
    ];
  }

  solveProblemOne = () => {
    console.log("Haven't had time to solve this one yet... \n :(");
    return null;
  };

  solveProblemTwo = () => {
    return null;
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
