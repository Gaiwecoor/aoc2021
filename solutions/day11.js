const {Point, USet, Grid} = require("../tools");

function Setup(data) {
  const grid = new Grid();
  data = data.trim().split("\n");
  for (let y = 0; y < data.length; y++) {
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      grid.set(x, y, new Octopus(x, y, parseInt(row[x], 10), grid));
    }
  }
  grid.flashes = 0;
  grid.steps = 0;
  return grid;
}

class Octopus extends Point {
  constructor(x, y, value, grid) {
    super(x, y, value);
    this.grid = grid;
    this.flashed = false;
  }

  flash() {
    this.flashed = true;
    this.grid.flashes++;
    for (const neighbor of this.neighbors) {
      neighbor.step();
    }
    return this;
  }

  get neighbors() {
    const n = new USet();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        let x = this.x + dx, y = this.y + dy;
        if (this.grid.has(x, y)) n.add(this.grid.get(x, y));
      }
    }
    return n;
  }

  reset() {
    this.value = 0;
    this.flashed = false;
    return this;
  }

  step() {
    this.value++;
    return this;
  }

  toValue() {
    return this.value;
  }
}

function step(grid) {
  for (const [, octopus] of grid) octopus.step();

  let flashed;
  do {
    flashed = grid.filter(octopus => octopus.value > 9 && !octopus.flashed);
    for (const [, octopus] of flashed) octopus.flash();
  } while (flashed.size > 0);

  flashed = grid.filter(octopus => octopus.flashed);
  for (const [, octopus] of flashed) octopus.reset();

  grid.steps++;
  return flashed.size;
}

function Part1(grid) {
  for (let i = 0; i < 100; i++) step(grid);
  return grid.flashes;
}

function Part2(grid) {
  let flashed = 0;
  while (flashed != grid.size) flashed = step(grid);
  return grid.steps;
}

module.exports = { Part1, Part2, Setup };
