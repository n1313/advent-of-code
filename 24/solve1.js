const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function countChars(string, char) {
  return string.split(char).length - 1;
}

function solve(inputString) {
  const tiles = {};
  const instructions = inputString.split('\n');

  const simplifiedInstructions = instructions.map((instruction) => {
    let row = 0;
    let col = 0;
    const queue = instruction.split('');

    while (queue.length) {
      const dir = queue.shift();
      if (dir === 'e') {
        col += 2;
      } else if (dir === 'w') {
        col -= 2;
      } else if (dir === 'n') {
        row += 1;
        const next = queue.shift();
        if (next === 'w') {
          col -= 1;
        } else {
          col += 1;
        }
      } else if (dir === 's') {
        row -= 1;
        const next = queue.shift();
        if (next === 'w') {
          col -= 1;
        } else {
          col += 1;
        }
      }
    }

    return [row, col];
  });

  simplifiedInstructions.forEach((addr) => {
    const key = `${addr[0]} ${addr[1]}`;
    tiles[key] = tiles[key] || 'white'; // default
    tiles[key] = tiles[key] === 'white' ? 'black' : 'white'; // flip
  });

  const result = Object.values(tiles).filter((tile) => tile === 'black').length;

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
