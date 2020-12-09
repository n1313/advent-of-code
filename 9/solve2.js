const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const target = 32321523;
// const target = 127;

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
  let found = false;

  let pointer = 0;
  let sum = 0;
  let frame = [];

  while (!found && pointer < arr.length) {
    if (sum === target) {
      found = true;
    } else if (sum < target) {
      pointer += 1;
      const current = parseInt(arr[pointer], 10);
      frame.push(current);
      sum += current;
    } else {
      const first = frame.shift();
      sum -= first;
    }
  }

  console.log('found frame', frame);

  let smallest = Infinity;
  let largest = -Infinity;

  frame.forEach((i) => {
    if (i < smallest) {
      smallest = i;
    }
    if (i > largest) {
      largest = i;
    }
  });

  return smallest + largest;
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
