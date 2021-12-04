import { INPUT } from "./input.js";

export default class Solver {
  #numbersToDraw;
  #boardsString;

  constructor() {
    this.#numbersToDraw = INPUT[0].split(",");
    this.#boardsString = this.#getBoardsString();
  }

  // Formats the input in a couple of ways:
  // - Removes the numbers to draw
  // - Combines all the board-strings to a single string
  // Returns a string containing all boards numbers.
  #getBoardsString = () => {
    let boardsString = "";
    INPUT.splice(1).forEach((row) => {
      boardsString += ` ${row}`;
    });
    boardsString = boardsString.replace(/\s{2,}/g, " ");
    return boardsString.trim();
  };

  // Sets all numbers in the boardsString that equals the supplied
  // number to "-1".
  #getNewBoardsString = (boardsString, number) => {
    return boardsString.split(" ").reduce((acc, boardNumber) => {
      if (number === boardNumber) {
        acc += " -1";
      } else {
        acc += ` ${boardNumber}`;
      }
      return acc.trim();
    }, "");
  };

  // Checks wether we have a winning board in the supplied
  // string. We have a winner if we have five "-1"'s either
  // horizontally or vertically.
  #getWinningBoard = (boardsString) => {
    // One row consists of 5 five characters
    const rowLength = 5;
    // One board consists of 25 consecutive characters in the boardsString
    // (Aka five rows)
    const oneBoardLength = rowLength * 5;
    // Let's loop over each board
    for (let i = 0; i < boardsString.length; i += oneBoardLength) {
      // Get the current board
      const board = boardsString.split(" ").slice(i, i + 25);
      // Check if we have at least five "hits". If we dont, we can
      // just continue to the new board.
      if (board.filter((number) => number === "-1").length >= rowLength) {
        // Then we'll check if we have a winning row
        for (let ii = 0; ii < oneBoardLength; ii += rowLength) {
          const row = board.slice(ii, ii + rowLength);
          if (row.every((rowNumber) => rowNumber === "-1")) {
            return { winner: board, index: i };
          }
        }
        // Or a winning column
        for (let j = 0; j < rowLength; j++) {
          const column = [
            board[j],
            board[j + rowLength],
            board[j + rowLength * 2],
            board[j + rowLength * 3],
            board[j + rowLength * 4],
          ];
          if (column.every((columnNumber) => columnNumber === "-1")) {
            return { winner: board, index: i };
          }
        }
      }
    }
    // If we've made it this far, we don't have a winner yet.
    return { winner: null };
  };

  // Returns the sum of all numbers not in the winning row
  // of the supplied board.
  #getBoardSum = (board) => {
    return board.reduce((acc, num) => {
      if (num !== "-1") {
        acc += parseInt(num);
      }
      return acc;
    }, 0);
  };

  solveProblemOne = () => {
    // Let's define a local boardsString that we can alter
    let boardsString = this.#boardsString;
    // Then we'll declare a holder for the winning board
    let winningBoard = null;
    // Then we'll generate a new boardsString for every number
    // drawn (until we have a winning board).
    for (let i = 0; i < this.#numbersToDraw.length; i++) {
      // Let's get an updated boardsString...
      boardsString = this.#getNewBoardsString(
        boardsString,
        this.#numbersToDraw[i]
      );
      // And check if that string contains a winning board
      const { winner } = this.#getWinningBoard(boardsString);
      winningBoard = winner;
      // If it does, we break the loop.
      if (winningBoard !== null) {
        // We want to return the product of the sum of all unmarked numbers
        // in the winning board times the last drawn number.
        return this.#getBoardSum(winningBoard) * this.#numbersToDraw[i];
      }
    }
    throw new Error("No winning board found!");
  };

  solveProblemTwo = () => {
    // Let's define a local boardsString that we can alter
    let boardsString = this.#boardsString;
    // Let's define a holder for the last drawn number
    // that resulted in a winner
    let lastDrawnWinningNumber = null;
    // Then we'll declare a holder for the winning boards
    const winningBoards = [];
    // Then we'll generate a new boardsString for every number drawn
    for (let i = 0; i < this.#numbersToDraw.length; i++) {
      if (boardsString.length < 25) break;
      // Let's get an updated boardsString...
      boardsString = this.#getNewBoardsString(
        boardsString,
        this.#numbersToDraw[i]
      );
      // And push all boards that have won
      while (true) {
        // Let's get the potential winner
        const { winner: winningBoard, index } =
          this.#getWinningBoard(boardsString);
        // If there was no winner, move on
        if (winningBoard === null) {
          break;
        } else {
          // Otherwise we push the winning board to the array of winners...
          winningBoards.push(winningBoard);
          // Make sure to keep the last drawn winning number updated
          lastDrawnWinningNumber = this.#numbersToDraw[i];
          // Then we have to remove the winning board from the
          // string containing all boards. The solution below is
          // terrible, but it gets the job done...
          const boardsStringArray = boardsString.split(" ");
          const boardsArrayWinnerExtracted = [
            ...boardsStringArray.slice(0, index),
            ...boardsStringArray.slice(index + 25),
          ];
          boardsString = boardsArrayWinnerExtracted.join(" ");
        }
      }
    }
    // We want the last winning board. Let's get it:
    const lastWinningBoard = winningBoards[winningBoards.length - 1];
    // We want to return the product of the sum of all unmarked numbers
    // in the last winning board times the last drawn number.
    return this.#getBoardSum(lastWinningBoard) * lastDrawnWinningNumber;
  };
}
// Initiate the class
const solver = new Solver();
// And run the solvers
console.time("solver");
const answerOne = solver.solveProblemOne();
const answerTwo = solver.solveProblemTwo();
console.timeEnd("solver");

console.log(
  `Answer for problem 01: ${answerOne}. Answer for problem 02: ${answerTwo}`
);
