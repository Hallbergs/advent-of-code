import { INPUT } from "./input.js";

export default class Solver {
  constructor() {}

  // Accepts a number in some base, and returns the number
  // in another base (from "fromBase" to "toBase").
  #changeNumberBase = (number, fromBase = 10, toBase = 10) => {
    const converted = parseInt(number, fromBase).toString(toBase);
    return toBase === 2 ? converted.padStart(4, "0") : converted;
  };

  // Checks if a packet is a literal packet or not.
  #packetIsLiteralPacket = (packet) => {
    return typeof packet.value === "number";
  };

  // Returns the sum of version numbers for the supplied packet.
  #getPacketVersionSum = (packet) => {
    // If it's a literal package, we can return the version number right away.
    if (this.#packetIsLiteralPacket(packet)) {
      return packet.packetVersion;
    } else {
      // Otherwise, we have to summarize the version number of each sub packet!
      return (
        packet.packetVersion +
        packet.value.reduce((acc, subPacket) => {
          return acc + this.#getPacketVersionSum(subPacket);
        }, 0)
      );
    }
  };

  // Returns the value of the packet based on all the confusing rules...
  #getPacketValue = (packet) => {
    // If we're dealing with a literal packet, we can return the value right away...
    if (this.#packetIsLiteralPacket(packet)) {
      return packet.value;
    }
    // Otherwise, we have to handle the packets in some funky ways
    // First we'll get all the subPacket values: (The sub packets will be in the value key of the current packet).
    const subPacketValues = packet.value.map((subPacket) => {
      return this.#getPacketValue(subPacket);
    });
    // Then we'll handle the sub-packets according to the rules (based on the packet type)
    switch (packet.packetType) {
      case 0:
        // Sum-packet
        return subPacketValues.reduce((acc, packetValue) => {
          return acc + packetValue;
        }, 0);
      case 1:
        // Product-packet
        return subPacketValues.reduce((acc, packetValue) => {
          return acc * packetValue;
        }, 1);
      case 2:
        // Min-packet
        return Math.min(...subPacketValues);
      case 3:
        // Max-packet
        return Math.max(...subPacketValues);
      case 5:
        // Larger-packet
        return subPacketValues[0] > subPacketValues[1] ? 1 : 0;
      case 6:
        // Smaller-packet
        return subPacketValues[0] < subPacketValues[1] ? 1 : 0;
      case 7:
        // Equals-packet
        return subPacketValues[0] === subPacketValues[1] ? 1 : 0;
      default:
        console.log("Unhandled packet!");
    }
  };

  #parsePacket = (binaryString) => {
    // Let's begin by transforming to an array of characters. That way we can
    // splice the array and get rid of used characters.
    const characters = binaryString.split("");
    // The packet-version is the first three characters, let's get it.
    const packetVersion = parseInt(characters.splice(0, 3).join(""), 2);
    // The packet-type is the next three characters, let's get it.
    const packetType = parseInt(characters.splice(0, 3).join(""), 2);
    // Then we'll check the packet-type. If we're dealing with type 4 it's a
    // literal value.
    if (packetType === 4) {
      // We're gonna want to get the literals. There might be several sub-literals,
      let binaryString = "";
      // To get all the subs, we'll iterate until we find the sub with a leading 0
      // (stating that it is the last one).
      while (true) {
        // The subs should always contain 5 characters, so let's pad with
        // leading zeros if it's too short.
        const subLiteral = characters.splice(0, 5).join("").padEnd(5, "0");
        // Let's add the subLiteral (except for the first character) to the binaryString.
        binaryString += subLiteral.substring(1);
        // If the first character is a "0", we break the loop!
        if (subLiteral[0] === "0") {
          break;
        }
      }
      // Then we return the packet and the remaining characters.
      return {
        packet: {
          packetVersion,
          packetType,
          value: parseInt(binaryString, 2),
        },
        remainingCharacters: characters.join(""),
      };
    }
    // If we're not dealing with a type 4, we have get the length-type-id
    const lengthId = characters.splice(0, 1)[0];
    // If the length type ID is "0", then the next 15 bits are a number that represents
    // the total length in bits of the sub-packets contained by this packet.
    if (lengthId === "0") {
      // First we have to check how long the sub-packets are:
      const subPacketLength = parseInt(characters.splice(0, 15).join(""), 2);
      // Then we'll declare a variable holding all the sub-packet characters (which we can
      // remove piece by piece).
      let subPacketCharacters = characters.splice(0, subPacketLength).join("");
      // We'll need an array to hold all the sub-packets
      const subPackets = [];
      // Then we'll iterate until all subPacketCharacters are gone
      while (subPacketCharacters.length > 0) {
        const { packet, remainingCharacters } =
          this.#parsePacket(subPacketCharacters);
        subPackets.push(packet);
        subPacketCharacters = remainingCharacters;
      }
      // Then we'll return the packet!
      return {
        packet: { packetVersion, packetType, value: subPackets },
        remainingCharacters: characters.join(""),
      };
    } else {
      // If the length type ID is "1", then the next 11 bits are a number that represents the number
      // of sub-packets immediately contained by this packet.
      // First we'll get the number of sub-packets
      const packetCount = parseInt(characters.splice(0, 11).join(""), 2);
      // Then we'll get the data. (We don't want to deal with an array at this point)
      let data = characters.join("");
      // We'll need an array to hold all the sub-packets
      const subPackets = [];
      // Then we'll iterate over the number of sub-packets that we're supposed to:
      for (let i = 0; i < packetCount; i++) {
        // Parsing a packet each iteration...
        const { packet, remainingCharacters } = this.#parsePacket(data);
        subPackets.push(packet);
        data = remainingCharacters;
      }
      return {
        packet: { packetType, packetVersion, value: subPackets },
        remainingCharacters: data,
      };
    }
  };

  solveProblemOne = () => {
    const binaryString = [...INPUT.split("")].reduce((binary, hexVal) => {
      binary += this.#changeNumberBase(hexVal, 16, 2);
      return binary;
    }, "");
    // Let's parse the binary string!
    const { packet } = this.#parsePacket(binaryString);
    // Then we'll calculate the sum of the version numbers, and return!
    return this.#getPacketVersionSum(packet);
  };

  solveProblemTwo = () => {
    const binaryString = [...INPUT.split("")].reduce((binary, hexVal) => {
      binary += this.#changeNumberBase(hexVal, 16, 2);
      return binary;
    }, "");
    // Let's parse the binary string!
    const { packet } = this.#parsePacket(binaryString);
    // Then we'll calculate the value of the packet and return!
    return this.#getPacketValue(packet);
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
