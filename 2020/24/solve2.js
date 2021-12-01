const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function countChars(string, char) {
  return string.split(char).length - 1;
}

function startTiles(instructions) {
  const tiles = {};

  const simplifiedInstructions = instructions.map((instruction) => {
    let row = 0;
    let col = 0;
    const queue = instruction.split('');

    while (queue.length) {
      const dir = queue.shift();
      if (dir === 'e') {
        col += 2;
      } else if (dir === 'w') {
        col -= 2;
      } else if (dir === 'n') {
        row += 1;
        const next = queue.shift();
        if (next === 'w') {
          col -= 1;
        } else {
          col += 1;
        }
      } else if (dir === 's') {
        row -= 1;
        const next = queue.shift();
        if (next === 'w') {
          col -= 1;
        } else {
          col += 1;
        }
      }
    }

    return [row, col];
  });

  simplifiedInstructions.forEach((addr) => {
    const key = `${addr[0]} ${addr[1]}`;
    tiles[key] = tiles[key] || 'white'; // default
    tiles[key] = tiles[key] === 'white' ? 'black' : 'white'; // flip
  });

  return tiles;
}

function getNeighbors(tileKey) {
  const [row, col] = tileKey.split(' ').map((x) => parseInt(x, 10));

  const e = `${row} ${col + 2}`;
  const w = `${row} ${col - 2}`;
  const ne = `${row + 1} ${col + 1}`;
  const nw = `${row + 1} ${col - 1}`;
  const se = `${row - 1} ${col + 1}`;
  const sw = `${row - 1} ${col - 1}`;

  return [e, w, ne, nw, se, sw];
}

function day(tiles) {
  const tilesToCheck = {};

  Object.entries(tiles).forEach(([tileKey, color]) => {
    tilesToCheck[tileKey] = true;
    if (color === 'black') {
      getNeighbors(tileKey).forEach((t) => (tilesToCheck[t] = true));
    }
  });

  const nextTiles = {};

  Object.keys(tilesToCheck).forEach((tileKey) => {
    const neighbors = getNeighbors(tileKey);
    const color = tiles[tileKey] || 'white';
    const neighborColors = neighbors.map((tileKey) => tiles[tileKey] || 'white');
    const blackNeighbors = neighborColors.filter((color) => color === 'black').length;

    if (color === 'black' && (blackNeighbors === 0 || blackNeighbors > 2)) {
      nextTiles[tileKey] = 'white';
    } else if (color === 'white' && blackNeighbors === 2) {
      nextTiles[tileKey] = 'black';
    } else {
      nextTiles[tileKey] = color;
    }
  });

  return nextTiles;
}

function solve(inputString) {
  const instructions = inputString.split('\n');
  let tiles = startTiles(instructions);

  for (let d = 0; d < 100; d++) {
    tiles = day(tiles);
  }

  const result = Object.values(tiles).filter((tile) => tile === 'black').length;
  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
