const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function solve(lines) {
  let result = 0;
  for (let i = 0; i < lines.length - 1; i++) {
    if (parseInt(lines[i + 1]) > parseInt(lines[i])) {
      result += 1;
    }
  }

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
