import { INPUT } from "./input.js";

export default class Solver {
  constructor() {
    this.directions = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];
  }

  #positionOk = (i, j, map) => {
    return i >= 0 && i < map.length && j >= 0 && j < map[0].length;
  };

  #treeVisible = (i, j, map) => {
    for (const d of this.directions) {
      let tree = [i, j];
      let visible = true;
      while (true) {
        tree = [tree[0] + d[0], tree[1] + d[1]];
        if (!this.#positionOk(tree[0], tree[1], map)) {
          break;
        }
        const h = map[tree[0]][tree[1]];
        if (h >= map[i][j]) {
          visible = false;
          break;
        }
      }
      if (visible) return visible;
    }
    return false;
  };

  #getScenic(i, j, map) {
    let sums = [];
    for (const d of this.directions) {
      let score = 0;
      let tree = [i, j];
      while (true) {
        tree = [tree[0] + d[0], tree[1] + d[1]];
        if (!this.#positionOk(tree[0], tree[1], map)) {
          break;
        }
        score++;
        const h = map[tree[0]][tree[1]];
        if (h >= map[i][j]) {
          break;
        }
      }
      sums.push(score);
    }
    return sums.reduce((a, b) => a * b, 1);
  }

  solveProblemOne = () => {
    let visible = 0;
    const map = INPUT.map((r) => r.split("").map(Number));
    for (let i = 1; i < map.length - 1; i++) {
      for (let j = 1; j < map[i].length - 1; j++) {
        if (this.#treeVisible(i, j, map)) {
          visible++;
        }
      }
    }
    return visible + 4 * INPUT.length - 4;
  };

  solveProblemTwo = () => {
    let best = 0;
    const map = INPUT.map((r) => r.split("").map(Number));
    for (let i = 1; i < map.length - 1; i++) {
      for (let j = 1; j < map[i].length - 1; j++) {
        if (this.#treeVisible(i, j, map)) {
          const s = this.#getScenic(i, j, map);
          if (s > best) {
            best = s;
          }
        }
      }
    }
    return best;
  };
}

const solver = new Solver();
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
