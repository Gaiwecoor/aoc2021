const {UMap} = require("../tools");

function Setup(data) {
  let [polymer, transforms] = data.trim().split("\n\n");

  const counts = {};
  const pairs = {};

  for (let i = 0; i < polymer.length; i++) {
    if (!counts[polymer[i]]) counts[polymer[i]] = 1;
    else counts[polymer[i]]++;

    if (i < (polymer.length - 1)) {
      const pair = polymer[i] + polymer[i + 1];
      if (!pairs[pair]) pairs[pair] = 1;
      else pairs[pair]++;
    }
  }

  transforms = new UMap(transforms.split("\n").map(t => {
    const [input, insert] = t.split(" -> ");
    return [input, {insert, increment: [input[0] + insert, insert + input[1]]}];
  }));

  return {counts, pairs, transforms};
}

function clone(object) {
  const cln = {};
  for (const key of Object.keys(object)) cln[key] = object[key];
  return cln;
}

function Part1({counts, pairs, transforms}, n = 10) {
  counts = clone(counts);

  for (let i = 0; i < n; i++) {
    const result = clone(pairs);

    for (const [input, {insert, increment}] of transforms) {
      if (pairs[input] > 0) {

        if (!counts[insert]) counts[insert] = pairs[input];
        else counts[insert] += pairs[input];

        for (const inc of increment) {
          if (!result[inc]) result[inc] = pairs[input];
          else result[inc] += pairs[input];
        }
        result[input] -= pairs[input];

      }
    }
    pairs = result;
  }

  return Math.max(...Object.values(counts)) - Math.min(...Object.values(counts));
}

function Part2(data) {
  return Part1(data, 40);
}

module.exports = { Part1, Part2, Setup };
