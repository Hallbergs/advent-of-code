import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #createNodeStructure = (line, parent = null) => {
    if (typeof line === "number") {
      return { type: "leaf", value: line, parent: parent };
    }
    const node = { type: "node", value: null, parent: parent };
    node.left = this.#createNodeStructure(line[0], node);
    node.right = this.#createNodeStructure(line[1], node);
    return node;
  };

  #getMagnitude = (node) => {
    if (node.type === "leaf") {
      return node.value;
    } else {
      return (
        3 * this.#getMagnitude(node.left) + 2 * this.#getMagnitude(node.right)
      );
    }
  };

  #addNode = (left, right) => {
    const node = { type: "node", left: left, right: right };
    left.parent = node;
    right.parent = node;
    return node;
  };

  #isEndNode = (node) => {
    return (
      node.type === "node" &&
      node.left.type === "leaf" &&
      node.right.type === "leaf"
    );
  };

  #order = (node) => {
    if (node.type === "leaf") {
      return [node];
    } else {
      return this.#order(node.left).concat(this.#order(node.right));
    }
  };

  #split = (node) => {
    if (node.type === "leaf" && node.value > 9) {
      const newNode = this.#createNodeStructure(
        [Math.floor(node.value / 2), Math.ceil(node.value / 2)],
        node.parent
      );
      if (node.parent.left === node) {
        node.parent.left = newNode;
      } else if (node.parent.right === node) {
        node.parent.right = newNode;
      } else {
        console.log("Error splitting node...");
      }
      return true;
    } else if (node.type === "node") {
      if (this.#split(node.left)) {
        return true;
      }
      if (this.#split(node.right)) {
        return true;
      }
      return false;
    }
  };

  #explode = (node, depth = 0) => {
    if (this.#isEndNode(node) && depth > 3) {
      const zeroNode = this.#createNodeStructure(0, node.parent);
      if (node.parent.left === node) {
        node.parent.left = zeroNode;
      } else if (node.parent.right === node) {
        node.parent.right = zeroNode;
      }
      return [zeroNode, node.left.value, node.right.value];
    } else if (node.type === "node") {
      const left = this.#explode(node.left, depth + 1);
      if (left !== null) {
        return left;
      }
      const right = this.#explode(node.right, depth + 1);
      if (right !== null) {
        return right;
      }
    }
    return null;
  };

  #reduce = (node) => {
    let updated = true;
    while (updated) {
      updated = false;
      const result = this.#explode(node);
      if (result !== null) {
        const [zeroNode, left, right] = result;
        const pieces = this.#order(node);
        const index = pieces.indexOf(zeroNode);
        if (index < 0) {
          console.log("Node not found...");
        }
        if (index > 0) {
          pieces[index - 1].value += left;
        }
        if (index < pieces.length - 1) {
          pieces[index + 1].value += right;
        }
        updated = true;
      } else {
        updated = this.#split(node);
      }
    }
    return node;
  };

  solveProblemOne = () => {
    let nodeStructure = this.#createNodeStructure([...INPUT][0]);
    for (let i = 0; i < [...INPUT].length; i++) {
      nodeStructure = this.#reduce(
        this.#addNode(nodeStructure, this.#createNodeStructure([...INPUT][i]))
      );
    }
    return this.#getMagnitude(nodeStructure);
  };

  solveProblemTwo = () => {
    let maxMagnitude = -Infinity;
    for (let i = 0; i < [...INPUT].length; i++) {
      for (let ii = 0; ii < [...INPUT].length; ii++) {
        if (i === ii) {
          continue;
        }
        const magnitude = this.#getMagnitude(
          this.#reduce(
            this.#addNode(
              this.#createNodeStructure([...INPUT][i]),
              this.#createNodeStructure([...INPUT][ii])
            )
          )
        );
        if (maxMagnitude < magnitude) {
          maxMagnitude = magnitude;
        }
      }
    }
    return maxMagnitude;
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
