function Setup(data) {
  return data.trim().split(",").map(n => parseInt(n, 10));
}

function Part1(data, days = 80) {
  let population = Array(10).fill(0);
  for (const fish of data) {
    population[fish + 1]++;
  }

  for (let d = 0; d < days; d++) {
    for (let i = 1; i <= 9; i++) {
      population[i - 1] = population[i];
    }
    population[9] = population[0];
    population[7] += population[0];
    population[0] = 0;
  }

  return population.reduce((a, c) => a + c, 0);
}

function Part2(data) {
  return Part1(data, 256);
}

module.exports = { Part1, Part2, Setup };
