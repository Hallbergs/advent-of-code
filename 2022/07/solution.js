import { INPUT } from "./input.js";

export default class Solver {
  #getFileNameFromHistory = (history) => {
    return history.reduce((a, c) => (a = `${a}-${c}`));
  };

  #getFileSystemStack = () => {
    const history = [];
    const stack = new Map();
    INPUT.forEach((c) => {
      const cc = c.replace("$ ", "");
      const [o1, o2] = cc.split(" ");
      if (o1 === "cd") {
        if (o2 === "..") {
          history.pop();
        } else {
          history.push(o2);
          const fn = this.#getFileNameFromHistory(history);
          !stack.has(fn) && stack.set(fn, 0);
        }
      } else if (!isNaN(parseInt(o1))) {
        for (let i = 1; i <= history.length; i++) {
          const fn = this.#getFileNameFromHistory(history.slice(0, i));
          stack.set(fn, stack.get(fn) + parseInt(o1));
        }
      }
    });
    return stack;
  };

  solveProblemOne = () => {
    return [...this.#getFileSystemStack().values()].reduce((a, c) => {
      if (c <= 100000) {
        a = a + c;
      }
      return a;
    }, 0);
  };

  solveProblemTwo = () => {
    const used = [...this.#getFileSystemStack().values()].sort(
      (a, b) => b - a
    )[0];
    const toRemove = Math.abs(70000000 - 30000000 - used);
    return [...this.#getFileSystemStack().values()]
      .sort((a, b) => a - b)
      .find((v) => v >= toRemove);
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
