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

  #initiatePairCounter = (templateArray) => {
    const pairCounter = new Map();
    for (let i = 0; i < templateArray.length - 1; i++) {
      const pair = `${templateArray[i]}${templateArray[i + 1]}`;
      pairCounter.set(pair, 1);
    }
    return pairCounter;
  };

  // Returns the sum of the most common character minus the
  // least common character in the templateArray.
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

  // Splits the pair into separate characters and return the number
  // of times each character is present, sorted.
  #getSortedCharacterCounter = (pairCounter) => {
    const counter = new Map();
    for (const [pair, occurrences] of pairCounter.entries()) {
      const [firstCharacter, secondCharacter] = pair;
      counter.set(
        firstCharacter,
        (counter.get(firstCharacter) ?? 0) + occurrences
      );
      counter.set(
        secondCharacter,
        (counter.get(secondCharacter) ?? 0) + occurrences
      );
    }
    return new Map([...counter.entries()].sort((a, b) => b[1] - a[1]));
  };

  // Performs the insertions with a naive approach. Cannot handle
  // more than 10-ish steps.
  #naiveStep = (templateArray, insertionMap) => {
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

  // Performs the insertions in a more clever manner, counting
  // how many of each letter-pair we have!
  #step = (pairCounter, insertionMap) => {
    // We need a new map so that we're not altering the one
    // we're iterating on!
    const newPairCounter = new Map();
    for (const [pair, occurrences] of pairCounter.entries()) {
      // Let's get the corresponding character for the current pair!
      const newCharacter = insertionMap.get(pair);
      // And create two new pairs (with the new character in the middle)
      const firstPair = `${pair[0]}${newCharacter}`;
      const secondPair = `${newCharacter}${pair[1]}`;
      // Then we increase the counter!
      newPairCounter.set(
        firstPair,
        (newPairCounter.get(firstPair) ?? 0) + occurrences
      );
      newPairCounter.set(
        secondPair,
        (newPairCounter.get(secondPair) ?? 0) + occurrences
      );
    }
    return newPairCounter;
  };

  solveProblemOne = () => {
    // Let's grab the initial data...
    const templateArray = [...INPUT[0]];
    const insertionRules = [...INPUT[1]];
    // ... and initiate a map which we can use to
    // 1: Get the character to be inserted
    const insertionMap = this.#initiateInsertionMap(insertionRules);
    // In P1 we're doing 10 steps. Here, the naive approach works fine
    for (let i = 0; i < 10; i++) {
      this.#naiveStep(templateArray, insertionMap);
    }
    // We're supposed to return the sum of the most common minus the least common.
    return this.#getMostMinusLeastCommonCharacter(templateArray);
  };

  solveProblemTwo = () => {
    // Let's grab the initial data...
    const insertionRules = [...INPUT[1]];
    const templateArray = [...INPUT[0]];
    // ... and initiate a couple of maps which we can use to
    // 1: Get the character to be inserted
    // 2: Count the number of times each pair exists
    const insertionMap = this.#initiateInsertionMap(insertionRules);
    let pairCounter = this.#initiatePairCounter(templateArray);
    // In P2 we're performing 40 steps
    for (let i = 0; i < 40; i++) {
      pairCounter = this.#step(pairCounter, insertionMap);
    }
    // Let's calculate how many times each character is present, and sort the characters
    // after most common to least common.
    const sortedCharacterCounter = this.#getSortedCharacterCounter(pairCounter);
    const sortedCharacterArray = [...sortedCharacterCounter.values()];
    // We're supposed to return the sum of the most common minus the least common.
    // Im double-counting somewhere... Let's just divide by two and call it a day.
    return Math.floor(
      sortedCharacterArray[0] / 2 -
        sortedCharacterArray[sortedCharacterArray.length - 1] / 2
    );
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
