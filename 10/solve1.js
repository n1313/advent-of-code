const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function variantDumb(arr) {
  const sorted = arr.map((x) => parseInt(x, 10)).sort((a, z) => a - z);

  const differences = { 1: 0, 3: 1 };

  for (let i = 0; i < sorted.length; i++) {
    const prev = sorted[i - 1] || 0;
    const current = sorted[i];

    const diff = current - prev;

    differences[diff] += 1;
  }

  return differences['1'] * differences['3'];
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
