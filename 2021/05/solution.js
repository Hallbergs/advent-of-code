import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  // Parses an array of two strings, each string containing
  // a point (e.g: ["5,2", "5,5"]) to an object containing
  // the coordinates for the two points as integers.
  #getLineCoordinates = (line) => {
    const x0 = parseInt(line[0].split(",")[0], 10);
    const y0 = parseInt(line[0].split(",")[1], 10);
    const x1 = parseInt(line[1].split(",")[0], 10);
    const y1 = parseInt(line[1].split(",")[1], 10);
    return { x0, y0, x1, y1 };
  };

  // Checks wether we're dealing with an horizontal, vertical,
  // or diagonal line.
  #getLineType = (lineCoordinates) => {
    const { x0, y0, x1, y1 } = lineCoordinates;
    return x0 === x1 ? "VERTICAL" : y0 === y1 ? "HORIZONTAL" : "DIAGONAL";
  };

  solveProblemOne = () => {
    // We're gonna need a set to keep track of all occurrences
    const occurrences = new Map();
    // Then we'll set the occurring points for all lines
    INPUT.map((line) => {
      // We're gonna need the line coordinates...
      const { x0, y0, x1, y1 } = this.#getLineCoordinates(line);
      // ...and the line-type, to make sure we're not dealing
      // with a diagonal line.
      const lineType = this.#getLineType({ x0, y0, x1, y1 });
      // We're only interested in vertical and horizontal lines
      if (["VERTICAL", "HORIZONTAL"].includes(lineType)) {
        // To draw all points between the start- and end-point,
        // we get the number of points between the start and end.
        const diff = lineType === "VERTICAL" ? y1 - y0 : x1 - x0;
        // Check if we're dealing with a line going in a "positive" direction
        // or not.
        if (diff > 0) {
          // If it is going in a positive direction, we increment x (if we are
          // dealing with a horizontal line) or y (if we are dealing with a
          // vertical line). Then we set the value in the map (either 1 or +1)
          for (let i = 0; i <= diff; i++) {
            const point = `${lineType === "VERTICAL" ? x0 : x0 + i},${
              lineType === "VERTICAL" ? y0 + i : y0
            }`;
            const currentCount = occurrences.get(point);
            occurrences.set(point, currentCount ? currentCount + 1 : 1);
          }
        } else {
          // If it is going in a negative direction, we decrement x (if we are
          // dealing with a horizontal line) or y (if we are dealing with a
          // vertical line). Then we set the value in the map (either 1 or +1)
          for (let j = 0; j <= Math.abs(diff); j++) {
            const point = `${lineType === "VERTICAL" ? x0 : x0 - j},${
              lineType === "VERTICAL" ? y0 - j : y0
            }`;
            const currentCount = occurrences.get(point);
            occurrences.set(point, currentCount ? currentCount + 1 : 1);
          }
        }
      }
    });
    // We want to return the number of overlaps, let's count them and return
    let numOverlaps = 0;
    for (const value of occurrences.values()) {
      if (value >= 2) {
        numOverlaps++;
      }
    }
    return numOverlaps;
  };

  solveProblemTwo = () => {
    return null;
  };
}
// Initiate the class
const solver = new Solver();
// And run the solvers
console.time("solver");
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();
console.timeEnd("solver");

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
