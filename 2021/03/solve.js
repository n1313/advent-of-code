const solve = require('../../utils/solve');

const getMostCommonBit = (lines, position) => {
  let ones = 0;
  let zeroes = 0;

  lines.forEach((l) => {
    const b = l[position];
    if (b === '0') {
      zeroes += 1;
    } else {
      ones += 1;
    }
  });

  if (ones > zeroes) {
    return '1';
  } else if (zeroes > ones) {
    return '0';
  } else {
    return '!';
  }
};

const solver1 = (lines) => {
  const map = {};

  lines.forEach((l) => {
    const bits = l.split('');
    bits.forEach((b, i) => {
      if (!map[i]) {
        map[i] = {
          0: 0,
          1: 0,
        };
      }
      map[i][b] += 1;
    });
  });

  let gammaBin = '';
  let epsilonBin = '';

  Object.entries(map).forEach(([k, v]) => {
    if (v['0'] > v['1']) {
      gammaBin += '0';
      epsilonBin += '1';
      map[k].larger = '0';
    } else {
      gammaBin += '1';
      epsilonBin += '0';
      map[k].larger = '1';
    }
  });

  const gamma = parseInt(gammaBin, 2);
  const epsilon = parseInt(epsilonBin, 2);

  return gamma * epsilon;
};

const solver2 = (lines) => {
  let oxygenCandidates = [...lines];
  let co2Candidates = [...lines];

  let i = 0;

  while (oxygenCandidates.length > 1) {
    let mostCommonBit = getMostCommonBit(oxygenCandidates, i);
    if (mostCommonBit === '!') {
      mostCommonBit = '1';
    }
    oxygenCandidates = oxygenCandidates.filter((c) => c[i] === mostCommonBit);
    i += 1;
  }

  i = 0;
  while (co2Candidates.length > 1) {
    let mostCommonBit = getMostCommonBit(co2Candidates, i);
    if (mostCommonBit === '!') {
      mostCommonBit = '1';
    }
    co2Candidates = co2Candidates.filter((c) => c[i] !== mostCommonBit);
    i += 1;
  }

  const oxygen = parseInt(oxygenCandidates[0], 2);
  const c02 = parseInt(co2Candidates[0], 2);

  return oxygen * c02;
};

const testInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const expectedResult1 = 198;
const expectedResult2 = 230;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
