const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function parse(line, i) {
  let [operation, value] = line.split(' = ');
  let address;
  if (operation !== 'mask') {
    address = operation.slice(4, -1);
    operation = 'mem';
  }
  return {
    i,
    operation,
    address,
    value,
  };
}

function updateValue(value, mask) {
  let updated = [];
  const binaryValue = parseInt(value, 10).toString(2);
  const valueBits = binaryValue.split('').reverse();
  const maskBits = mask.split('').reverse();

  maskBits.forEach((maskBit, i) => {
    if (maskBit === 'X') {
      updated[i] = valueBits[i] || '0';
    } else if (maskBit === '0') {
      updated[i] = '0';
    } else if (maskBit === '1') {
      updated[i] = '1';
    }
  });

  // console.log('updated', updated);

  const binaryResult = updated.reverse().join('');

  // console.log(value, '=>', binaryValue, '=>', binaryResult, '=>', parseInt(binaryResult, 2));

  return parseInt(binaryResult, 2);
}

function variantDumb(arr) {
  const instructions = arr.map(parse);

  const memory = {};
  let mask;

  instructions.forEach((instruction) => {
    switch (instruction.operation) {
      case 'mask': {
        mask = instruction.value;
        break;
      }
      case 'mem': {
        const value = updateValue(instruction.value, mask);
        memory[instruction.address] = value;
        console.log('memory', memory);
        break;
      }
    }
  });

  console.log('memory', memory);

  const sum = Object.values(memory).reduce((acc, val) => (acc += val), 0);
  return sum;
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
