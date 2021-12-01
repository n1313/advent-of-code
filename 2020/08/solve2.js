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

function mutate(originalInstructions, mutatePastThisRow) {
  // console.log('originalInstructions', originalInstructions);
  const mutated = JSON.parse(JSON.stringify(originalInstructions));
  let i;
  for (i = mutatePastThisRow + 1; i < originalInstructions.length; i++) {
    if (mutated[i].operation === 'nop') {
      mutated[i].operation = 'jmp';
      mutated[i].mutated = true;
      break;
    } else if (mutated[i].operation === 'jmp') {
      mutated[i].operation = 'nop';
      mutated[i].mutated = true;
      break;
    }
  }
  // console.log('i', i);
  // console.log('mutated', mutated);
  return [mutated, i];
}

function variantDumb(arr) {
  const originalInstructions = arr.map(parse);

  let mutatedRow = -1;
  let mutatedInstructions = originalInstructions;

  let found = false;

  let acc = 0;

  while (!found) {
    if (mutatedRow >= mutatedInstructions.length) {
      console.log('wtf');
      return null;
    }

    console.log('Trying mutation', mutatedRow);
    console.log('mutatedInstructions', mutatedInstructions);

    acc = 0;
    let faulty = 0;
    let pointer = 0;
    const visited = {};

    while (Object.keys(visited).indexOf(String(pointer)) === -1 && !faulty && !found) {
      const current = mutatedInstructions[pointer];

      visited[pointer] = true;

      if (pointer === originalInstructions.length) {
        console.log('Yes!');
        found = true;
        break;
      }

      if (!current) {
        faulty = true;
        console.log('Fault');
        break;
      }

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

    if (!found) {
      console.log('No!');
      [mutatedInstructions, mutatedRow] = mutate(originalInstructions, mutatedRow);
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
