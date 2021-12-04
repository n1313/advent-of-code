const solve = require('../../utils/solve');
const rotateArrayRight = require('../../utils/rotateArrayRight');

const lineToCells = (line) => {
  return [0, 1, 2, 3, 4].map((i) => parseInt(line.slice(i * 3, i * 3 + 2), 10));
};

const createBoard = (rows) => {
  const cols = rotateArrayRight(rows);
  const digits = new Set([].concat(...rows));
  return {
    digits,
    rows,
    cols,
  };
};

const solver1 = (lines) => {
  const calls = lines[0].split(',').map(Number);

  const boards = [];
  for (let i = 2; i < lines.length - 4; i += 6) {
    const board = createBoard([
      lineToCells(lines[i]),
      lineToCells(lines[i + 1]),
      lineToCells(lines[i + 2]),
      lineToCells(lines[i + 3]),
      lineToCells(lines[i + 4]),
    ]);
    boards.push(board);
  }

  let found = false;
  let x;
  let b;

  while (!found && calls.length) {
    x = calls.shift();

    b = 0;

    while (!found && b < boards.length) {
      const board = boards[b];

      if (board.digits.has(x)) {
        board.rows = board.rows.map((row) => {
          const newRow = row.filter((c) => c !== x);
          if (newRow.length === 0) {
            found = true;
          }
          return newRow;
        });

        board.cols = board.cols.map((col) => {
          const newCol = col.filter((c) => c !== x);
          if (newCol.length === 0) {
            found = true;
          }
          return newCol;
        });
      }
      b += 1;
    }
  }

  const winner = boards[b - 1];
  const sum = [].concat(...winner.rows).reduce((a, x) => (a += x), 0);

  return sum * x;
};

const solver2 = (lines) => {
  const calls = lines[0].split(',').map(Number);

  const boards = [];
  for (let i = 2; i < lines.length - 4; i += 6) {
    const board = createBoard([
      lineToCells(lines[i]),
      lineToCells(lines[i + 1]),
      lineToCells(lines[i + 2]),
      lineToCells(lines[i + 3]),
      lineToCells(lines[i + 4]),
    ]);
    boards.push(board);
  }

  let found = false;
  let x;
  let b;

  while (!found && calls.length > 0) {
    x = calls.shift();

    b = 0;

    let stop = false;

    while (!found && b < boards.length) {
      const board = boards[b];

      if (board) {
        if (board.digits.has(x)) {
          board.rows = board.rows.map((row) => {
            const newRow = row.filter((c) => c !== x);
            if (newRow.length === 0) {
              stop = true;
            }
            return newRow;
          });

          board.cols = board.cols.map((col) => {
            const newCol = col.filter((c) => c !== x);
            if (newCol.length === 0) {
              stop = true;
            }
            return newCol;
          });
        }

        if (stop) {
          const validBoards = boards.filter(Boolean);
          if (validBoards.length === 1) {
            found = true;
          } else {
            boards[b] = null;
            stop = false;
          }
        }
      }

      b += 1;
    }
  }

  const winner = boards[b - 1];
  const sum = [].concat(...winner.rows).reduce((a, x) => (a += x), 0);

  return sum * x;
};

const testInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const expectedResult1 = 4512;
const expectedResult2 = 1924;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
