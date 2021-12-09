const {Point, Grid, USet} = require("../tools");

function Setup(data) {
  return data.trim().split("\n").map(r => r.split("").map(n => parseInt(n, 10)));
}

function Part1(data) {
  let riskSum = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (
        ((x > 0) ? (data[y][x] < data[y][x - 1]) : true) &&
        ((x < data[y].length - 1) ? (data[y][x] < data[y][x + 1]) : true) &&
        ((y > 0) ? (data[y][x] < data[y - 1][x]) : true) &&
        ((y < data.length - 1) ? (data[y][x] < data[y + 1][x]) : true)
      ) {
        riskSum += data[y][x] + 1;
      }
    }
  }
  return riskSum;
}

function Part2(data) {
  const basins = [];
  const pool = new Grid();
  for (let y = 0; y < data.length; y++) {
    for (x = 0; x < data[y].length; x++) {
      if (data[y][x] == 9) continue;
      const pt = new Point(x, y, data[y][x]);
      pool.set(pt, pt);
    }
  }

  while (pool.size > 0) {
    const basin = new USet();
    basins.push(basin);

    const neighbors = new USet([pool.first()]);
    pool.delete(neighbors.first());
    while (neighbors.size > 0) {
      let pt = neighbors.first();
      basin.add(pt);
      neighbors.delete(pt);

      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const neighbor = `${pt.x + dx},${pt.y + dy}`;
        if (pool.has(neighbor)) {
          neighbors.add(pool.get(neighbor));
          pool.delete(neighbor);
        }
      }
    }
  }

  return basins.sort((a, b) => b.size - a.size).slice(0, 3).reduce((a, c) => a * c.size, 1);
}

module.exports = { Part1, Part2, Setup };
