import { INPUT } from "./input.js";

export default class Solver {
  #rowLength;

  constructor() {
    this.#rowLength = INPUT[0].length;
  }

  // Returns all low-points present in the input
  #getAllLowPoints = (settings) => {
    // We can return an array of indexes, or values depending on
    // returnValue in settings. Let's get it
    const returnValue = settings?.returnValue ?? "VALUE";
    // Let's get the input as an array
    const combinedInput = [...INPUT].join("").split("");
    // Then we'll get the low-points and return them
    return combinedInput.reduce((acc, curr, cIndex) => {
      // We have a low-point if every shift in the adjacent-shift-array
      // leads to a value which is larger (or undefined) than the current value
      // Let's create the array of shifts that can be used to get the adjacent points
      const adjacentShifts = this.#getAdjacentShifts(cIndex);
      const currentIsLow = adjacentShifts.every((shift) => {
        return parseInt(combinedInput[cIndex + shift] || 99) > parseInt(curr);
      });
      // If we're dealing with a low-point, let's push the value or the index to the array.
      currentIsLow && acc.push(returnValue === "VALUE" ? curr : cIndex);
      return acc;
    }, []);
  };

  // Initiates a Map that keeps track of all basins
  #initiateBasinsMap = (indexArray) => {
    const basinsMap = new Map();
    indexArray.forEach((index) => {
      basinsMap.set(index, [index]);
    });
    return basinsMap;
  };

  // Returns shifts that can be used to get the surrounding points
  #getAdjacentShifts = (index) => {
    return index % this.#rowLength === 0
      ? [1, -this.#rowLength, this.#rowLength]
      : (index + 1) % this.#rowLength === 0
      ? [-1, -this.#rowLength, this.#rowLength]
      : [-1, 1, -this.#rowLength, this.#rowLength];
  };

  // Recursive function which takes a low-point and gets the chain of points
  // belonging to the low-point.
  #updateBasins = (lowPointIndex, basins, usedIndexes, combinedInput) => {
    const surroundingPoints = this.#getSurroundingPoints(
      lowPointIndex,
      combinedInput
    );
    const pointsToAdd = surroundingPoints.filter((point) => {
      return (
        parseInt(combinedInput[point]) >
          parseInt(combinedInput[lowPointIndex]) &&
        parseInt(combinedInput[point]) !== 9
      );
    });
    pointsToAdd.forEach((point) => {
      if (!usedIndexes.has(point)) {
        const adjacentShifts = this.#getAdjacentShifts(point);
        for (const [key, value] of basins.entries()) {
          if (adjacentShifts.some((shift) => value.includes(point + shift))) {
            value.push(point);
            basins.set(key, value);
            usedIndexes.add(point);
          }
        }
        this.#updateBasins(point, basins, usedIndexes, combinedInput);
      }
    });
  };

  // Returns all surrounding points (indexes) for the supplied point
  #getSurroundingPoints = (index, combinedInput) => {
    const surroundingPoints = [];
    const adjacentIndexes = this.#getAdjacentShifts(index);
    adjacentIndexes.forEach((shift) => {
      const surroundingIndex = index + shift;
      if (surroundingIndex > -1 && surroundingIndex < combinedInput.length) {
        surroundingPoints.push(surroundingIndex);
      }
    });
    return surroundingPoints;
  };

  solveProblemOne = () => {
    // Let's get all the low-points
    const lowPoints = this.#getAllLowPoints({ returnValue: "VALUE" });
    // We want to return the sum of each low-point incremented by one,
    // so let's summarize.
    return lowPoints.reduce((acc, curr) => {
      return (acc += parseInt(curr) + 1);
    }, 0);
  };

  solveProblemTwo = () => {
    // Let's get all the low-points
    const lowPointIndexes = this.#getAllLowPoints({ returnValue: "INDEX" });
    // Let's get the input as an array
    const combinedInput = [...INPUT].join("").split("");
    // Let's initiate a set in which we can keep track of used numbers.
    const usedIndexes = new Set();
    // Let's initiate a Map where we can keep track of all the basins
    const basins = this.#initiateBasinsMap(lowPointIndexes);
    // Then we start constructing the basins!
    lowPointIndexes.forEach((lowPointIndex) => {
      this.#updateBasins(lowPointIndex, basins, usedIndexes, combinedInput);
    });
    // We want to extract the three largest basins, so lets sort the basins
    const sortedBasins = new Map(
      [...basins.entries()].sort((a, b) => {
        return b[1].length - a[1].length;
      })
    );
    // We want to return the product of the length of the
    // three largest basins. Let's get them and return
    const [first, second, third] = sortedBasins.values();
    return first.length * second.length * third.length;
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
