const {UMap} = require("../tools");

function Setup(data) {
  return data.trim().split(",").map(n => parseInt(n, 10));
}

function Part1(data, fuelCalc = function(p) {
  return (a, {n}, c) => a + n * Math.abs(c - p);
}) {
  const positions = new UMap();
  for (const crab of data) {
    if (!positions.has(crab)) positions.set(crab, {n: 1});
    else positions.get(crab).n++;
  }
  const [minP, maxP] = [Math.min(...positions.keys()), Math.max(...positions.keys())];

  let min = Infinity;
  for (let p = minP; p <= maxP; p++) {
    let fuel = positions.reduce(fuelCalc(p), 0);
    if (fuel < min) min = fuel;
    else return min;
  }
}

function Part2(data) {
  const sum = (n) => ((n * (n + 1)) / 2);
  return Part1(data, function(p) {
    return (a, {n}, c) => a + n * sum(Math.abs(c - p));
  });
}

module.exports = { Part1, Part2, Setup };
