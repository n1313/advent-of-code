const solve = require('../../utils/solve');

const solver1 = (lines) => {
  const positions = lines[0].split(',').sort((a, z) => a - z);

  const min = positions[0];
  const max = positions[positions.length - 1];

  const results = {};

  for (let i = min; i <= max; i++) {
    const delta = positions.reduce((acc, pos) => (acc += Math.abs(pos - i)), 0);
    results[i] = delta;
  }

  return Object.values(results).sort((a, z) => a - z)[0];
};

const progDelta = (delta) => (delta + 1) * (delta / 2);

const solver2 = (lines) => {
  const positions = lines[0].split(',').sort((a, z) => a - z);

  const min = positions[0];
  const max = positions[positions.length - 1];

  const results = {};

  for (let i = min; i <= max; i++) {
    const delta = positions.reduce((acc, pos) => (acc += progDelta(Math.abs(pos - i))), 0);
    results[i] = delta;
  }

  return Object.values(results).sort((a, z) => a - z)[0];
};

const testInput = `16,1,2,0,4,2,7,1,2,14`;

const expectedResult1 = 37;
const expectedResult2 = 168;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
