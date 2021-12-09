import { INPUT } from "./input.js";

export default class Solver {
  #rowLength;
  #adjacentIndexes;

  constructor() {
    this.#rowLength = INPUT[0].length;
    this.#adjacentIndexes = [-1, 1, -this.#rowLength, this.#rowLength];
  }

  #getAllLowPoints = (settings) => {
    // We can return an array of indexes, or values depending on
    // returnValue in settings. Let's get it
    const returnValue = settings?.returnValue ?? "VALUE";
    // Let's get the input as an array
    const combinedInput = [...INPUT].join("").split("");
    // Then we'll get the low-points and return them
    return combinedInput.reduce((acc, curr, cIndex) => {
      // We have a low-point if every index in the adjacent-array
      // leads to a value which is larger (or undefined) than the current value
      const currentIsLow = this.#adjacentIndexes.every((index) => {
        return parseInt(combinedInput[cIndex + index] ?? 99) > parseInt(curr);
      });
      // If we're dealing with a low-point, let's push the value or the index to the array.
      currentIsLow && acc.push(returnValue === "VALUE" ? curr : cIndex);
      return acc;
    }, []);
  };

  #initiateBasinsMap = (indexArray) => {
    const basinsMap = new Map();
    indexArray.forEach((index) => {
      basinsMap.set(index, []);
    });
    return basinsMap;
  };

  #updateBasins = (lowPointIndex, basins, usedIndexes, combinedInput) => {
    usedIndexes.add(lowPointIndex);
    !basins.has(lowPointIndex) && basins.set(lowPointIndex, []);
    const surroundingPoints = this.#getFreeSurroundingPoints(
      lowPointIndex,
      usedIndexes,
      combinedInput
    );
    surroundingPoints.forEach((surrounding) => {
      const isLowPoint = this.#adjacentIndexes.every((adjIndex) => {
        return (
          surrounding + adjIndex === lowPointIndex ||
          parseInt(combinedInput[surrounding + adjIndex] ?? 99) >
            parseInt(combinedInput[surrounding])
        );
      });
      if (isLowPoint && !usedIndexes.has(surrounding)) {
        for (const [key, value] of basins.entries()) {
          if (
            this.#adjacentIndexes.some((adjIndex) =>
              value.includes(surrounding + adjIndex)
            )
          ) {
            value.push(surrounding);
            basins.set(key, value);
            usedIndexes.add(surrounding);
          }
        }
        if (!usedIndexes.has(surrounding)) {
          const basinArray = basins.get(lowPointIndex);
          basinArray.push(surrounding);
          basins.set(lowPointIndex, basinArray);
        }

        this.#updateBasins(surrounding, basins, usedIndexes, combinedInput);
      }
    });
  };

  #getFreeSurroundingPoints = (index, usedIndexes, combinedInput) => {
    const surroundingPoints = [];
    this.#adjacentIndexes.forEach((adjIndex) => {
      const surroundingIndex = index + adjIndex;
      if (
        surroundingIndex > -1 &&
        surroundingIndex < combinedInput.length &&
        !usedIndexes.has(surroundingIndex)
      ) {
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
    const usedIndexes = new Set();
    const basins = this.#initiateBasinsMap(lowPointIndexes);
    lowPointIndexes.forEach((lowPointIndex) => {
      this.#updateBasins(lowPointIndex, basins, usedIndexes, combinedInput);
    });
    console.log("basins: ", basins);
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
