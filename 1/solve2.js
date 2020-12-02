const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function variantDumb(arr) {
  const sortedObj = {};
  const sortedArray = arr.map((x) => parseInt(x, 10)).sort((a, z) => a - z);
  sortedArray.forEach((x) => (sortedObj[x] = true));

  let result1, result2, result3;

  let pointer1 = 0;
  let pointer2 = 1;

  const maxPointer1 = sortedArray.length - 3;

  while (!result3 && pointer1 < maxPointer1) {
    console.log(pointer1, pointer2);

    result1 = sortedArray[pointer1];
    result2 = sortedArray[pointer2];
    const complement = 2020 - result1 - result2;

    if (sortedObj[complement]) {
      result3 = complement;
      break;
    }

    if (pointer2 === sortedArray.length - 1) {
      pointer1 += 1;
      pointer2 = pointer1 + 1;
    } else {
      pointer2 += 1;
    }
  }

  console.log('Found', result1, result2, result3);

  return result1 * result2 * result3;
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
