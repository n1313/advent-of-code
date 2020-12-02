const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function variantDumb(arr) {
  const sortedObj = {};
  const sortedArray = arr.map((x) => parseInt(x, 10)).sort((a, z) => a - z);
  sortedArray.forEach((x) => (sortedObj[x] = true));

  const result = sortedArray.find((x) => {
    const complement = 2020 - x;
    if (sortedObj[complement]) {
      return true;
    }
    return false;
  });

  return result * (2020 - result);
}

function solve() {
  return variantDumb(inputString);
}

function main() {
  const start = new Date();
  let result = solve();
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
