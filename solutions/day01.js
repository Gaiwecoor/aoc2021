function Setup(data) {
  return data.split("\n").map(d => parseInt(d, 10));
}

function Part1(data) {
  let drop = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) drop++;
  }
  return drop;
}

function Part2(data) {
  let drop = 0;
  for (let i = 3; i < data.length; i++) {
    if (data[i] > data[i - 3]) drop++;
  }
  return drop;
}

module.exports = { Part1, Part2, Setup };
