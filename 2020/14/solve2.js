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

function decToBin(dec) {
  return parseInt(dec, 10).toString(2);
}

function leftPad(x, len) {
  let result = String(x);
  while (result.length < len) {
    result = '0' + result;
  }
  return result;
}

function getAddresses(address, mask) {
  const binaryAddress = leftPad(decToBin(address), mask.length);
  // console.log('\ngetAddresses', address, binaryAddress, mask);
  const addressBits = binaryAddress.split('').reverse();
  const maskBits = mask.split('').reverse();

  const floats = [];
  let index = -2;

  while (index !== -1) {
    index = mask.indexOf('X', index + 1);
    if (index > -1) {
      floats.push(index);
    }
  }

  const numberOfAddresses = 2 ** floats.length;

  let addresses = [];

  for (let i = 0; i < numberOfAddresses; i++) {
    addresses.push([...addressBits]);
  }

  // console.log('addresses', addresses);

  let m = 0;

  maskBits.forEach((maskBit, maskBitIndex) => {
    // console.log('maskBit, maskBitIndex', maskBit, maskBitIndex);
    if (maskBit === 'X') {
      addresses.forEach((address, addressIndex) => {
        const b = leftPad(decToBin(addressIndex), floats.length);
        addresses[addressIndex][maskBitIndex] = b[m];
        // console.log('setting address', addressIndex, 'at', maskBitIndex, 'to', b[m]);
      });
      // console.log('addresses', addresses);
      m += 1;
    } else if (maskBit === '0') {
      // unchanged
    } else if (maskBit === '1') {
      addresses.forEach((address, addressIndex) => {
        addresses[addressIndex][maskBitIndex] = '1';
      });
    }
  });

  const addressesDec = addresses.map((addr) => {
    return parseInt(addr.reverse().join(''), 2);
  });

  // console.log('>>> addressesDec', addressesDec);

  return addressesDec;
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
        const addresses = getAddresses(instruction.address, mask);
        addresses.forEach((address) => {
          memory[address] = parseInt(instruction.value, 10);
          // console.log('writing', parseInt(instruction.value, 10), 'to', address);
        });
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
