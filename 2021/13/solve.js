const solve = require('../../utils/solve');

const debugMap = (map) => {
  let maxX = 0;
  let maxY = 0;

  map.forEach((coords) => {
    const [x, y] = coords.split(',');
    maxX = Math.max(Number(x), maxX);
    maxY = Math.max(Number(y), maxY);
  });

  let result = '';

  for (let y = 0; y <= maxY; y++) {
    let row = '';
    for (let x = 0; x <= maxX; x++) {
      row += map.indexOf(`${x},${y}`) > -1 ? '#' : '.';
    }
    result += `${row}\n`;
  }

  return result;
};

const fold = (map, instruction) => {
  const result = {};

  const foldDirection = instruction[0];
  const foldCoordinate = Number(instruction[1]);

  map.forEach((coords) => {
    const [x, y] = coords.split(',').map(Number);
    if (foldDirection === 'x' && x > foldCoordinate) {
      const newCoords = [2 * foldCoordinate - x, y];
      result[newCoords.join(',')] = true;
    } else if (foldDirection === 'y' && y > foldCoordinate) {
      const newCoords = [x, 2 * foldCoordinate - y];
      result[newCoords.join(',')] = true;
    } else {
      result[coords] = true;
    }
  });

  return Object.keys(result);
};

const parse = (lines) => {
  const map = [];
  const instructions = [];
  lines.forEach((line) => {
    if (line.indexOf(',') > 0) {
      map.push(line);
    } else if (line.indexOf('along') > 0) {
      instructions.push(line.slice(11).split('='));
    }
  });
  return [map, instructions];
};

const solver1 = (lines) => {
  const [map, instructions] = parse(lines);

  const result = fold(map, instructions[0]);

  return result.length;
};

const solver2 = (lines) => {
  const [map, instructions] = parse(lines);

  let result = map;
  instructions.forEach((instruction) => {
    result = fold(result, instruction);
  });

  return debugMap(result);
};

const testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const expectedResult1 = 17;
const expectedResult2 = `#####
#...#
#...#
#...#
#####
`;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
