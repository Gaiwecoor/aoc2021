const {Link} = require("../tools");

class Polymer extends Link {
  constructor(data) {
    super(data);
  }

  sub(n = 2) {
    let string = "";
    let current = this;
    for (let i = 0; i < n; i++) {
      string += current;
      if (!(current = current.next())) break;
    }
    return string;
  }

  get total() {
    const count = new Map();
    let polymer = this.first;
    do {
      if (!count.has(polymer.value)) count.set(polymer.value, 1);
      else count.set(polymer.value, count.get(polymer.value) + 1);
    } while (polymer = polymer.after);
    const polymers = Array.from(count.entries()).sort((a, b) => a[1] - b[1]);
    return {high: polymers[polymers.length - 1][1], low: polymers[0][1]};
  }
}

function Setup(data) {
  let [polymer, transforms] = data.trim().split("\n\n");

  const first = new Polymer(polymer[0]);
  let current = first;
  for (let i = 1; i < polymer.length; i++) {
    current = current.addAfter(polymer[i]);
  }

  transforms = new Map(transforms.split("\n").map(t => t.split(" -> ")));

  return {polymer: first, transforms};
}

function Part1(data, n = 10) {
  const {transforms} = data;
  for (let i = 0; i < n; i++) {
    let polymer = data.polymer.last;
    while (polymer = polymer.before) {
      if (transforms.has(polymer.sub())) polymer.addAfter(transforms.get(polymer.sub()));
    }
  }

  const {high, low} = data.polymer.total;
  return high - low;
}

function Part2(data) {
  // Don't do this. It gets big.
  return Part1(data, 30);
}

module.exports = { Part1, Part2, Setup };
