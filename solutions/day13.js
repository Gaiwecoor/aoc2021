const {Point, Grid} = require("../tools");

function Setup(data) {
  let [points, folds] = data.trim().split("\n\n");
  //points = points.split("\n").map(p => new Point(p, true));
  const grid = new Grid();
  for (const point of points.split("\n")) {
    grid.set(point, true);
  }
  const exp = /fold along ([xy])=(\d+)/;
  folds = folds.split("\n").map(f => {
    const match = f.match(exp);
    return {dir: match[1], val: parseInt(match[2], 10)};
  });
  return {grid, folds};
}

function Part1(data) {
  const grid = data.grid.clone();
  const folds = data.folds;
  for (const fold of folds) {
    for (const [label,] of grid) {
      const point = new Point(label, true);

      if (point[fold.dir] >= fold.val) {
        if (fold.dir == "x") {
          grid.set((2 * fold.val) - point.x, point.y, true);
        } else {
          grid.set(point.x, (2 * fold.val) - point.y, true);
        }
        grid.delete(point);
      }
    }
    return grid.size;
  }
}

function Part2(data) {
  const grid = data.grid.clone();
  const folds = data.folds;
  for (const fold of folds) {
    for (const [label,] of grid) {
      const point = new Point(label, true);

      if (point[fold.dir] >= fold.val) {
        if (fold.dir == "x") {
          grid.set((2 * fold.val) - point.x, point.y, true);
        } else {
          grid.set(point.x, (2 * fold.val) - point.y, true);
        }
        grid.delete(point);
      }
    }
  }

  for (let y = 0; y < 8; y++) {
    let line = "";
    for (let x = 0; x < 40; x++) {
      line += (grid.has(x, y) ? "#" : " ");
    }
    console.log(line);
  }
  return undefined;
}

module.exports = { Part1, Part2, Setup };
