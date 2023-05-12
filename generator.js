const Generator = {
  // Implement calculator
  version() {
    console.log("You can use console.log for debugging");
    return 1;
  },

  validIPSequence(sequence) {
    if (!sequence.length) {
      return false;
    }

    if (parseInt(sequence) > 255) {
      return false;
    }

    return !(sequence.startsWith('0') && sequence.length > 1);
  },

  calculateNextSequences(ipNumbers, offset) {
    const possibleSequences = [];

    for (let i = offset; i < ipNumbers.length; i++) {
      const start = offset;
      const end = i + 1;
      const chunkSequence = ipNumbers.substring(start, end);

      if (!Generator.validIPSequence(chunkSequence)) {
        continue;
      }

      possibleSequences.push(chunkSequence);
    }

    return possibleSequences;
  },

  generateIPAddresses(numberInput) {
    const numbers = numberInput.toString();
    const ips = [];

    for (const firstSequence of Generator.calculateNextSequences(numbers, 0)) {
      for (const secondSequence of Generator.calculateNextSequences(numbers, firstSequence.length)) {
        for (const thirdSequence of Generator.calculateNextSequences(numbers, secondSequence.length + firstSequence.length)) {
          for (const fourthSequence of Generator.calculateNextSequences(numbers, thirdSequence.length + secondSequence.length + firstSequence.length)) {
            const ip = [firstSequence, secondSequence, thirdSequence, fourthSequence].join('.');

            if (ip.length === numbers.length + 3) {
              ips.push(ip);
            }
          }
        }
      }
    }

    return ips;
  },
};

// console.log(Generator.generateIPAddresses(1234));
// console.log(Generator.generateIPAddresses(2512512542));
// console.log(Generator.generateIPAddresses(25325125425));
// console.log(Generator.generateIPAddresses(122689));
// console.log(Generator.generateIPAddresses(10100));
// console.log(Generator.generateIPAddresses(25325125425));

module.exports = Generator;