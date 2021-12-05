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

  // Returns the number of times a point is overlapped
  // by two or more lines
  #getNumOverlaps = (occurrenceMap) => {
    let numOverlaps = 0;
    for (const value of occurrenceMap.values()) {
      if (value >= 2) {
        numOverlaps++;
      }
    }
    return numOverlaps;
  };

  // Returns a map containing all points and how many times each
  // point is "touched" by a line.
  #getOccurrenceMap = (settings) => {
    // Since we're not including diagonals in p1, we must provide
    // a way to ignore the diagonals.
    const includeDiagonals = settings.includeDiagonals ?? false;
    // Let's initiate a map that can keep track of all points
    const occurrences = new Map();
    // Then we'll loop over all the lines and update the map
    INPUT.map((line) => {
      // We're gonna need the line coordinates...
      const { x0, y0, x1, y1 } = this.#getLineCoordinates(line);
      // ...and the line-type, to make sure we're not dealing
      // with a diagonal line.
      const lineType = this.#getLineType({ x0, y0, x1, y1 });
      // We're handling the lineTypes a bit different, let's switch
      // between them!
      switch (lineType) {
        case "VERTICAL":
          // Let's start by calculating the vertical diff.
          const vDiff = y1 - y0;
          // Then we'll create new points that can be added (or updated)
          // in the map. The points are created by incrementing (or decrementing)
          // the starting-point all the way to the final point.
          for (let i = 0; i <= Math.abs(vDiff); i++) {
            const point = `${x0},${vDiff > 0 ? y0 + i : y0 - i}`;
            const currentCount = occurrences.get(point);
            occurrences.set(point, currentCount ? currentCount + 1 : 1);
          }
          break;
        case "HORIZONTAL":
          // Let's start by calculating the horizontal diff.
          const hDiff = x1 - x0;
          // Then we'll create new points that can be added (or updated)
          // in the map. The points are created by incrementing (or decrementing)
          // the starting-point all the way to the final point.
          for (let j = 0; j <= Math.abs(hDiff); j++) {
            const point = `${hDiff > 0 ? x0 + j : x0 - j},${y0}`;
            const currentCount = occurrences.get(point);
            occurrences.set(point, currentCount ? currentCount + 1 : 1);
          }
          break;
        case "DIAGONAL":
          // If we're not supposed to be dealing with diagonals, we abort.
          if (!includeDiagonals) break;
          // Otherwise, let's calculate some diffs
          const diffX = x1 - x0;
          const diffY = y1 - y0;
          // Then we'll create new points that can be added (or updated)
          // in the map. The points are created by incrementing (or decrementing)
          // the starting-point all the way to the final point.
          for (let k = 0; k <= Math.abs(diffX); k++) {
            const point = `${diffX > 0 ? x0 + k : x0 - k},${
              diffY > 0 ? y0 + k : y0 - k
            }`;
            const currentCount = occurrences.get(point);
            occurrences.set(point, currentCount ? currentCount + 1 : 1);
          }
          break;
        default:
          break;
      }
    });
    return occurrences;
  };

  solveProblemOne = () => {
    // Let's get a map with all occurrences (not counting diagonal lines)
    const occurrences = this.#getOccurrenceMap({ includeDiagonals: false });
    // We want to return the number of overlaps, let's get them and return
    return this.#getNumOverlaps(occurrences);
  };

  solveProblemTwo = () => {
    // Let's get a map with all occurrences (also counting diagonal lines)
    const occurrences = this.#getOccurrenceMap({ includeDiagonals: true });
    // We want to return the number of overlaps, let's get them and return
    return this.#getNumOverlaps(occurrences);
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
