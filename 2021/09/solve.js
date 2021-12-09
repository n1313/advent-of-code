const getArrayNeighbours = require('../../utils/getArrayNeighbours');
const solve = require('../../utils/solve');

const solver1 = (lines) => {
  const map = lines.map((l) => l.split(''));
  const h = lines.length;
  const w = lines[0].length;

  let sum = 0;

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      const neighbours = getArrayNeighbours(x, y, w, h);
      const neighbourValues = neighbours.map(([nx, ny]) => {
        return map[ny][nx];
      });
      const lowerThanCell = neighbourValues.find((v) => v <= cell);
      if (!lowerThanCell) {
        sum += +cell + 1;
      }
    });
  });

  return sum;
};

const fillMap = (startX, startY, map, h, w) => {
  let basinSize = 0;
  const queue = [[startX, startY]];

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    if (map[y][x] === ' ') {
      basinSize += 1;
      map[y][x] = '*';
    }
    const neighbours = getArrayNeighbours(x, y, w, h);
    neighbours.filter(([nx, ny]) => map[ny][nx] === ' ').forEach((n) => queue.push(n));
  }

  return basinSize;
};

const solver2 = (lines) => {
  const map = lines.map((l) => l.split('').map((x) => (x === '9' ? x : ' ')));
  const h = lines.length;
  const w = lines[0].length;

  const basins = [];

  let result = 0;

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      const cell = map[y][x];
      if (cell === ' ') {
        basins.push(fillMap(x, y, map, h, w));
      }
    }
  }

  return basins
    .sort((a, z) => z - a)
    .slice(0, 3)
    .reduce((a, i) => a * i, 1);
};

const testInput = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

const expectedResult1 = 15;
const expectedResult2 = 1134;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
