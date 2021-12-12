const solve = require('../../utils/solve');

const START = 'start';
const END = 'end';

const solver1 = (lines) => {
  const nodes = {};
  lines.forEach((line) => {
    const [n1, n2] = line.split('-');
    if (!nodes[n1]) {
      nodes[n1] = {
        big: false,
        exits: [],
      };
    }
    if (!nodes[n2]) {
      nodes[n2] = {
        __big: false,
        exits: [],
      };
    }

    nodes[n1].exits.push(n2);
    if (n1.toLowerCase() !== n1) {
      nodes[n1].big = true;
    }
    nodes[n2].exits.push(n1);
    if (n2.toLowerCase() !== n2) {
      nodes[n2].big = true;
    }
  });

  const paths = [];
  const queue = [[START]];

  while (queue.length > 0) {
    const path = queue.shift();
    const lastNode = path[path.length - 1];
    if (lastNode === END) {
      paths.push(path);
      continue;
    }
    const { exits } = nodes[lastNode];
    exits.forEach((exit) => {
      if (nodes[exit].big || !path.includes(exit)) {
        queue.push([...path, exit]);
      }
    });
  }

  return paths.length;
};

const solver2 = (lines) => {
  const nodes = {};
  lines.forEach((line) => {
    const [n1, n2] = line.split('-');
    if (!nodes[n1]) {
      nodes[n1] = {
        big: false,
        exits: [],
      };
    }
    if (!nodes[n2]) {
      nodes[n2] = {
        __big: false,
        exits: [],
      };
    }

    nodes[n1].exits.push(n2);
    if (n1.toLowerCase() !== n1) {
      nodes[n1].big = true;
    }
    nodes[n2].exits.push(n1);
    if (n2.toLowerCase() !== n2) {
      nodes[n2].big = true;
    }
  });

  const paths = [];
  const queue = [[START]];

  while (queue.length > 0) {
    const path = queue.shift();
    const lastNode = path[path.length - 1];
    if (lastNode === END) {
      paths.push(path);
      continue;
    }
    const { exits } = nodes[lastNode];

    const visitedSmallCaves = {};
    path
      .filter((n) => !nodes[n].big)
      .forEach((n) => {
        visitedSmallCaves[n] = visitedSmallCaves[n] + 1 || 1;
      });

    const alreadyVisitedTheSameSmallCaveTwice = Boolean(Object.values(visitedSmallCaves).find((count) => count > 1));

    exits
      .filter((e) => e !== START)
      .forEach((exit) => {
        if (nodes[exit].big || !alreadyVisitedTheSameSmallCaveTwice || !path.includes(exit)) {
          queue.push([...path, exit]);
        }
      });
  }

  return paths.length;
};

const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const expectedResult1 = 10;
const expectedResult2 = 36;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
