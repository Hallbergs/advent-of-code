import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  // Takes the input and returns a Map containing all nodes
  // and their connections.
  #getNodesFromInput = () => {
    return [...INPUT]
      .map((connection) => connection.split("-"))
      .reduce((nodeMap, [start, end]) => {
        nodeMap.set(start, (nodeMap.get(start) || []).concat(end));
        nodeMap.set(end, (nodeMap.get(end) || []).concat(start));
        return nodeMap;
      }, new Map());
  };

  // Returns wether the supplied node represents a small
  // cave or not (If the node is lowercase or not).
  #isSmallCave = (node) => {
    return node === node.toLowerCase();
  };

  // Recursive method that will return all possible paths
  #getAllPaths = (nodes, node, path = [], allowMoreThanOneVisit = false) => {
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
      // We need some special handling for the small caves...
      if (this.#isSmallCave(possibleNextNode)) {
        // If we're not allowing more than one visit, and we've already visited
        // we have to return right away.
        if (!allowMoreThanOneVisit && path.includes(possibleNextNode)) {
          return;
        }
        // If we do allow more than one visit (2) we have to make sure that
        // we're not visiting small caves more than two times.
        if (allowMoreThanOneVisit) {
          // Start can only be visited once...
          if (possibleNextNode === "start") {
            return;
          }
          // Let's initiate a Map where we can keep track of visited parts
          const alreadyVisited = new Map();
          // We need to keep track of we're trying to visit twice.
          let visitedTwice = false;
          nextPath.forEach((part) => {
            // If we're not dealing with a small cave, we're good.
            if (!this.#isSmallCave(part)) {
              return;
            }
            // If the part is set as already visited, we set
            // visitedTwice to true
            if (alreadyVisited.get(part)) {
              visitedTwice = true;
            } else {
              // Otherwise we update the map so that we know that we've visited once.
              alreadyVisited.set(part, true);
            }
          });
          // Let's return if we've visited twice.
          if (alreadyVisited.get(possibleNextNode) && visitedTwice) {
            return;
          }
        }
      }

      // Otherwise we create the new path
      allPaths.push(
        ...this.#getAllPaths(
          nodes,
          possibleNextNode,
          nextPath,
          allowMoreThanOneVisit
        )
      );
    });
    // Finally we return all the paths.
    return allPaths;
  };

  solveProblemOne = () => {
    // Let's create a Map containing all the nodes.
    // (E.g. "start": ["a", "b"], "b": ["end"])
    const nodes = this.#getNodesFromInput();
    // Then we'll get all possible paths
    const allPaths = this.#getAllPaths(nodes, "start", []);
    // And return the number of possible paths...
    return allPaths.length;
  };

  solveProblemTwo = () => {
    // Let's create a Map containing all the nodes.
    // (E.g. "start": ["a", "b"], "b": ["end"])
    const nodes = this.#getNodesFromInput();
    // Then we'll get all possible paths *Now we're allowing more than one visit
    // to small caves. Let's use the same method, but pass a variable stating that
    // we allow that.*
    const allPaths = this.#getAllPaths(nodes, "start", [], true);
    // And return the number of possible paths...
    return allPaths.length;
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
