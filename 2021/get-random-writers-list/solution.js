import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  // Returns a shuffled array constructed by using the
  // Durstenfeld shuffle, an optimized version of Fisher-Yates.
  // Picks a random element for each original array element, and excludes
  // it from the next draw, like picking randomly from a deck of cards.
  #getShuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  #initiateWritersCounter = () => {
    // Initialize a new Map()
    const writersCounter = new Map();
    // Let's iterate trough all writers, and add them to their
    // place in the map.
    for (const writer of INPUT) {
      writersCounter.set(writer, 0);
    }
    return writersCounter;
  };

  // Let's get a string containing the writers in a random order
  solveProblemOne = () => {
    // Get an array containing the shuffled input
    const shuffledArray = this.#getShuffledArray([...INPUT]);
    // We want to return a string, so lets join the array
    return shuffledArray.join(", \n");
  };

  // To make sure the algorithm is not messing with us, let's check who would
  // be the first writer most times (iterates the list shuffler 100 000 times)
  solveProblemTwo = () => {
    const numIterations = 100000;
    // We need a Map() to keep track of the number of times each writer has
    // been picked first.
    const writersCounter = this.#initiateWritersCounter();
    // Let's iterate numIterations times, each time incrementing
    // the first picked writer by one.
    for (let i = 0; i < numIterations; i++) {
      // Get the shuffled input
      const shuffledWriters = this.#getShuffledArray([...INPUT]);
      // Get the first writer
      const firstWriter = shuffledWriters[0];
      // Increment the first picked one in the Map
      writersCounter.set(firstWriter, writersCounter.get(firstWriter) + 1);
    }
    // We want to return the results sorted, so its easy to see who
    // was chosen first most often.
    return new Map([...writersCounter.entries()].sort((a, b) => b[1] - a[1]));
  };
}
// Initiate the class
const solver = new Solver();
// And run the solvers
const answerOne = solver.solveProblemOne();
console.log(`Random list of writers: \n${answerOne} \n`);

const numIterations = 100000;
const answerTwo = solver.solveProblemTwo(numIterations);
console.log(
  `Number of times each person would be the first writer (Iterated ${numIterations.toLocaleString()} times)): \n`,
  answerTwo
);
