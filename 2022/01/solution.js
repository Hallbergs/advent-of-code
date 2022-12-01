import { INPUT } from "./input.js";

export default class Solver {
  getTotalCaloriesPerElf = () => {
    let elfIndex = 0;
    const totalCaloriesPerElf = [];
    INPUT.forEach((c) => {
      const calories = parseInt(c);
      if (isNaN(calories)) {
        elfIndex++;
      } else {
        totalCaloriesPerElf[elfIndex]
          ? (totalCaloriesPerElf[elfIndex] += calories)
          : totalCaloriesPerElf.push(calories);
      }
    });

    return totalCaloriesPerElf;
  };

  solveProblemOne = () => {
    return Math.max(...this.getTotalCaloriesPerElf());
  };

  solveProblemTwo = () => {
    const topThreeAmounts = this.getTotalCaloriesPerElf()
      .sort((a, b) => b - a)
      .slice(0, 3);
    return topThreeAmounts.reduce((a, c) => a + c, 0);
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
