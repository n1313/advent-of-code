const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const start = {
  x: 0,
  y: 0,
};

main();

function getNextCellCoord(current, slope, width) {
  let nextX = current.x + slope.right;
  if (nextX >= width) {
    nextX = nextX - width;
  }

  const next = {
    x: nextX,
    y: current.y + slope.down,
  };

  return next;
}

function getSlopeCells(start, slope, arr) {
  let current = { ...start };

  const height = arr.length;
  const width = arr[0].length;

  const cells = [];

  while (current.y < height - 1) {
    const nextCoord = getNextCellCoord(current, slope, width);
    const cell = arr[nextCoord.y][nextCoord.x];
    cells.push(cell);
    current = nextCoord;
  }

  return cells;
}

function variantDumb(arr) {
  const result = slopes.map((slope) => {
    let trees = 0;

    const cells = getSlopeCells(start, slope, arr.filter(Boolean));

    cells.forEach((cell) => {
      if (cell === '#') {
        trees += 1;
      }
    });

    return trees;
  });

  return result.reduce((a, b) => a * b, 1);
}

function solve() {
  return variantDumb(inputString);
}

function main() {
  const start = new Date();
  let result = solve();
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
