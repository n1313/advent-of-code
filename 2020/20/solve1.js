const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  const tiles = {};
  inputString.split('\n\n').forEach((tile) => {
    const [idLine, ...rest] = tile.split('\n');
    const id = idLine.slice(5, -1);
    tiles[id] = rest;
  });
  return tiles;
}

function findEdges(tiles) {
  const edges = {};

  const addEdge = (edge, value) => {
    if (!edges[edge]) {
      edges[edge] = [];
    }
    edges[edge].push(value);
  };

  Object.entries(tiles).forEach(([id, tile]) => {
    const topEdge = tile[0];
    const bottomEdge = tile[tile.length - 1];
    const leftEdge = [];
    const rightEdge = [];
    tile.forEach((row) => {
      leftEdge.push(row[0]);
      rightEdge.push(row[row.length - 1]);
    });

    addEdge(topEdge, {
      tile: id,
      pos: 'top',
    });

    addEdge(bottomEdge, {
      tile: id,
      pos: 'bottom',
    });

    addEdge(leftEdge.join(''), {
      tile: id,
      pos: 'left',
    });

    addEdge(rightEdge.join(''), {
      tile: id,
      pos: 'right',
    });

    addEdge(topEdge.split('').reverse().join(''), {
      tile: id,
      pos: 'top',
      reversed: true,
    });

    addEdge(bottomEdge.split('').reverse().join(''), {
      tile: id,
      pos: 'bottom',
      reversed: true,
    });

    addEdge(leftEdge.reverse().join(''), {
      tile: id,
      pos: 'left',
      reversed: true,
    });

    addEdge(rightEdge.reverse().join(''), {
      tile: id,
      pos: 'right',
      reversed: true,
    });
  });

  const doubleEdges = {};

  Object.entries(edges).forEach(([id, edge]) => {
    if (edge.length > 1) {
      doubleEdges[id] = edge;
    }
  });

  return doubleEdges;
}

function solve(inputString) {
  const tiles = parse(inputString);
  const edges = findEdges(tiles);
  console.log('edges', edges);

  const tileConnections = {};

  Object.values(edges).forEach(([a, b]) => {
    tileConnections[a.tile] = tileConnections[a.tile] || {};
    tileConnections[a.tile][a.pos] = b.tile;
    tileConnections[b.tile] = tileConnections[b.tile] || {};
    tileConnections[b.tile][b.pos] = a.tile;
  });

  let result = 1;
  Object.entries(tileConnections).forEach(([tileId, connections]) => {
    if (Object.keys(connections).length === 2) {
      result *= parseInt(tileId, 10);
    }
  });

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
