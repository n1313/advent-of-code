const solve = require('../../utils/solve');

const EVERY = 7;
const PENALTY = 2;

const solver1 = (lines) => {
  const DAYS = 80;

  let fishes = lines[0].split(',');

  for (let day = 0; day < DAYS; day++) {
    const l = fishes.length;
    for (let f = 0; f < l; f++) {
      if (fishes[f] === 0) {
        fishes[f] = EVERY - 1;
        fishes.push(EVERY + PENALTY - 1);
      } else {
        fishes[f] = fishes[f] - 1;
      }
    }
  }

  return fishes.length;
};

const solver2 = (lines) => {
  const DAYS = 256;
  let ages = [0, 0, 0, 0, 0, 0, 0, 0];

  let fishes = lines[0].split(',');
  fishes.forEach((age) => {
    ages[age] += 1;
  });

  for (let day = 0; day < DAYS; day++) {
    const newAges = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let a = ages.length - 1; a >= 0; a--) {
      if (a > 0) {
        newAges[a - 1] += ages[a];
      } else {
        newAges[EVERY + PENALTY - 1] = ages[a];
        newAges[EVERY - 1] += ages[a];
      }
    }
    ages = newAges;
  }

  return ages.reduce((a, x) => (a += x), 0);
};

const testInput = `3,4,3,1,2`;

const expectedResult1 = 5934;
const expectedResult2 = 26984457539;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
