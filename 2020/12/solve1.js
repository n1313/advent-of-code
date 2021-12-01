const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const start = {
  x: 0,
  y: 0,
  facing: 0,
};

main(inputString);

function followInstructions(start, instructions) {
  let position = { ...start };

  while (instructions.length) {
    const instruction = instructions.shift();

    switch (instruction.action) {
      case 'N': {
        position.y += instruction.value;
        break;
      }
      case 'E': {
        position.x += instruction.value;
        break;
      }
      case 'S': {
        position.y -= instruction.value;
        break;
      }
      case 'W': {
        position.x -= instruction.value;
        break;
      }
      case 'L': {
        position.facing += instruction.value;
        break;
      }
      case 'R': {
        position.facing -= instruction.value;
        break;
      }
      case 'F': {
        const dirIndex = (position.facing / 90) % 4;
        const direction = { '-3': 'N', '-2': 'W', '-1': 'S', 0: 'E', 1: 'N', 2: 'W', 3: 'S' }[dirIndex];

        switch (direction) {
          case 'N': {
            position.y += instruction.value;
            break;
          }
          case 'E': {
            position.x += instruction.value;
            break;
          }
          case 'S': {
            position.y -= instruction.value;
            break;
          }
          case 'W': {
            position.x -= instruction.value;
            break;
          }
        }
        break;
      }
    }
  }

  return position;
}

function parseInstructions(lines) {
  const instructions = lines.map((line) => {
    return {
      action: line[0],
      value: parseInt(line.slice(1), 10),
    };
  });

  return instructions;
}

function variantDumb(arr) {
  const instructions = parseInstructions(arr);

  const finalPosition = followInstructions(start, instructions);

  console.log('finalPosition', finalPosition);

  return Math.abs(finalPosition.y) + Math.abs(finalPosition.x);
}

function solve(inputString) {
  return variantDumb(inputString);
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
