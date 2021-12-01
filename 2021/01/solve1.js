const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function solve(lines) {
  let result = 0;
  let prev = parseInt(lines[0]);

  for (let i = 1; i < lines.length; i++) {
    const line = parseInt(lines[i]);
    if (line > prev) {
      result += 1;
    }
    prev = line;
  }

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
