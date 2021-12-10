import { INPUT } from "./input.js";

export default class Solver {
  #openingBrackets;
  #closingBrackets;
  #costs;
  #costInfo;
  #bracketInfo;

  constructor() {
    this.#openingBrackets = ["(", "[", "{", "<"];
    this.#closingBrackets = [")", "]", "}", ">"];
    this.#costs = [3, 57, 1197, 25137];

    this.#bracketInfo = this.#initiateBracketInfo();
    this.#costInfo = this.#initiateCostInfo();
  }

  // Returns a Map with an opening bracket as key, and an object
  // containing a "closingBracket" key which holds the corresponding
  // closing bracket.
  #initiateBracketInfo = () => {
    const bracketInfo = new Map();
    this.#openingBrackets.forEach((bracket, index) => {
      bracketInfo.set(bracket, {
        closingBracket: this.#closingBrackets[index],
      });
    });
    return bracketInfo;
  };

  // Returns a Map with a closing bracket as key, and its cost as value
  #initiateCostInfo = () => {
    const costInfo = new Map();
    this.#closingBrackets.forEach((bracket, index) => {
      costInfo.set(bracket, this.#costs[index]);
    });
    return costInfo;
  };

  // Checks wether the supplied bracket is a closing bracket or not
  #bracketIsClosing = (bracket) => {
    return this.#closingBrackets.includes(bracket);
  };

  // Returns the corresponding closing-bracket for the supplied bracket
  #getClosingBracket = (bracket) => {
    return this.#bracketInfo.get(bracket)?.closingBracket ?? null;
  };

  // Checks a line and returns a potential bad closing bracket
  #getPotentialBadBracket = (line) => {
    // We have to keep track of all opening brackets we've seen
    const seenBrackets = [];
    for (let i = 0; i < line.length; i++) {
      // Let's get the current bracket
      const bracket = line[i];
      // If it is a closing bracket, we must have seen its corresponding opening bracket
      // just before, otherwise it is faulty.
      if (this.#bracketIsClosing(bracket)) {
        // So let's get the expected bracket
        const expectedBracket = this.#getClosingBracket(seenBrackets.pop());
        // And if the current bracket is not the expected one, we return the faulty bracket
        if (bracket !== expectedBracket) {
          return bracket;
        }
      } else {
        // If we're not dealing  with a closing bracket, we just add it to the
        // array of seen brackets.
        seenBrackets.push(bracket);
      }
    }
    // If no faulty bracket is found, we return null
    return null;
  };

  // Summarizes the cost of all supplied brackets
  #getTotalCost = (brackets) => {
    return brackets.reduce((acc, bracket) => {
      acc += this.#costInfo.get(bracket);
      return acc;
    }, 0);
  };

  solveProblemOne = () => {
    const badBrackets = [];
    INPUT.forEach((line) => {
      // Let's check if the line contains a bad bracket
      const badBracket = this.#getPotentialBadBracket(line);
      // If it does, we add it to the array of bad brackets
      badBracket && badBrackets.push(badBracket);
    });
    // Then we return the total cost of all the bad brackets
    return this.#getTotalCost(badBrackets);
  };

  solveProblemTwo = () => {
    INPUT.forEach((line) => {
      // In P2 we're supposed to ignore the faulty lines and only
      // care about the incomplete ones. So let's check if we have
      // a bad bracket, and if we do, we ignore that line.
      const badBracket = this.#getPotentialBadBracket(line);
      if (badBracket === null) {
      }
    });
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
