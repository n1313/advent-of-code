const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function parseLine(str) {
  const parts1 = str.split(' ');
  const parts2 = parts1[0].split('-');

  return {
    pos1: parseInt(parts2[0], 10),
    pos2: parseInt(parts2[1], 10),
    letter: parts1[1][0],
    password: parts1[2],
  };
}

function isValidPassword(value) {
  const pos1valid = value.password[value.pos1 - 1] === value.letter;
  const pos2valid = value.password[value.pos2 - 1] === value.letter;

  if (pos1valid && pos2valid) {
    return false;
  } else if (!pos1valid && !pos2valid) {
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
