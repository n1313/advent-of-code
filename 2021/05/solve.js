const solve = require('../../utils/solve');

const parseLine = (line) => {
  const [from, to] = line.split(' -> ');
  return [from.split(',').map(Number), to.split(',').map(Number)];
};

const expandCoords = ([from, to]) => {
  const result = [from];
  let last = result[result.length - 1];
  let next = [];
  while (last[0] !== to[0] || last[1] !== to[1]) {
    if (last[0] > to[0]) {
      next[0] = last[0] - 1;
    } else if (last[0] < to[0]) {
      next[0] = last[0] + 1;
    } else {
      next[0] = last[0];
    }
    if (last[1] > to[1]) {
      next[1] = last[1] - 1;
    } else if (last[1] < to[1]) {
      next[1] = last[1] + 1;
    } else {
      next[1] = last[1];
    }
    result.push(next);
    last = next;
    next = [];
  }
  return result;
};

const solver1 = (lines) => {
  const floor = {};

  const expandedCoords = lines
    .map(parseLine)
    .filter(([from, to]) => from[0] === to[0] || from[1] === to[1])
    .map(expandCoords)
    .forEach((arr) => {
      arr.forEach((cell) => {
        floor[cell] = floor[cell] ? floor[cell] + 1 : 1;
      });
    });

  const result = Object.values(floor).filter((v) => v > 1).length;

  return result;
};

const solver2 = (lines) => {
  const floor = {};

  const expandedCoords = lines
    .map(parseLine)
    // .filter(([from, to]) => from[0] === to[0] || from[1] === to[1])
    .map(expandCoords)
    .forEach((arr) => {
      arr.forEach((cell) => {
        floor[cell] = floor[cell] ? floor[cell] + 1 : 1;
      });
    });

  const result = Object.values(floor).filter((v) => v > 1).length;

  return result;
};

const testInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const expectedResult1 = 5;
const expectedResult2 = 12;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
