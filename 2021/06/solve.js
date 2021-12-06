const solve = require('../../utils/solve');

const simulateFish = (fishes, days) => {
  let ages = [0, 0, 0, 0, 0, 0, 0, 0];

  fishes.forEach((age) => {
    ages[age] += 1;
  });

  for (let day = 0; day < days; day++) {
    const newAges = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let a = ages.length - 1; a >= 0; a--) {
      if (a > 0) {
        newAges[a - 1] += ages[a];
      } else {
        newAges[8] = ages[a];
        newAges[6] += ages[a];
      }
    }
    ages = newAges;
  }

  return ages.reduce((a, x) => (a += x), 0);
};

const solver1 = (lines) => {
  return simulateFish(lines[0].split(','), 80);
};

const solver2 = (lines) => {
  return simulateFish(lines[0].split(','), 256);
};

const testInput = `3,4,3,1,2`;

const expectedResult1 = 5934;
const expectedResult2 = 26984457539;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
