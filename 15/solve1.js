const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const max = 2021;

const memory = {};
let lastSpoken;

main(inputString);

function say(number, turn) {
  console.log('say', turn, number);
  const prev = memory[number] || {};
  memory[number] = {
    prevTurn: prev.lastTurn,
    lastTurn: turn,
    times: prev.times + 1 || 1,
  };
  lastSpoken = number;
}

function variantDumb(arr) {
  const parsed = arr[0].split(',');

  parsed.forEach((num, i) => say(parseInt(num, 10), i + 1));

  let turn = parsed.length + 1;

  while (turn < max) {
    const lastNumber = memory[lastSpoken];

    if (lastNumber.times === 1) {
      say(0, turn);
    } else if (lastNumber.times > 1) {
      const diff = lastNumber.lastTurn - lastNumber.prevTurn;
      say(diff, turn);
    }

    turn += 1;
  }

  return lastSpoken;
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
