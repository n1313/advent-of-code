const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const max = 30000000;

main(inputString);

function variantLessDumb(arr) {
  const parsed = arr[0].split(',');

  const memory = new Array(max); // replacing this with an object slows everything down x1000 times

  parsed.forEach((num, i) => (memory[num] = i + 1));

  // first turn is always 0
  let lastSpoken = 0;

  for (let turn = parsed.length + 2; turn < max + 1; turn++) {
    const lastSpokenPreviousTurn = memory[lastSpoken];
    memory[lastSpoken] = turn - 1;
    lastSpoken = lastSpokenPreviousTurn ? turn - 1 - lastSpokenPreviousTurn : 0;
  }

  return lastSpoken;
}

function solve(inputString) {
  return variantLessDumb(inputString);
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
