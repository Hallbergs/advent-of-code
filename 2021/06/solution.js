import { INPUT } from "./input.js";

export default class Solver {
  #initialTimer;
  #newBornTimer;

  constructor() {
    this.#newBornTimer = 8;
    this.#initialTimer = 6;
  }

  // Initiates a Map holding the amount of fish
  // for each "timer". E.g. {0: 20, 1: 14,... 8: 13}
  #initFishCounter = () => {
    // Initialize a new Map()
    const fishCounter = new Map();
    // Let's iterate trough all fish, and add them to their
    // place in the map.
    for (const fish of INPUT) {
      // If the fish (timer) does not exist, we add the first one
      if (!fishCounter.has(fish)) {
        fishCounter.set(fish, 1);
      } else {
        // Otherwise, we increment by one
        fishCounter.set(fish, fishCounter.get(fish) + 1);
      }
    }
    return fishCounter;
  };

  // Returns the total number of fish by iterating
  // over all "timers" in the map and combining them.
  #getTotalFishFromCounter = (fishCounter) => {
    let numFish = 0;
    for (let i = 0; i < 9; i++) {
      numFish += fishCounter.get(i);
    }
    return numFish;
  };

  // Returns the number of fish present after `numDays` days.
  #getNumberOfFish = (numDays) => {
    // First we have to init the fish counter with the
    // initial amount of fish.
    let fishCounter = this.#initFishCounter();
    // Then we'll iterate the days
    for (let i = 0; i < numDays; i++) {
      // We're gonna need a new map so that we can store the
      // updated "timers" (fish).
      const newFishCounter = new Map();
      // Let's get the current amount of fish for each timer
      for (const [key, value] of fishCounter.entries()) {
        // If the timer is not zero (meaning we are not adding a new
        // fish, we simply "move" those fish "down" one step). E.g. the
        // amount of fish with timer 5 will be moved to timer 4.
        if (key > 0) {
          newFishCounter.set(
            key - 1,
            (newFishCounter.get(key - 1) ?? 0) + value
          );
        } else {
          // If we are dealing with a zero, we add a new fish with timer 8, and set
          // all zero-timers to 6.
          newFishCounter.set(
            this.#newBornTimer,
            (newFishCounter.get(this.#newBornTimer) ?? 0) + fishCounter.get(0)
          );
          newFishCounter.set(
            this.#initialTimer,
            (newFishCounter.get(this.#initialTimer) ?? 0) + fishCounter.get(0)
          );
        }
      }
      fishCounter = newFishCounter;
    }
    return this.#getTotalFishFromCounter(fishCounter);
  };

  solveProblemOne = () => {
    return this.#getNumberOfFish(80);
  };

  solveProblemTwo = () => {
    return this.#getNumberOfFish(256);
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
