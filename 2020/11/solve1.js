const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function getAdjacentSeats(row, col, map) {
  const adjacents = [];

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (!(r === row && c === col) && typeof map[r] !== 'undefined' && typeof map[r][c] !== 'undefined') {
        const seat = map[r][c];
        adjacents.push(seat);
      }
    }
  }

  return adjacents;
}

function processSeat(row, col, map) {
  const seat = map[row][col];

  if (seat === '.') {
    return '.';
  }

  const adjacents = getAdjacentSeats(row, col, map);
  const occupiedAdjacents = adjacents.filter((seat) => seat === '#').length;

  if (seat === 'L' && occupiedAdjacents === 0) {
    return '#';
  }

  if (seat === '#' && occupiedAdjacents > 3) {
    return 'L';
  }

  return seat;
}

function variantDumb(arr) {
  const map = arr.map((line) => {
    return line.split('');
  });

  const width = map[0].length;
  const height = map.length;

  let stable = false;
  let start = JSON.parse(JSON.stringify(map));
  let finish;

  let step = 0;

  while (!stable) {
    finish = start.map((x) => {
      return [];
    });

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        finish[row][col] = processSeat(row, col, start);
      }
    }

    if (JSON.stringify(start) === JSON.stringify(finish)) {
      stable = true;
    } else {
      start = JSON.parse(JSON.stringify(finish));
    }

    step += 1;
  }

  console.log('stable!', step);

  let finalOccupied = 0;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (finish[row][col] === '#') {
        finalOccupied += 1;
      }
    }
  }

  return finalOccupied;
}

function solve(inputString) {
  return variantDumb(inputString);
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
