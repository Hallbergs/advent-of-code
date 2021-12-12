import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  // Returns wether the supplied node represents a small
  // cave or not (If the node is lowercase or not).
  #isSmallCave = (node) => {
    return node === node.toLowerCase();
  };

  // Recursive method that will return all possible paths
  #getAllPaths = (nodes, node, path = []) => {
    // Let's declare an array that will contain all possible paths
    const allPaths = [];
    // The next path is the current path, plus the next node
    const nextPath = [...path, node];
    // If we've found the end-node, we return the path!
    if (node === "end") {
      return [nextPath];
    }
    // Otherwise we get all possible next nodes
    const possibleNextNodes = nodes.get(node);
    // And iterate over them to create possible paths
    possibleNextNodes.forEach((possibleNextNode) => {
      // If we're dealing with a small cave, and if we've already visited that
      // cave, we cannot visit it again, so let's return.
      if (
        this.#isSmallCave(possibleNextNode) &&
        nextPath.includes(possibleNextNode)
      ) {
        return;
      }
      // Otherwise we create the new path
      allPaths.push(...this.#getAllPaths(nodes, possibleNextNode, nextPath));
    });
    // Finally we return all the paths.
    return allPaths;
  };

  solveProblemOne = () => {
    // Let's create a Map containing all the nodes.
    // (E.g. "start": ["a", "b"], "b": ["end"])
    const nodes = [...INPUT]
      .map((connection) => connection.split("-"))
      .reduce((nodeMap, [start, end]) => {
        nodeMap.set(start, (nodeMap.get(start) || []).concat(end));
        nodeMap.set(end, (nodeMap.get(end) || []).concat(start));
        return nodeMap;
      }, new Map());
    // Then we'll get all possible paths
    const allPaths = this.#getAllPaths(nodes, "start", []);
    // And return the number of possible paths...
    return allPaths.length;
  };

  solveProblemTwo = () => {};
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
