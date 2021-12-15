const solve = require('../../utils/solve');
const getArrayNeighbours = require('../../utils/getArrayNeighbours');

const solver = (lines) => {
  const map = lines.map((line) => line.split('').map(Number));

  let targetX = lines[0].length;
  let targetY = lines.length;

  const cells = {
    '0,0': 0,
  };

  let front = [`0,0`];

  while (front.length > 0) {
    const coords = front.shift();
    const cost = cells[coords];
    const [x, y] = coords.split(',').map(Number);
    const neighbours = getArrayNeighbours(x, y, targetX, targetY);
    neighbours.forEach(([nx, ny]) => {
      const nValue = map[ny][nx];
      const nCost = cost + nValue;
      const nId = [nx, ny].join(',');
      if (typeof cells[nId] === 'undefined' || cells[nId] > nCost) {
        cells[nId] = nCost;
        front.push(nId);
      }
    });
  }

  return cells[[targetX - 1, targetY - 1].join(',')];
};

const solver1 = (lines) => {
  return solver(lines);
};

const solver2 = (lines) => {
  const map = lines.map((line) => line.split('').map(Number));

  const width = lines[0].length;
  const height = lines.length;
  const bigWidth = width * 5;
  const bigHeight = height * 5;

  for (let y = 0; y < bigHeight; y++) {
    for (let x = 0; x < bigWidth; x++) {
      const originalX = x < width ? x : x - width;
      const originalY = y < height ? y : y - width;
      const originalCell = map[originalY][originalX];
      let extra = 0;
      if (x > width - 1) {
        extra += 1;
      }
      if (y > height - 1) {
        extra += 1;
      }
      const newCell = originalCell + extra;
      if (!map[y]) {
        map[y] = [];
      }
      map[y][x] = newCell > 9 ? newCell % 9 : newCell;
    }
  }

  const bigLines = map.map((row) => row.join(''));

  return solver(bigLines);
};

const testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

const expectedResult1 = 40;
const expectedResult2 = 315;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
