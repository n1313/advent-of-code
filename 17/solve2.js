const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

const turns = 6;

main(inputString);

// [w][z][y][x]

function parse(inputString) {
  return inputString.split('\n').map((line) => line.split(''));
}

function pumpGrid(startLayer) {
  const maxW = 1 + 2 * turns;
  const maxZ = 1 + 2 * turns;
  const maxY = startLayer.length + 2 * turns;
  const maxX = startLayer[0].length + 2 * turns;
  const pumpedGrid = [];
  for (let w = 0; w < maxW; w++) {
    pumpedGrid[w] = [];
    for (let z = 0; z < maxZ; z++) {
      pumpedGrid[w][z] = [];
      for (let y = 0; y < maxY; y++) {
        pumpedGrid[w][z][y] = [];
        for (let x = 0; x < maxX; x++) {
          pumpedGrid[w][z][y][x] = '.';
        }
      }
    }
  }
  startLayer.forEach((row, y) => {
    row.forEach((cube, x) => {
      pumpedGrid[turns][turns][turns + y][turns + x] = cube;
    });
  });

  return pumpedGrid;
}

function getActiveNeighbors(startW, startZ, startY, startX, hyper) {
  let actives = 0;

  for (let w = startW - 1; w <= startW + 1; w++) {
    for (let z = startZ - 1; z <= startZ + 1; z++) {
      for (let y = startY - 1; y <= startY + 1; y++) {
        for (let x = startX - 1; x <= startX + 1; x++) {
          if (w !== startW || z !== startZ || y !== startY || x !== startX) {
            if (hyper[w] && hyper[w][z] && hyper[w][z][y] && hyper[w][z][y][x] && hyper[w][z][y][x] === '#') {
              actives += 1;
            }
          }
        }
      }
    }
  }

  return actives;
}

function oneTurn(hyper) {
  const nextGrid = [];

  hyper.forEach((grid, w) => {
    grid.forEach((layer, z) => {
      layer.forEach((row, y) => {
        row.forEach((cube, x) => {
          const actives = getActiveNeighbors(w, z, y, x, hyper);
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

          nextGrid[w] = nextGrid[w] || [];
          nextGrid[w][z] = nextGrid[w][z] || [];
          nextGrid[w][z][y] = nextGrid[w][z][y] || [];
          nextGrid[w][z][y][x] = next;
        });
      });
    });
  });

  return nextGrid;
}

function countActives(hyper) {
  let actives = 0;

  hyper.forEach((grid, w) => {
    grid.forEach((layer, z) => {
      layer.forEach((row, y) => {
        row.forEach((cube, x) => {
          if (cube === '#') {
            actives += 1;
          }
        });
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
