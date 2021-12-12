const solve = require('../../utils/solve');
const getArrayNeighbours = require('../../utils/getArrayNeighbours');

const getNines = (map) => {
  const nines = [];
  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell > 9) {
        nines.push([x, y]);
      }
    });
  });
  return nines;
};

const flashes = (map, w, h) => {
  let count = 0;
  const nines = getNines(map);
  if (nines.length) {
    nines.forEach(([x, y]) => {
      if (map[y][x] >= 9) {
        count += 1;
        map[y][x] = -Infinity;
        getArrayNeighbours(x, y, w, h, true).forEach(([nx, ny]) => {
          map[ny][nx] += 1;
        });
        count += flashes(map, w, h);
      }
    });
  }
  return count;
};

const solver1 = (lines) => {
  const STEPS = 100;

  const map = lines.map((l) => l.split('').map(Number));
  const w = map[0].length;
  const h = map.length;

  let result = 0;

  for (let step = 0; step < STEPS; step++) {
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        map[y][x] += 1;
      });
    });
    result += flashes(map, w, h);

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === -Infinity) {
          map[y][x] = 0;
        }
      });
    });
  }

  return result;
};

const solver2 = (lines) => {
  const map = lines.map((l) => l.split('').map(Number));
  const w = map[0].length;
  const h = map.length;

  let allFlash = false;
  let step = 1;

  while (!allFlash) {
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        map[y][x] += 1;
      });
    });

    const flashedThisStep = flashes(map, w, h);

    if (flashedThisStep === 100) {
      allFlash = true;
      return step;
    }

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === -Infinity) {
          map[y][x] = 0;
        }
      });
    });

    step += 1;
  }
};

const testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

const expectedResult1 = 1656;
const expectedResult2 = 195;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
