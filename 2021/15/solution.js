import { INPUT } from "./input.js";

export default class Solver {
  #adjacentShifts;

  constructor() {
    this.#adjacentShifts = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
  }

  // Returns the points adjacent to the supplied point.
  // Also makes sure that the point is not outside of the map.
  #getAdjacentPoints = (map, point) => {
    const adjacentPoints = [];
    const [x, y] = point;
    this.#adjacentShifts.forEach((shift) => {
      const [dx, dy] = shift;
      const shiftedX = x + dx;
      const shiftedY = y + dy;
      if (map[shiftedY]?.[shiftedX]) {
        adjacentPoints.push([shiftedX, shiftedY]);
      }
    });
    return adjacentPoints;
  };

  // Calculates the total cost traveling from start to end
  #getMinimalCostToGoal = (map, start = [0, 0], end = [0, 0]) => {
    // We have to keep track o which points we've checked
    const checked = new Set();
    // We also have to keep track of the points and their cost
    const pointCostList = [{ position: start, cost: 0 }];
    // Then we iterate while we have points in the list
    while (pointCostList.length) {
      // Pop the last point of the stack
      const {
        position: [x, y],
        cost,
      } = pointCostList.pop();
      // If we've reached the end, we return the cost associated with that point
      if (x === end[0] && y === end[1]) {
        return cost;
      }
      // Otherwise, we get all points adjacent to the current point...
      const adjacentPoints = this.#getAdjacentPoints(map, [x, y]);
      //..and iterate over them
      adjacentPoints.forEach((point) => {
        const [x, y] = point;
        const pointKey = `${x}${y}`;
        // ...making sure we haven't already checked that point
        if (!checked.has(pointKey)) {
          // Then we add the point to the list of checked points
          checked.add(pointKey);
          // And add the point with its associated cost to the cost-list
          pointCostList.push({ position: point, cost: cost + map[y][x] });
        }
      });
      // Then we sort the list so that the point with the lowest cost is last
      pointCostList.sort((a, b) => b.cost - a.cost);
    }
  };

  solveProblemOne = () => {
    // We're gonna refer to the input as a map.
    const map = [...INPUT];
    // Let's declare the start and end points
    const start = [0, 0];
    const end = [map[0].length - 1, map.length - 1];
    // Then we'll get the lowest total cost from the start
    // to the goal, and return it.
    return this.#getMinimalCostToGoal(map, start, end);
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
