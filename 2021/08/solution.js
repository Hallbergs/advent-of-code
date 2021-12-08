import { INPUT } from "./input.js";

export default class Solver {
  #numberOfSegmentsPerDigit;
  #knownSegments;
  constructor() {
    this.#numberOfSegmentsPerDigit = this.#initiateSegmentMap();
    this.#knownSegments = this.#initiateKnownSegments();
  }

  // Initiates a map containing the number of segments active
  // for each digit. (Key: number of active segments, value: the digit).
  #initiateSegmentMap = () => {
    const segmentMap = new Map();
    segmentMap.set(0, 6);
    segmentMap.set(1, 2);
    segmentMap.set(2, 5);
    segmentMap.set(3, 5);
    segmentMap.set(4, 4);
    segmentMap.set(5, 5);
    segmentMap.set(6, 6);
    segmentMap.set(7, 3);
    segmentMap.set(8, 7);
    segmentMap.set(9, 6);
    return segmentMap;
  };

  // Initiates a map with a key stating how many characters (e.g. "ab" (2)) is
  // connected to the segments. Initiated from the known numbers (1, 4, 7, 8).
  #initiateKnownSegments = () => {
    const knownSegmentsMap = new Map();
    knownSegmentsMap.set(2, [2, 3]);
    knownSegmentsMap.set(4, [0, 2, 3, 6]);
    knownSegmentsMap.set(3, [1, 2, 3]);
    knownSegmentsMap.set(7, [0, 1, 2, 3, 4, 5, 6]);
    return knownSegmentsMap;
  };

  // Returns the digit output format as an array of arrays containing
  // each output string.
  #getArrayOfDigitOutput = () => {
    return [...INPUT].reduce((acc, curr) => {
      acc.push(curr.split(" | ")[1].split(" "));
      return acc;
    }, []);
  };

  // Returns the digit output format as an array of arrays containing
  // each output string.
  #getArrayOfSignals = () => {
    return [...INPUT].reduce((acc, curr) => {
      acc.push(curr.split(" | ")[0].split(" "));
      return acc;
    }, []);
  };

  // Sorts the array of codes according the the length
  // of the code. (Asc).
  #getSortedSignal = (signal) => {
    return signal.sort((a, b) => {
      return a.length - b.length;
    });
  };

  #getCodeMapFromDisplayMap = (displayMap) => {
    const codeMap = new Map();
    codeMap.set(
      0,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(
        3
      )}${displayMap.get(4)}${displayMap.get(5)}${displayMap.get(6)}`
    );
    codeMap.set(1, `${displayMap.get(2)}${displayMap.get(3)}`);
    codeMap.set(
      2,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(
        0
      )}${displayMap.get(5)}${displayMap.get(4)}`
    );
    codeMap.set(
      3,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(
        0
      )}${displayMap.get(3)}${displayMap.get(4)}`
    );
    codeMap.set(
      4,
      `${displayMap.get(6)}${displayMap.get(2)}${displayMap.get(
        0
      )}${displayMap.get(3)}`
    );
    codeMap.set(
      5,
      `${displayMap.get(1)}${displayMap.get(6)}${displayMap.get(
        0
      )}${displayMap.get(3)}${displayMap.get(4)}`
    );
    codeMap.set(
      6,
      `${displayMap.get(1)}${displayMap.get(6)}${displayMap.get(
        0
      )}${displayMap.get(5)}${displayMap.get(3)}${displayMap.get(4)}`
    );
    codeMap.set(
      7,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(3)}`
    );
    codeMap.set(
      8,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(
        3
      )}${displayMap.get(4)}${displayMap.get(5)}${displayMap.get(
        6
      )}${displayMap.get(0)}`
    );
    codeMap.set(
      9,
      `${displayMap.get(1)}${displayMap.get(2)}${displayMap.get(
        3
      )}${displayMap.get(4)}${displayMap.get(6)}${displayMap.get(0)}`
    );
    return codeMap;
  };

  #getNumMatches = (digitCode, codeMap, target) => {
    let numMatches = 0;
    digitCode.split("").forEach((char) => {
      if (codeMap.get(target).includes(char)) {
        numMatches++;
      }
    });
    return numMatches;
  };

  #getNumberFromCodes = (digitCodes, codeMap) => {
    return digitCodes.reduce((acc, digitCode) => {
      let match = false;
      let tempKey = "";
      for (const [key, value] of codeMap.entries()) {
        match =
          digitCode.length === value.length &&
          digitCode.split("").every((char) => {
            return value.includes(char);
          });
        if (match) {
          tempKey = key;
          break;
        }
      }
      if (
        digitCode.length === 6 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 2 &&
        this.#getNumMatches(digitCode, codeMap, 4) === 4
      ) {
        acc = acc.concat("9");
        return acc;
      }
      if (
        digitCode.length === 6 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 1 &&
        this.#getNumMatches(digitCode, codeMap, 4) === 3
      ) {
        acc = acc.concat("6");
        return acc;
      }
      if (
        digitCode.length === 6 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 2 &&
        this.#getNumMatches(digitCode, codeMap, 8) === 6
      ) {
        acc = acc.concat("0");
        return acc;
      }
      if (
        digitCode.length === 5 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 2
      ) {
        acc = acc.concat("3");
        return acc;
      }
      if (
        digitCode.length === 5 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 1 &&
        this.#getNumMatches(digitCode, codeMap, 4) === 3
      ) {
        acc = acc.concat("5");
        return acc;
      }
      if (
        digitCode.length === 5 &&
        this.#getNumMatches(digitCode, codeMap, 1) === 1 &&
        this.#getNumMatches(digitCode, codeMap, 4) !== 3
      ) {
        acc = acc.concat("2");
        return acc;
      }
      if (match) {
        acc = acc.concat(tempKey.toString());
        return acc;
      }
      return acc;
    }, "");
  };

  solveProblemOne = () => {
    // Let's get only the digits (the part after the pipe, |).
    const digitOutput = this.#getArrayOfDigitOutput();
    // We want to focus on the easy digits
    const easyDigits = [1, 4, 7, 8];
    // Let's get the amount of active segments for each of the easy digits
    const allowedLengths = easyDigits.map((d) =>
      this.#numberOfSegmentsPerDigit.get(d)
    );
    // Then we'll iterate over each code, and check if the amount of active segments
    // is included in the array containing the number of allowed active segments.
    // If it is, we increment the counter by one.
    const numEasyDigits = digitOutput.reduce((acc, curr) => {
      curr.map((segment) => {
        if (allowedLengths.includes(segment.length)) {
          acc++;
        }
        return acc;
      });
      return acc;
    }, 0);
    return numEasyDigits;
  };

  solveProblemTwo = () => {
    let totalSum = 0;
    const signals = this.#getArrayOfSignals();
    const digitOutput = this.#getArrayOfDigitOutput();
    signals.forEach((signal, index) => {
      const displayMap = new Map();
      const usedLetters = new Set();
      const sortedSignal = this.#getSortedSignal(signal);
      sortedSignal.forEach((code) => {
        const knownSegment = this.#knownSegments.get(code.length);
        if (knownSegment) {
          knownSegment.forEach((place) => {
            if (!displayMap.has(place)) {
              for (let i = 0; i < code.length; i++) {
                if (!usedLetters.has(code[i])) {
                  usedLetters.add(code[i]);
                  displayMap.set(place, code[i]);
                  break;
                }
              }
            }
          });
        }
      });
      const codeMap = this.#getCodeMapFromDisplayMap(displayMap);
      const digitCodes = digitOutput[index];
      let numberString = this.#getNumberFromCodes(digitCodes, codeMap);
      totalSum += parseInt(numberString);
    });
    return totalSum;
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
  "THIS SOLUTION IS TERRIBLY MESSY! It get's the correct answer and thats enough for me this time."
);

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
