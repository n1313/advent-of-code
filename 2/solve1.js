const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function parseLine(str) {
  const parts1 = str.split(' ');
  const parts2 = parts1[0].split('-');

  return {
    from: parseInt(parts2[0], 10),
    to: parseInt(parts2[1], 10),
    letter: parts1[1][0],
    password: parts1[2],
  };
}

function isValidPassword(value) {
  let count = 0;

  for (let i = 0; i < value.password.length; i++) {
    if (value.password[i] === value.letter) {
      count += 1;
    }
  }

  if (count < value.from || count > value.to) {
    console.log('invalid', value);
    return false;
  }

  return true;
}

function variantDumb(arr) {
  let valids = 0;

  const parsed = arr.filter(Boolean).map(parseLine);

  parsed.forEach((parsedValue) => {
    if (isValidPassword(parsedValue)) {
      valids += 1;
    }
  });

  return valids;
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
