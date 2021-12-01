const day = process.argv[2].padStart(2, "0");
const fs = require("fs");

console.time("Complete Time");
  console.time("Setup Time");
    const {
      Setup = (data) => data,
      Part1 = () => undefined,
      Part2 = () => undefined
    } = require(`./solutions/day${day}`);
    const input = fs.readFileSync(`./inputs/input${day}.txt`, "utf8");
    const data = Setup(input);
  console.timeEnd("Setup Time");

  console.time("Part 1 Time");
    console.log("Part 1:", Part1(data));
  console.timeEnd("Part 1 Time");

  console.time("Part 2 Time");
    console.log("Part 2:", Part2(data));
  console.timeEnd("Part 2 Time");
console.timeEnd("Complete Time");

module.exports = {
  input,
  data,
  Part1,
  Part2
}
