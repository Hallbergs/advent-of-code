import { INPUT } from "./input.js";

export default class Solver {
  #openingBrackets;
  #closingBrackets;
  #errorCosts;
  #missingCosts;
  #costInfo;
  #bracketInfo;

  constructor() {
    this.#openingBrackets = ["(", "[", "{", "<"];
    this.#closingBrackets = [")", "]", "}", ">"];
    this.#errorCosts = [3, 57, 1197, 25137];
    this.#missingCosts = [1, 2, 3, 4];

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
      costInfo.set(bracket, {
        errorCost: this.#errorCosts[index],
        missingCost: this.#missingCosts[index],
      });
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
  #getPotentialBadAndMissingBracketsBrackets = (line) => {
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
          return { badBracket: bracket, missingBrackets: [] };
        }
      } else {
        // If we're not dealing  with a closing bracket, we just add it to the
        // array of seen brackets.
        seenBrackets.push(bracket);
      }
    }
    // If no faulty bracket is found, we return null for the missing
    // brackets, and the closing brackets of the missing brackets as the
    // missing brackets.
    return {
      badBracket: null,
      missingBrackets: seenBrackets.reduce((acc, bracket) => {
        acc.push(this.#getClosingBracket(bracket));
        return acc;
      }, []),
    };
  };

  // Summarizes the cost of all supplied brackets
  #getTotalCost = (brackets) => {
    return brackets.reduce((acc, bracket) => {
      acc += this.#costInfo.get(bracket)?.errorCost ?? 0;
      return acc;
    }, 0);
  };

  solveProblemOne = () => {
    const badBrackets = [];
    INPUT.forEach((line) => {
      // Let's check if the line contains a bad bracket
      const { badBracket } =
        this.#getPotentialBadAndMissingBracketsBrackets(line);
      // If it does, we add it to the array of bad brackets
      badBracket && badBrackets.push(badBracket);
    });
    // Then we return the total cost of all the bad brackets
    return this.#getTotalCost(badBrackets);
  };

  solveProblemTwo = () => {
    const costs = [];
    INPUT.forEach((line) => {
      // Let's get the missing brackets to begin with
      const { missingBrackets } =
        this.#getPotentialBadAndMissingBracketsBrackets(line);
      // We might get an empty array returned (if there has been a bad bracket)
      // Let's make sure we have some missing brackets before moving on.
      if (missingBrackets.length > 0) {
        // If we have missing brackets, we can calculate the cost for them
        let cost = 0;
        for (let i = missingBrackets.length - 1; i > -1; i--) {
          cost = cost * 5 + this.#costInfo.get(missingBrackets[i]).missingCost;
        }
        costs.push(cost);
      }
    });
    // We want to return the middle cost (after the costs has been sorted)
    // We expect the input to always result in an odd number of entries.
    const sortedCosts = costs.sort((a, b) => a - b);
    return sortedCosts[Math.floor(costs.length / 2)];
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
