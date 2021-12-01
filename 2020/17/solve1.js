const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

const turns = 6;

main(inputString);

// [z][y][x]

function parse(inputString) {
  return inputString.split('\n').map((line) => line.split(''));
}

function pumpGrid(startLayer) {
  const maxZ = 1 + 2 * turns;
  const maxY = startLayer.length + 2 * turns;
  const maxX = startLayer[0].length + 2 * turns;
  const pumpedGrid = [];
  for (let z = 0; z < maxZ; z++) {
    pumpedGrid[z] = [];
    for (let y = 0; y < maxY; y++) {
      pumpedGrid[z][y] = [];
      for (let x = 0; x < maxX; x++) {
        pumpedGrid[z][y][x] = '.';
      }
    }
  }
  startLayer.forEach((row, y) => {
    row.forEach((cube, x) => {
      pumpedGrid[turns][turns + y][turns + x] = cube;
    });
  });

  return pumpedGrid;
}

function getNeighbors(startZ, startY, startX, grid) {
  const neighbors = [];
  for (let z = startZ - 1; z <= startZ + 1; z++) {
    for (let y = startY - 1; y <= startY + 1; y++) {
      for (let x = startX - 1; x <= startX + 1; x++) {
        if (x !== startX || y !== startY || z !== startZ) {
          if (grid[z] && grid[z][y] && grid[z][y][x]) {
            neighbors.push(grid[z][y][x]);
          } else {
            neighbors.push('.');
          }
        }
      }
    }
  }
  return neighbors;
}

function oneTurn(grid) {
  const nextGrid = [];

  grid.forEach((layer, z) => {
    layer.forEach((row, y) => {
      row.forEach((cube, x) => {
        const neighbors = getNeighbors(z, y, x, grid);
        const actives = neighbors.filter((cube) => cube === '#').length;
        let next;

        // If a cube is active
        if (cube === '#') {
          // and exactly 2 or 3 of its neighbors are also active,
          if (actives === 2 || actives === 3) {
            // the cube remains active.
            next = '#';
            // Otherwise,
          } else {
            // the cube becomes inactive.
            next = '.';
          }
        }

        // If a cube is inactive
        if (cube === '.') {
          // but exactly 3 of its neighbors are active,
          if (actives === 3) {
            // the cube becomes active.
            next = '#';
            // Otherwise,
          } else {
            // the cube remains inactive.
            next = '.';
          }
        }

        nextGrid[z] = nextGrid[z] || [];
        nextGrid[z][y] = nextGrid[z][y] || [];
        nextGrid[z][y][x] = next;
      });
    });
  });

  return nextGrid;
}

function countActives(grid) {
  let actives = 0;

  grid.forEach((layer, z) => {
    layer.forEach((row, y) => {
      row.forEach((cube, x) => {
        if (cube === '#') {
          actives += 1;
        }
      });
    });
  });

  return actives;
}

function variantDumb(inputString) {
  const startLayer = parse(inputString);

  let result = pumpGrid(startLayer, turns);

  for (let turn = 0; turn < turns; turn++) {
    result = oneTurn(result);
  }

  return countActives(result);
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
