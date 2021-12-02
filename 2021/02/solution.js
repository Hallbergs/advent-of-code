import { INPUT } from "./input.js";
import Submarine from "./submarine.js";
export default class Solver {
  constructor() {}

  solveProblemOne = () => {
    // Initiate a new submarine
    const subMarine = new Submarine();
    // Then we'll tell the submarine to move according to
    // all commands in the input
    INPUT.forEach((command) => {
      subMarine.move(command);
    });
    // Then we'll get the subMarine position after all the commands
    const { x, y } = subMarine.getPosition();
    // In problem one, they are looking for the product of
    // the position (x) and the depth (y)
    return x * y;
  };

  solveProblemTwo = () => {
    // Initiate a new submarine
    const subMarine = new Submarine();
    // Then we'll tell the submarine to move according to
    // all commands in the input. We also set the second parameter
    // (includeAim) to true.
    INPUT.forEach((command) => {
      subMarine.move(command, true);
    });
    // Then we'll get the subMarine position after all the commands
    const { x, y } = subMarine.getPosition();
    // In problem two, they are looking for the product of
    // the position (x) and the depth (y)
    return x * y;
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
