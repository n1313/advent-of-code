const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function solve(lines) {
  let horiz = 0;
  let depth = 0;

  lines.forEach((l) => {
    const [dir, val] = l.split(' ');
    const value = parseInt(val);
    switch (dir) {
      case 'forward': {
        horiz += value;
        break;
      }
      case 'up': {
        depth -= value;
        break;
      }
      case 'down': {
        depth += value;
        break;
      }
    }
  });

  return horiz * depth;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
