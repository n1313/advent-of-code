const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function getAdjacentSeats(row, col, map) {
  const width = map[0].length;
  const height = map.length;

  // console.log('row, col', row, col);

  let top, topright, right, bottomright, bottom, bottomleft, left, topleft;

  let r, c;

  for (r = row - 1; r >= 0; r--) {
    if (map[r][col] !== '.') {
      top = map[r][col];
      break;
    }
  }

  r = row - 1;
  c = col + 1;
  while (map[r] && map[r][c]) {
    if (map[r][c] !== '.') {
      topright = map[r][c];
      break;
    }
    r -= 1;
    c += 1;
  }

  for (c = col + 1; c < width; c++) {
    if (map[row][c] !== '.') {
      right = map[row][c];
      break;
    }
  }

  r = row + 1;
  c = col + 1;
  while (map[r] && map[r][c]) {
    if (map[r][c] !== '.') {
      bottomright = map[r][c];
      break;
    }
    r += 1;
    c += 1;
  }

  for (r = row + 1; r < height; r++) {
    if (map[r][col] !== '.') {
      bottom = map[r][col];
      break;
    }
  }

  r = row + 1;
  c = col - 1;
  while (map[r] && map[r][c]) {
    if (map[r][c] !== '.') {
      bottomleft = map[r][c];
      break;
    }
    r += 1;
    c -= 1;
  }

  for (c = col - 1; c >= 0; c--) {
    if (map[row][c] !== '.') {
      left = map[row][c];
      break;
    }
  }

  r = row - 1;
  c = col - 1;
  while (map[r] && map[r][c]) {
    if (map[r][c] !== '.') {
      topleft = map[r][c];
      break;
    }
    r -= 1;
    c -= 1;
  }

  const adjacents = [top, topright, right, bottomright, bottom, bottomleft, left, topleft];

  // console.log('adjacents', row, col, map[row][col], adjacents);
  return adjacents.filter(Boolean);
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

  if (seat === '#' && occupiedAdjacents > 4) {
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

  while (!stable && step < 1000) {
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
