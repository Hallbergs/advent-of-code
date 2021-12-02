export default class Submarine {
  #xCoordinate;
  #yCoordinate;
  #aim;

  constructor() {
    this.#xCoordinate = 0; // Horizontal position
    this.#yCoordinate = 0; // Depth
    this.#aim = 0; // The aim of the sub
  }

  // Accepts a command-string and returns an object containing
  // the direction and the amount to move.
  #parseCommandString = (command) => {
    // Make sure to handle eventual bad input
    if (!command || command === "") return { direction: "", amount: 0 };
    // Split the command-string to get an array containing a direction [0]
    // and an amount to move in the direction [1].
    const directionAndAmount = command.split(" ");
    // Extract and parse the direction and amount
    const direction = directionAndAmount[0] ?? "";
    const amount = parseInt(directionAndAmount[1], 10) ?? 0;
    return { direction, amount };
  };

  // Updates the position based on the direction and amount
  #updateSimpleSubPosition = (direction, amount) => {
    switch (direction) {
      case "down":
        this.#yCoordinate += amount;
        break;
      case "forward":
        this.#xCoordinate += amount;
        break;
      case "up":
        this.#yCoordinate -= amount;
        break;
      default:
        break;
    }
  };

  // Updates the position based on the direction and amount
  #updateSubPosition = (direction, amount) => {
    switch (direction) {
      case "down":
        this.#aim += amount;
        break;
      case "forward":
        this.#xCoordinate += amount;
        this.#yCoordinate += this.#aim * amount;
        break;
      case "up":
        this.#aim -= amount;
        break;
      default:
        break;
    }
  };

  // Public method to move the submarine. Accepts a command-string
  // and an optional parameter which determines if the submarine aim
  // should be used or not.
  move = (commandString, includeAim = false) => {
    // If no command-string is supplied, we abort.
    if (!commandString || commandString === "") return;
    // Otherwise, let's parse the command-string to get hold of the
    // direction and amount of movement
    const { direction, amount } = this.#parseCommandString(commandString);
    // Then we'll move (update the private position fields) according
    // to the provided direction and amount.
    if (!includeAim) {
      // If we're not including the aim, we use the simple updater...
      return this.#updateSimpleSubPosition(direction, amount);
    }
    // ...otherwise we use the ordinary one.
    this.#updateSubPosition(direction, amount);
  };

  // Get:er for the current position
  getPosition = () => {
    return { x: this.#xCoordinate, y: this.#yCoordinate };
  };
}
