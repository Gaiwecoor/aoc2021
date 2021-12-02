function Setup(data) {
  return data.trim().split("\n").map(d => {
    const [ dir, val ] = d.split(" ");
    return { dir, val: parseInt(val, 10) };
  });
}

function Part1(data) {
  let x = 0, y = 0;

  for (const cmd of data) {
    switch (cmd.dir) {
      case "forward":
        x += cmd.val;
        break;
      case "down":
        y += cmd.val;
        break;
      case "up":
        y -= cmd.val;
        break;
      default:
        throw Error(`Unknown Command: ${cmd.dir} ${cmd.val}`);
    }
  }
  return x * y;
}

function Part2(data) {
  let x = 0, y = 0, aim = 0;

  for (const cmd of data) {
    switch (cmd.dir) {
      case "forward":
        x += cmd.val;
        y += aim * cmd.val;
        break;
      case "down":
        aim += cmd.val;
        break;
      case "up":
        aim -= cmd.val;
        break;
      default:
        throw Error(`Unknown Command: ${cmd.dir} ${cmd.val}`);
    }
  }

  return x * y;
}

module.exports = { Part1, Part2, Setup };
