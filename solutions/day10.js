function Setup(data) {
  return data.trim();
}

let incomplete; // Defining this way because benchmarking gets weird otherwise.

function Part1(data) {
  incomplete = [];
  let len;
  do {
    len = data.length;
    data = data.replace(/(\(\))|(\[\])|(\{\})|(\<\>)/g, "");
  } while (len != data.length);

  const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
  };

  let score = 0;
  for (const line of data.split("\n")) {
    const invalid = line.match(/[\)\]\}\>]/);
    if (invalid) {
      score += points[invalid[0]];
    } else {
      incomplete.push(line);
    }
  }
  return score;
}

function Part2(data) {
  const points = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4
  };

  const scores = [];

  for (const line of incomplete) {
    let value = 0;
    for (let i = line.length - 1; i >= 0; i--) {
      value = (value * 5) + points[line[i]];
    }
    scores.push(value);
  }
  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

module.exports = { Part1, Part2, Setup };
