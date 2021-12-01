const { input, data, Part1, Part2 } = require("./aoc");

const benchmark = 10000;

console.log("\nBenchmarks:");
console.time(`Part 1 Time (x${benchmark})`);
  for (let i = 0; i < benchmark; i++) Part1(data);
console.timeEnd(`Part 1 Time (x${benchmark})`);

console.time(`Part 2 Time (x${benchmark})`);
  for (let i = 0; i < benchmark; i++) Part2(data);
console.timeEnd(`Part 2 Time (x${benchmark})`);
