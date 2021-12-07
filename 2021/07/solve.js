const solve = require('../../utils/solve');

const solver1 = (lines) => {
  const positions = lines[0]
    .split(',')
    .map(Number)
    .sort((a, z) => a - z);

  const median = positions[positions.length / 2];

  return positions.reduce((acc, pos) => (acc += Math.abs(pos - median)), 0);
};

const progDelta = (delta) => (delta + 1) * (delta / 2);

const solver2 = (lines) => {
  const positions = lines[0].split(',').map(Number);

  const mean = Math.round(positions.reduce((a, i) => (a += i), 0) / positions.length);

  return positions.reduce((acc, pos) => (acc += progDelta(Math.abs(pos - mean))), 0);
};

const testInput = `16,1,2,0,4,2,7,1,2,14`;

const expectedResult1 = 37;
const expectedResult2 = 168;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
