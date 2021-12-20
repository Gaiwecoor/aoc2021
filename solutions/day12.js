const {USet, UMap} = require("../tools");

function Setup(data) {
  return data.trim().split("\n").map(l => l.split("-"));
}

class Cave {
  constructor(name, cavern) {
    this.cavern = cavern;
    this.name = name;
    this.connections = new USet();
    this.large = (this.name === this.name.toUpperCase());
  }

  connect(name) {
    if (!this.cavern.has(name)) this.cavern.set(name, new this.constructor(name, this.cavern));
    this.cavern.get(name).connections.add(this.name);
    this.connections.add(name);
    return this;
  }
}

function Part1(data) {
  const cavern = new UMap();

  for (const [caveA, caveB] of data) {
    if (!cavern.has(caveA)) cavern.set(caveA, new Cave(caveA, cavern));
    cavern.get(caveA).connect(caveB);
  }

  const paths = new USet(["start"]);
  const complete = new USet();

  for (const path of paths) {
    const steps = path.split(",");
    const current = steps[steps.length - 1];
    for (const connection of cavern.get(current).connections) {
      if (connection === "end") {
        complete.add(`${path},${connection}`);
      } else if (cavern.get(connection).large || !steps.includes(connection)) {
        paths.add(`${path},${connection}`);
      }
    }
    paths.delete(path);
  }

  return complete.size;
}

function Part2(data) {
  const cavern = new UMap();

  for (const [caveA, caveB] of data) {
    if (!cavern.has(caveA)) cavern.set(caveA, new Cave(caveA, cavern));
    cavern.get(caveA).connect(caveB);
  }

  const paths = new USet(["start"]);
  const complete = new USet();

  for (const path of paths) {
    const steps = path.split(",");
    const current = steps[steps.length - 1];
    for (const connection of cavern.get(current).connections) {
      if (connection === "end") {
        complete.add(`${path},${connection}`);
      } else if (connection === "start") {
        continue;
      } else if (cavern.get(connection).large || (steps.filter(s => s === connection).length == 0)) {
        paths.add(`${path},${connection}`);
      } else if (path[0] != "#") {
        paths.add(`#${path},${connection}`);
      }
    }
    paths.delete(path);
  }

  return complete.size;
}

module.exports = { Part1, Part2, Setup };
