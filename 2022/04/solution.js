import { INPUT } from "./input.js";

export default class Solver {
  solveProblemOne = () => {
    return [...INPUT].reduce((a, c) => {
      const [s1, s2] = c.split(",");
      const [a11, a12] = s1.split("-");
      const [a21, a22] = s2.split("-");
      if (
        (parseInt(a11) <= parseInt(a21) && parseInt(a12) >= parseInt(a22)) ||
        (parseInt(a21) <= parseInt(a11) && parseInt(a22) >= parseInt(a12))
      ) {
        a++;
      }
      return a;
    }, 0);
  };

  solveProblemTwo = () => {
    return [...INPUT].reduce((a, c) => {
      const [s1, s2] = c.split(",");
      const [a11, a12] = s1.split("-");
      const [a21, a22] = s2.split("-");
      if (
        (parseInt(a11) <= parseInt(a21) && parseInt(a12) >= parseInt(a21)) ||
        (parseInt(a21) <= parseInt(a11) && parseInt(a22) >= parseInt(a11))
      ) {
        a++;
      }
      return a;
    }, 0);
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
