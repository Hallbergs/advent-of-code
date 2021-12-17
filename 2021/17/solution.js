import { INPUT } from "./input.js";

export default class Solver {
  #target;
  #maxVelocity;
  #highestY;

  constructor() {
    this.#target = {
      minX: 269,
      minY: -68,
      maxX: 292,
      maxY: -44,
    };
    this.#maxVelocity = 500;
    this.#highestY = -Infinity;
  }

  #getInitialPositionMap = () => {
    return new Map([
      ["x", 0],
      ["y", 0],
    ]);
  };

  // Checks wether the supplied position is within the target area
  #positionIsWithinTarget = (currentPosition) => {
    const positionX = currentPosition.get("x");
    const positionY = currentPosition.get("y");
    const { minX, minY, maxX, maxY } = this.#target;
    return (
      positionX >= minX &&
      positionX <= maxX &&
      positionY >= minY &&
      positionY <= maxY
    );
  };

  // Checks wether the supplied position is beyond the target area
  #positionIsBeyondTarget = (currentPosition) => {
    const positionX = currentPosition.get("x");
    const positionY = currentPosition.get("y");
    const { minY, maxX } = this.#target;
    return positionX > maxX || positionY < minY;
  };

  // Updates the field containing the highest y-value
  #testForHighestY = (initialVelocity) => {
    const currentPosition = this.#getInitialPositionMap();
    let [velocityX, velocityY] = initialVelocity;
    let highest = -Infinity;
    let moving = true;
    while (moving) {
      currentPosition.set("x", currentPosition.get("x") + velocityX);
      currentPosition.set("y", currentPosition.get("y") + velocityY);
      highest =
        currentPosition.get("y") > highest ? currentPosition.get("y") : highest;

      if (this.#positionIsWithinTarget(currentPosition)) {
        this.#highestY = highest > this.#highestY ? highest : this.#highestY;
        moving = false;
        return;
      }
      if (this.#positionIsBeyondTarget(currentPosition)) {
        moving = false;
        return;
      }
      velocityX =
        velocityX > 0 ? (velocityX -= 1) : velocityX < 0 ? (velocityX += 1) : 0;
      velocityY--;
    }
  };

  solveProblemOne = () => {
    for (let x = 0; x < this.#maxVelocity; x++) {
      for (let y = -this.#maxVelocity; y < this.#maxVelocity; y++) {
        this.#testForHighestY([x, y]);
      }
    }
    return this.#highestY;
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
