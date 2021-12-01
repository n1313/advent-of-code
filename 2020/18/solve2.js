const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  return inputString.split('\n');
}

function add(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}

function multiply(a, b) {
  return parseInt(a, 10) * parseInt(b, 10);
}

function solveEquation(equation) {
  const parensReg = /\(([0-9\*\+ ]+?)\)/;
  const additionReg = /(\d+) \+ (\d+)/;
  const multiplicationReg = /(\d+) \* (\d+)/;

  let match;
  let simplified = equation;

  while ((match = simplified.match(parensReg))) {
    simplified = simplified.replace(match[0], solveEquation(match[1]));
  }

  while ((match = simplified.match(additionReg))) {
    simplified = simplified.replace(match[0], add(match[1], match[2]));
  }

  while ((match = simplified.match(multiplicationReg))) {
    simplified = simplified.replace(match[0], multiply(match[1], match[2]));
  }

  return parseInt(simplified, 10);
}

function solve(inputString) {
  const parsed = parse(inputString);
  const solved = parsed.map(solveEquation);
  const sum = solved.reduce((a, b) => (a += b), 0);

  return sum;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
