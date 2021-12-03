const solve = require('../../utils/solve');

const solver1 = (lines) => {
  const map = [];
  const width = lines[0].length;

  for (let i = 0; i < width; i++) {
    map[i] = [0, 0];
  }

  lines.forEach((l) => {
    for (let i = 0; i < width; i++) {
      map[i][l[i]] += 1;
    }
  });

  let gammaBin = '';
  let epsilonBin = '';

  map.forEach((i) => {
    if (i[0] > i[1]) {
      gammaBin += '0';
      epsilonBin += '1';
    } else {
      gammaBin += '1';
      epsilonBin += '0';
    }
  });

  const gamma = parseInt(gammaBin, 2);
  const epsilon = parseInt(epsilonBin, 2);

  return gamma * epsilon;
};

const getMostCommonBit = (lines, position) => {
  let ones = 0;

  lines.forEach((l) => {
    if (l[position] === '1') {
      ones += 1;
    }
  });

  if (ones >= lines.length / 2) {
    return '1';
  } else {
    return '0';
  }
};

const solver2 = (lines) => {
  let oxygenCandidates = [...lines];
  let co2Candidates = [...lines];

  let i = 0;

  while (oxygenCandidates.length > 1) {
    const mostCommonBit = getMostCommonBit(oxygenCandidates, i);
    oxygenCandidates = oxygenCandidates.filter((c) => c[i] === mostCommonBit);
    i += 1;
  }

  i = 0;

  while (co2Candidates.length > 1) {
    const mostCommonBit = getMostCommonBit(co2Candidates, i);
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
