const {USet} = require("../tools");

function Setup(data) {
  return data.trim().split("\n").map(l => l.split(" | ").map(s => s.split(" ")));
}

function Part1(data) {
  let count = 0;
  for (const [input, output] of data) {
    let filtered = output.filter(d => [2, 4, 3, 7].includes(d.length));
    count += filtered.length;
  }
  return count;
}

function Part2(data) {
  const segments = {
    a: 0b1000000,
    b: 0b0100000,
    c: 0b0010000,
    d: 0b0001000,
    e: 0b0000100,
    f: 0b0000010,
    g: 0b0000001
  };
  function toBits(signal, string = false) {
    let b = signal.split("").reduce((a, c) => a | segments[c], 0);
    if (string) return (b.toString(2).padStart(7, "0"));
    return b;
  }

  let signalSum = 0;

  for (let [digits, output] of data) {
    digits = new USet(digits);

    const mapped = Array(10);
    let num;
    // 1, 4, 7, 8
    for (const [index, length] of [[1, 2], [4, 4], [7, 3], [8, 7]]) {
      num = digits.find(d => d.length == length);
      mapped[index] = toBits(num);
      digits.delete(num);
    }

    // 9
    num = digits.find(d => (d.length == 6) && ((toBits(d) & (mapped[4] | mapped[7])) == (mapped[4] | mapped[7])));
    mapped[9] = toBits(num);
    digits.delete(num);

    // 0
    num = digits.find(d => (d.length == 6) && ((toBits(d) & mapped[1]) == mapped[1]));
    mapped[0] = toBits(num);
    digits.delete(num);

    // 6
    num = digits.find(d => d.length == 6);
    mapped[6] = toBits(num);
    digits.delete(num);

    // 3
    num = digits.find(d => (toBits(d) & mapped[1]) == mapped[1]);
    mapped[3] = toBits(num);
    digits.delete(num);

    // 5
    num = digits.find(d => (toBits(d) & mapped[6]) == toBits(d));
    mapped[5] = toBits(num);
    digits.delete(num);

    // 2
    num = digits.first();
    mapped[2] = toBits(num);
    digits.delete(num);

    signalSum += parseInt(output.map(n => mapped.indexOf(toBits(n))).join(""), 10);
  }
  return signalSum;
}

module.exports = { Part1, Part2, Setup };
