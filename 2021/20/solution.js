import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  #getBinaryFromIndex = (image, point) => {
    const [xIndex, yIndex] = point;
    const value = `${image[yIndex - 1]?.[xIndex - 1] ?? "."}${
      image[yIndex - 1]?.[xIndex] ?? "."
    }${image[yIndex - 1]?.[xIndex + 1] ?? "."}${
      image[yIndex]?.[xIndex - 1] ?? "."
    }${image[yIndex]?.[xIndex] ?? "."}${image[yIndex]?.[xIndex + 1] ?? "."}${
      image[yIndex + 1]?.[xIndex - 1] ?? "."
    }${image[yIndex + 1]?.[xIndex] ?? "."}${
      image[yIndex + 1]?.[xIndex + 1] ?? "."
    }`;
    return value.split("").reduce((acc, char) => {
      if (char === ".") {
        acc += "0";
      } else {
        acc += "1";
      }
      return acc;
    }, "");
  };

  #getTransformedValue = (transformation, binaryString) => {
    const index = parseInt(binaryString, 2);
    return transformation[index];
  };

  #getNewValue = (image, transformation, point) => {
    const binaryString = this.#getBinaryFromIndex(image, point);
    console.log(binaryString);
    const transformedValue = this.#getTransformedValue(
      transformation,
      binaryString
    );
    return transformedValue;
  };

  #transformImage = (image, transformation) => {
    const newImage = Array(image.length).fill(Array(image[0].length).fill("."));
    for (let x = 0; x < image[0].length; x++) {
      for (let y = 0; y < image.length; y++) {
        newImage[y][x] = this.#getNewValue(image, transformation, [x, y]);
      }
    }
    return newImage;
  };

  #getNumLitChars = (image) => {
    let numLit = 0;
    for (let x = 0; x < image[0].length; x++) {
      for (let y = 0; y < image.length; y++) {
        if (image[y][x] === "#") {
          numLit++;
        }
      }
    }
    return numLit;
  };

  #padImage = (image) => {
    return [
      Array(image[0].length + 2).fill("."),
      ...image.map((row) => [".", ...row, "."]),
      Array(image[0].length + 2).fill("."),
    ];
  };

  solveProblemOne = () => {
    const transformation = [...INPUT[0]];
    let image = INPUT.splice(1);
    image = this.#padImage(image);
    image = this.#transformImage(image, transformation);
    image = this.#padImage(image);
    image = this.#transformImage(image, transformation);

    return this.#getNumLitChars(image);
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
