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

const parse = (lines) => {
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
  return [calls, boards];
};

const play = (calls, boards) => {
  let winner = 0;

  calls.forEach((x) => {
    boards.forEach((board) => {
      if (!board.winner && board.digits.has(x)) {
        let won = false;
        board.rows = board.rows.map((row) => {
          const newRow = row.filter((c) => c !== x);
          if (newRow.length === 0) {
            won = true;
          }
          return newRow;
        });

        if (!won) {
          board.cols = board.cols.map((col) => {
            const newCol = col.filter((c) => c !== x);
            if (newCol.length === 0) {
              won = true;
            }
            return newCol;
          });
        }

        if (won) {
          board.winner = ++winner;
          board.x = x;
          board.sum = [].concat(...board.rows).reduce((a, i) => (a += i), 0);
        }
      }
    });
  });

  return boards;
};

const solver1 = (lines) => {
  const [calls, boards] = parse(lines);
  const postPlayBoards = play(calls, boards);
  const first = postPlayBoards.find((b) => b.winner === 1);
  return first.sum * first.x;
};

const solver2 = (lines) => {
  const [calls, boards] = parse(lines);
  const postPlayBoards = play(calls, boards);
  const last = postPlayBoards.find((b) => b.winner === boards.length);
  return last.sum * last.x;
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
