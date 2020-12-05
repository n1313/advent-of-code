const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const rows = { from: 0, to: 127 };
const cols = { from: 0, to: 7 };

const maxSeatId = 880;

main();

function getSeatId(row, col) {
  return row * 8 + col;
}

function getHalf(range, which) {
  const length = range.to - range.from + 1;
  const upperHalf = {
    from: range.from,
    to: range.from + length / 2 - 1,
  };
  const lowerHalf = {
    from: range.to - length / 2 + 1,
    to: range.to,
  };
  // console.log('getHalf', range, upperHalf, lowerHalf, which);
  if (which === 'F' || which === 'L') {
    return upperHalf;
  } else {
    return lowerHalf;
  }
}

function findPosition(letters, range) {
  // console.log('findPosition', letters, range);
  if (letters.length > 0) {
    const firstLetter = letters[0];
    const remainingLetters = letters.slice(1);
    const newRange = getHalf(range, firstLetter);
    return findPosition(remainingLetters, newRange);
  } else {
    // console.log('found', letters, range);
    return range.from;
  }
}

function convertPass(pass) {
  const row = findPosition(pass.rowLetters, rows);
  const col = findPosition(pass.colLetters, cols);
  const seatId = getSeatId(row, col);
  return {
    ...pass,
    row,
    col,
    seatId,
  };
}

function variantDumb(arr) {
  const passes = arr
    .map((letters, i) => {
      return {
        i,
        rowLetters: letters.slice(0, 7),
        colLetters: letters.slice(7),
      };
    })
    .map(convertPass);

  console.log('passes', passes);

  const allSeatIds = {};
  for (let i = 1; i <= 880; i++) {
    allSeatIds[i] = true;
  }

  passes.forEach((pass) => {
    delete allSeatIds[pass.seatId];
  });

  return allSeatIds;
}

function solve() {
  return variantDumb(inputString);
}

function main() {
  const start = new Date();
  let result = solve();
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
