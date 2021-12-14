import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #initiateInsertionMap = (insertionRules) => {
    const insertionMap = new Map();
    insertionRules.forEach((rule) => {
      const [key, value] = rule.split(" -> ");
      insertionMap.set(key, value);
    });
    return insertionMap;
  };

  #getMostMinusLeastCommonCharacter = (templateArray) => {
    const counter = new Map();
    templateArray.forEach((character) => {
      counter.set(character, (counter.get(character) ?? 0) + 1);
    });

    const sortedCounter = new Map(
      [...counter.entries()].sort((a, b) => b[1] - a[1])
    );
    const sortedArray = [...sortedCounter.values()];
    return sortedArray[0] - sortedArray[sortedArray.length - 1];
  };

  #step = (templateArray, insertionMap) => {
    const originalArray = [...templateArray];
    let numAdded = 0;
    for (let i = 0; i < originalArray.length - 1; i++) {
      const pair = `${originalArray[i]}${originalArray[i + 1]}`;
      if (insertionMap.has(pair)) {
        templateArray.splice(i + 1 + numAdded, 0, insertionMap.get(pair));
        numAdded++;
      }
    }
  };

  solveProblemOne = () => {
    const templateArray = [...INPUT[0]];
    const insertionRules = [...INPUT[1]];

    const insertionMap = this.#initiateInsertionMap(insertionRules);

    for (let i = 0; i < 10; i++) {
      this.#step(templateArray, insertionMap);
    }
    return this.#getMostMinusLeastCommonCharacter(templateArray);
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
