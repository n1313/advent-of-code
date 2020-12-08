const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function parse(line, i) {
  const [operation, value] = line.split(' ');
  return {
    i,
    operation,
    value: parseInt(value, 10),
  };
}

function variantDumb(arr) {
  const instructions = arr.map(parse);

  let pointer = 0;
  let acc = 0;
  const visited = {};

  while (Object.keys(visited).indexOf(String(pointer)) === -1) {
    const current = instructions[pointer];
    visited[pointer] = true;
    console.log('current', current);

    if (current.operation === 'nop') {
      pointer += 1;
      continue;
    }

    if (current.operation === 'acc') {
      acc += current.value;
      pointer += 1;
      continue;
    }

    if (current.operation === 'jmp') {
      pointer += current.value;
      continue;
    }
  }

  return acc;
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
