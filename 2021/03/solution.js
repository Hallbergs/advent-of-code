import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #getMostCommonBitString = () => {
    // First we'll have to reduce all the input strings down
    // to arrays containing som sort of measurement for how often a
    // bit is present. We're gonna need an array with the same length
    // as the number of bit positions (12).
    const occurrenceArray = INPUT.reduce(
      (acc, bitString) => {
        // For every bit string, we loop over each bit
        for (let i = 0; i < bitString.length; i++) {
          // If the bit is "1" we increment the corresponding
          // number in the occurrenceArray, and if it is "0"
          // we decrement. That way we know that if the final number
          // is positive, "1" is more common, and if it is negative,
          // "0" is more common.
          if (bitString[i] === "1") {
            acc[i] += 1;
          } else {
            acc[i] -= 1;
          }
        }
        return acc;
      },
      // To keep track of the number of times a bit occurs in
      // each position we're gonna need an array with the same
      // length as the bit-string.
      new Array(INPUT[0].length).fill(0)
    );
    // Then we'll create a new array where the final (most common)
    // bits will go. Let's initiate with all zeros.
    const bitArray = new Array(INPUT[0].length).fill("0");
    // Then we'll loop over the occurrence-array and check if "1" or
    // "0" has occurred more, and set the bitArray accordingly.
    occurrenceArray.forEach((total, index) => {
      if (total > 0) {
        bitArray[index] = "1";
      }
    });
    // We want to return a string, not an array
    return bitArray.join("");
  };

  // Returns a string with all the bits flipped
  #flipBits = (bitString) => {
    return bitString
      .split("")
      .map((b) => (1 - b).toString())
      .join("");
  };

  // Returns the most common bit in the array of bitStrings
  // in the provided position
  #getMostCommonBit = (position, bitStringArray) => {
    let bitCount = 0;
    // A "1" returns in an increment of the bitCounter and
    // a "0" returns a decrement of the bitCounter.
    // That way we know, if the number is positive, "1" was more
    // common, and vice versa.
    bitStringArray.forEach((bitString) => {
      if (bitString[position] === "1") {
        bitCount += 1;
      } else {
        bitCount -= 1;
      }
    });
    // If the bitCount is zero or larger, we are returning "1"
    // Otherwise we're returning a 0.
    return bitCount < 0 ? "0" : "1";
  };

  #getLeastCommonBit = (position, bitStringArray) => {
    let bitCount = 0;
    // A "1" returns in an increment of the bitCounter and
    // a "0" returns a decrement of the bitCounter.
    // That way we know, if the number is positive, "1" was more
    // common, and vice versa.
    bitStringArray.forEach((bitString) => {
      if (bitString[position] === "1") {
        bitCount += 1;
      } else {
        bitCount -= 1;
      }
    });
    // If the bitCount is zero (equal number of "1"s and "0"s) we return "0"
    // If it's less than 0, we return "1" (since zero was more common and we
    // want to return the least common)
    // Otherwise, we return 0
    return bitCount === 0 ? "0" : bitCount < 0 ? "1" : "0";
  };

  // Returns the oxygen generator rating by removing bitStrings
  // according to the readme.
  #getOGenRating = () => {
    // We don't want to mess with the original array
    let filteredInput = [...INPUT];
    // We're gonna be looping over (at most) every bit in a bitString.
    // Let's get the number of bits in a bitString
    const numBits = INPUT[0].length;
    // Then we'll start looping over the bit-positions
    for (let i = 0; i < numBits; i++) {
      // If there's only one value remaining, we return that one
      if (filteredInput.length === 1) break;
      // Let's get the most common bit for the current position.
      // (The most common for the bitStrings that still remain).
      const mostCommonBit = this.#getMostCommonBit(i, filteredInput);
      filteredInput = filteredInput.filter((bitString) => {
        return bitString[i] === mostCommonBit;
      });
    }
    return filteredInput[0];
  };

  // Returns the oxygen generator rating by removing bitStrings
  // according to the readme.
  #getCO2ScrubRating = () => {
    // We don't want to mess with the original array
    let filteredInput = [...INPUT];
    // We're gonna be looping over (at most) every bit in a bitString.
    // Let's get the number of bits in a bitString
    const numBits = INPUT[0].length;
    // Then we'll start looping over the bit-positions
    for (let i = 0; i < numBits; i++) {
      // If there's only one value remaining, we return that one
      if (filteredInput.length === 1) break;
      // Let's get the least common bit for the current position.
      // (The least common for the bitStrings that still remain).
      const leastCommonBit = this.#getLeastCommonBit(i, filteredInput);
      filteredInput = filteredInput.filter((bitString) => {
        return bitString[i] === leastCommonBit;
      });
    }
    return filteredInput[0];
  };

  solveProblemOne = () => {
    // The gamma-rate is the bit-string containing the most common bits
    const gammaRate = this.#getMostCommonBitString();
    // Epsilon is the bit string containing the least common bits
    const epsilon = this.#flipBits(gammaRate);
    // We want't to return the product of the gamma-rate and epsilon (in base 10)
    return parseInt(gammaRate, 2) * parseInt(epsilon, 2);
  };

  solveProblemTwo = () => {
    const oGenRating = this.#getOGenRating();
    const co2ScrubRating = this.#getCO2ScrubRating();
    // We want't to return the product of the oGenRating and the co2ScrubRating (in base 10)
    return parseInt(oGenRating, 2) * parseInt(co2ScrubRating, 2);
  };
}
// Initiate the class
const solver = new Solver();
// And run the solvers
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
