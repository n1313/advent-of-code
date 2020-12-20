const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

const rotateArrayRight = require('../utils/rotateArrayRight');
const flipArrayHorizontally = require('../utils/flipArrayHorizontally');

main(inputString);

function reverseString(str) {
  return str.split('').reverse().join('');
}

// top right bottom left

function parse(inputString) {
  const tiles = {};
  inputString.split('\n\n').forEach((tile) => {
    const [idLine, ...rest] = tile.split('\n');
    const id = idLine.slice(5, -1);

    tiles[id] = { id, tile: rest };
  });
  return tiles;
}

function getEdges(tile) {
  const topEdge = tile[0];
  const bottomEdge = tile[tile.length - 1];
  const leftEdge = [];
  const rightEdge = [];
  tile.forEach((row) => {
    leftEdge.push(row[0]);
    rightEdge.push(row[row.length - 1]);
  });
  return [topEdge, rightEdge.join(''), bottomEdge, leftEdge.join('')];
}

function getEdgesMap(tiles) {
  const edgesMap = {};

  Object.values(tiles).forEach((tile) => {
    const edges = getEdges(tile.tile);
    edges.forEach((edge) => {
      edgesMap[edge] = edgesMap[edge] || [];
      edgesMap[edge].push(tile.id);
    });

    const edgesReversed = edges.map(reverseString);
    edgesReversed.forEach((edge) => {
      edgesMap[edge] = edgesMap[edge] || [];
      edgesMap[edge].push(tile.id);
    });
  });

  return edgesMap;
}

function getConnectionsMap(tiles, edgesMap) {
  const connectionsMap = {};

  Object.values(tiles).forEach((tile) => {
    connectionsMap[tile.id] = connectionsMap[tile.id] || [];
    const edges = getEdges(tile.tile);
    edges.forEach((edge, edgePosition) => {
      const connectedTiles = edgesMap[edge];
      if (connectedTiles.length > 1) {
        const otherTileId = connectedTiles.filter((tileId) => tileId !== tile.id)[0];
        connectionsMap[tile.id][edgePosition] = otherTileId;
      }
    });
  });

  return connectionsMap;
}

function fixTile(tile1, tile2, tile1direction) {
  const tile2direction = (tile1direction + 2) % 4;
  const tile1edges = getEdges(tile1.tile);
  const edge1 = tile1edges[tile1direction];

  for (let attempt = 0; attempt < 8; attempt++) {
    const tile2edges = getEdges(tile2.tile);
    const edge2 = tile2edges[tile2direction];
    if (edge1 === edge2) {
      return tile2;
    } else if (attempt === 3) {
      tile2.tile = flipArrayHorizontally(tile2.tile);
    } else {
      tile2.tile = rotateArrayRight(tile2.tile);
    }
  }
}

function removeEdges(tile) {
  const withoutEdges = [];
  for (let i = 1; i < tile.length - 1; i++) {
    withoutEdges.push(tile[i].slice(1, -1));
  }
  return withoutEdges;
}

function glueTogether(tiles, edgesMap, connectionsMap) {
  const tileIds = Object.keys(tiles);
  const tilesCount = tileIds.length;
  const pictureSizeInTiles = Math.sqrt(tilesCount);

  const topLeftCornerId = Object.entries(connectionsMap).find(([id, c]) => {
    return !c[0] && c[1] && c[2] && !c[3];
  })[0];

  const grid = [];
  const picture = [];

  for (let row = 0; row < pictureSizeInTiles; row++) {
    grid[row] = [];
    picture[row] = [];

    for (let col = 0; col < pictureSizeInTiles; col++) {
      if (!row && !col) {
        grid[row][col] = tiles[topLeftCornerId];
        picture[row][col] = removeEdges(tiles[topLeftCornerId].tile);
        continue;
      }

      const neighborTile = col === 0 ? grid[row - 1][0] : grid[row][col - 1];
      const connectionDirection = col === 0 ? 2 : 1;

      const neighborEdge = getEdges(neighborTile.tile)[connectionDirection];
      const newTileId = edgesMap[neighborEdge].filter((tileId) => tileId !== neighborTile.id);
      const newTile = tiles[newTileId];

      const fixedTile = fixTile(neighborTile, newTile, connectionDirection);

      grid[row][col] = fixedTile;
      picture[row][col] = removeEdges(fixedTile.tile);
    }
  }

  const gluedTogether = [];
  for (let row = 0; row < picture.length; row++) {
    for (let cell = 0; cell < picture[row].length; cell++) {
      for (let line = 0; line < picture[row][cell].length; line++) {
        const lineNo = row * picture[row][cell].length + line;
        gluedTogether[lineNo] = gluedTogether[lineNo] || '';
        gluedTogether[lineNo] += picture[row][cell][line];
      }
    }
  }

  return gluedTogether;
}

function findMonsters(gluedTogether) {
  const monster = ['                  # ', '#    ##    ##    ###', ' #  #  #  #  #  #   '];
  const monsterWidth = monster[0].length;
  const monsterHeight = monster.length;

  let monsters = 0;

  for (let row = 0; row < gluedTogether.length; row++) {
    for (let col = 0; col < gluedTogether[0].length; col++) {
      let validParts = 0;
      for (let mrow = 0; mrow < monsterHeight; mrow++) {
        for (let mcol = 0; mcol < monsterWidth; mcol++) {
          if (
            monster[mrow][mcol] === '#' &&
            gluedTogether[row + mrow] &&
            gluedTogether[row + mrow][col + mcol] &&
            gluedTogether[row + mrow][col + mcol] === '#'
          ) {
            validParts += 1;
          }
        }
      }
      if (validParts === 15) {
        monsters += 1;
      }
    }
  }

  return monsters;
}

function solve(inputString) {
  const tiles = parse(inputString);
  const edgesMap = getEdgesMap(tiles);
  const connectionsMap = getConnectionsMap(tiles, edgesMap);

  let gluedTogether = glueTogether(tiles, edgesMap, connectionsMap);

  let monsters = 0;

  for (let attempt = 0; attempt < 8; attempt++) {
    monsters = findMonsters(gluedTogether);
    if (monsters > 0) {
      console.log('Found', monsters, 'monsters');
      return gluedTogether.map((row) => row.split('#').length - 1).reduce((a, b) => a + b, 0) - monsters * 15;
    } else if (attempt === 3) {
      gluedTogether = flipArrayHorizontally(gluedTogether);
    } else {
      gluedTogether = rotateArrayRight(gluedTogether);
    }
  }
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
