const solve = require('../../utils/solve');

const solver1 = (lines) => {
  let horiz = 0;
  let depth = 0;

  lines.forEach((l) => {
    const [dir, val] = l.split(' ');
    const value = parseInt(val);
    switch (dir) {
      case 'forward': {
        horiz += value;
        break;
      }
      case 'up': {
        depth -= value;
        break;
      }
      case 'down': {
        depth += value;
        break;
      }
    }
  });

  return horiz * depth;
};

const solver2 = (lines) => {
  let horiz = 0;
  let depth = 0;
  let aim = 0;

  lines.forEach((l) => {
    const [dir, val] = l.split(' ');
    const value = parseInt(val);
    switch (dir) {
      case 'forward': {
        horiz += value;
        depth += aim * value;
        break;
      }
      case 'up': {
        aim -= value;
        break;
      }
      case 'down': {
        aim += value;
        break;
      }
    }
  });

  return horiz * depth;
};

const testInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

const expectedResult1 = 150;
const expectedResult2 = 900;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
