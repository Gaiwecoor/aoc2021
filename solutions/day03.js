function Setup(data) {
  return data.trim().split("\n").map(e => parseInt(e, 2));
}

const bitLen = 12,
  bits = Array(bitLen).fill().map((e, i) => 2 ** i),
  bit1 = bits[bitLen - 1],
  sum = (2 ** bitLen) - 1;

function Part1(data) {
  const counts = Array(bitLen).fill(0);
  for (let signal of data) {
    for (let i = 0; i < bitLen; i++) {
      if (signal & bits[i]) counts[i]++;
    }
  }
  const gamma = parseInt(counts.reverse().map(e => e > data.length / 2 ? 1 : 0).join(""), 2),
    epsilon = sum - gamma;
  return gamma * epsilon;
}

function Part2(data) {
  let o2 = data;
  for (let i = bitLen - 1; i >= 0; i--) {
    if (o2.length == 1) break;
    let count = o2.reduce((a, c) => a + ((c & bits[i]) ? 1 : 0), 0);
    let high = (count < o2.length / 2) ? 0 : 1;
    o2 = o2.filter(e => ((e & bits[i]) && 1) == high);
  }


  let co2 = data;
  for (let i = bitLen - 1; i >= 0; i--) {
    if (co2.length == 1) break;
    let count = co2.reduce((a, c) => a + ((c & bits[i]) ? 1 : 0), 0);
    let high = (count < co2.length / 2) ? 0 : 1;
    co2 = co2.filter(e => ((e & bits[i]) && 1) != high);
  }

  return o2[0] * co2[0];
}

module.exports = { Part1, Part2, Setup };
