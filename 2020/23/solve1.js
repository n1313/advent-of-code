const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

const moves = 10;

main(inputString);

function parse(inputString) {
  return inputString.split('').map((x) => parseInt(x, 10));
}

function move(input) {
  const current = input.shift();
  const pickup = input.slice(0, 3);
  let result = [current, ...input.slice(3)];
  const min = Math.min(...result);
  const max = Math.max(...result);

  let found = false;
  let destination = current - 1;

  while (!found) {
    if (destination < min) {
      destination = max;
    }
    if (pickup.indexOf(destination) > -1) {
      destination -= 1;
    } else {
      found = true;

      const destinationIndex = result.indexOf(destination);
      result.splice(destinationIndex + 1, 0, ...pickup);
    }
  }

  result.shift();
  result.push(current);

  return result;
}

function solve(inputString) {
  let input = parse(inputString);

  for (let m = 1; m <= moves; m++) {
    input = move(input, m);
  }

  console.log('final', JSON.stringify(input));
  let result = input.concat(input);
  result = result.slice(result.indexOf(1) + 1, result.indexOf(1) + 9).join();

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
