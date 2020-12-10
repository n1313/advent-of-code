const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const preambleSize = 25;

main(inputString);

function hasSum(sum, set) {
  let result = false;

  set.forEach((el) => {
    const missing = sum - el;
    if (!result && set.has(String(missing))) {
      result = true;
    }
  });

  return result;
}

function variantDumb(arr) {
  let input = [...arr];
  let found = true;
  let number = 0;

  while (found && input.length) {
    const preamble = input.slice(0, preambleSize);
    const set = new Set(preamble);
    number = input[preambleSize];

    if (hasSum(number, set)) {
      input = input.slice(1);
    } else {
      found = false;
    }
  }

  return number;
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
