import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #getCoordsFromString = (string) => {
    return string.split(",") ?? [null, null];
  };

  #initiatePaperFromInput = () => {
    const transparentPaper = new Map();
    [...INPUT[0]].forEach((coordString) => {
      const [xCoord, yCoord] = this.#getCoordsFromString(coordString);
      transparentPaper.set(`${xCoord},${yCoord}`, true);
    });
    return transparentPaper;
  };

  #foldPaper = (paper, foldInfo) => {
    const [foldDirection, foldLine] = foldInfo.split("=");
    // Unknown fold-direction? Abort
    if (!["x", "y"].includes(foldDirection)) {
      return;
    }
    for (const key of paper.keys()) {
      const [xCoord, yCoord] = key.split(",").map((string) => parseInt(string));
      // If the fold direction is "y", we check if the current y-coord is larger
      // then the fold-line (since all points below the fold-line will move up).
      if (foldDirection === "y" && yCoord > foldLine) {
        // First we delete the current key
        paper.delete(key);
        // Then we calculate the difference between the fold-line and the
        // current coordinate. The new point (after the fold) will move up
        // this difference times 2.
        const diff = yCoord - foldLine;
        // Get the new y-coordinate according to above.
        const newYCoord = yCoord - 2 * diff;
        // Finally we add the new point
        paper.set(`${xCoord},${newYCoord}`, true);
      }
      // If the fold direction is "x", we check if the current x-coord is smaller
      // then the fold-line (since all points to the left of the fold-line will move
      // to the right).
      if (foldDirection === "x" && xCoord < foldLine) {
        paper.delete(key);
        const diff = foldLine - xCoord;
        const newXCoord = xCoord + 2 * diff;
        paper.set(`${newXCoord},${yCoord}`, true);
      }
    }
  };

  solveProblemOne = () => {
    // We have to initiate a paper (a map with a coord-pair
    // as key, and a bool as value, stating if the coord is marked
    // or not).
    const paper = this.#initiatePaperFromInput();
    // In P1 we're only supposed to fold the paper once. Let's
    // get the first fold-information
    const firstFoldInfo = INPUT[1][0];
    // Then we fold the paper after that line
    this.#foldPaper(paper, firstFoldInfo);
    return paper.size;
  };

  solveProblemTwo = () => {
    // We have to initiate a paper (a map with a coord-pair
    // as key, and a bool as value, stating if the coord is marked
    // or not).
    const paper = this.#initiatePaperFromInput();
    // In P2 we're folding all the folds!
    [...INPUT[1]].forEach((foldInstruction) => {
      this.#foldPaper(paper, foldInstruction);
    });

    console.log("PAPER: ", paper);
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
