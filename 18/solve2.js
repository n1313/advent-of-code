const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  return inputString.split('\n');
}

function solveEquation(equation) {
  const parensReg = /\(([0-9\*\+ ]+?)\)/;
  const additionReg = /\d+ \+ \d+/;

  let match;
  let simplified = equation;

  while ((match = simplified.match(parensReg))) {
    simplified = simplified.replace(match[0], solveEquation(match[1]));
  }

  if (simplified.indexOf('*') > -1) {
    while ((match = simplified.match(additionReg))) {
      simplified = simplified.replace(match[0], solveEquation(match[0]));
    }
  }

  const tokens = simplified.split(' ');
  let value = 0;
  let oper = null;
  while (tokens.length) {
    const token = tokens.shift();
    if (token === '+' || token === '*') {
      oper = token;
    } else {
      const num = parseInt(token, 10);
      if (oper === '+') {
        value += num;
      } else if (oper === '*') {
        value *= num;
      } else {
        value = num;
      }
    }
  }

  return value;
}

function solve(inputString) {
  const parsed = parse(inputString);
  const solved = parsed.map(solveEquation);
  console.log('solved', solved);
  const sum = solved.reduce((a, b) => (a += b), 0);

  return sum;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
