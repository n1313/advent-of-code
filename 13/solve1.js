const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function variantDumb(arr) {
  const earliest = parseInt(arr[0], 10);
  const buses = arr[1]
    .split(',')
    .filter((x) => {
      return x !== 'x';
    })
    .map((x) => parseInt(x, 10));

  const deltas = buses.map((bus) => {
    const closestDeparture = Math.ceil(earliest / bus) * bus;
    const delta = closestDeparture - earliest;
    return {
      bus,
      departure: closestDeparture,
      delta,
    };
  });

  console.log('deltas', deltas);
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
