const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function solve(inputString) {
  const [cardPublicKey, doorPublicKey] = inputString.split('\n').map((x) => parseInt(x, 10));

  let cardLoopSize,
    doorLoopSize,
    l = 1;

  const divisor = 20201227;

  let value = 1;

  while (!cardLoopSize || !doorLoopSize) {
    value = (value * 7) % divisor;

    if (value === cardPublicKey) {
      cardLoopSize = l;
    }
    if (value === doorPublicKey) {
      doorLoopSize = l;
    }

    l += 1;
  }

  let doorEncryptionKey = 1;

  for (l = 0; l < cardLoopSize; l++) {
    doorEncryptionKey = (doorEncryptionKey * doorPublicKey) % divisor;
  }

  return doorEncryptionKey;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
