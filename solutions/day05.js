const { Point, UMap } = require("../tools");

function Setup(data) {
  return data.trim().split("\n").map(row => row.split(" -> ").map(pt => new Point(pt)));
}

function Part1(data) {
  const floor = new UMap();

  for (const pair of data) {
    const [pt1, pt2] = pair;

    if (pt1.x == pt2.x) {
      for (let y = Math.min(pt1.y, pt2.y); y <= Math.max(pt1.y, pt2.y); y++) {
        floor.set(`${pt1.x},${y}`, (floor.has(`${pt1.x},${y}`) ? 2 : 1));
      }
    } else if (pt1.y == pt2.y) {
      for (let x = Math.min(pt1.x, pt2.x); x <= Math.max(pt1.x, pt2.x); x++) {
        floor.set(`${x},${pt1.y}`, (floor.has(`${x},${pt1.y}`) ? 2 : 1));
      }
    }
  }

  return floor.filter(v => v == 2).size;
}

function Part2(data) {
  const floor = new UMap();

  for (const pair of data) {
    const [pt1, pt2] = pair;
    const [dx, dy] = [((pt2.x - pt1.x) / Math.abs(pt2.x - pt1.x)) || 0, ((pt2.y - pt1.y) / Math.abs(pt2.y - pt1.y)) || 0];
    let {x, y} = pt1;

    floor.set(`${x},${y}`, (floor.has(`${x},${y}`) ? 2 : 1));
    while (pt2.distanceTo({x, y}) != 0) {
      x += dx;
      y += dy;
      floor.set(`${x},${y}`, (floor.has(`${x},${y}`) ? 2 : 1));
    }
  }

  return floor.filter(v => v == 2).size;
}

module.exports = { Part1, Part2, Setup };
