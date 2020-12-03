const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

const slope = {
  right: 3,
  down: 1,
};

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
  let trees = 0;

  const cells = getSlopeCells(start, slope, arr.filter(Boolean));

  cells.forEach((cell) => {
    if (cell === '#') {
      trees += 1;
    }
  });

  return trees;
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
