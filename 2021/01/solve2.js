const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function solve(lines) {
  let result = 0;
  let prev1 = parseInt(lines[0]);
  let prev2 = parseInt(lines[1]);
  let prev3 = parseInt(lines[2]);

  for (let i = 1; i < lines.length - 2; i++) {
    const line1 = parseInt(lines[i]);
    const line2 = parseInt(lines[i + 1]);
    const line3 = parseInt(lines[i + 2]);
    if (line1 + line2 + line3 > prev1 + prev2 + prev3) {
      result += 1;
    }
    prev1 = line1;
    prev2 = line2;
    prev3 = line3;
  }

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
