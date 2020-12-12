const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const start = {
  x: 0,
  y: 0,
};
const waypoint = {
  x: 10,
  y: 1,
};

main(inputString);

function followInstructions(start, waypoint, instructions) {
  let ship = { ...start };
  let target = { ...waypoint };

  while (instructions.length) {
    const instruction = instructions.shift();

    // console.log('instruction', instruction);

    switch (instruction.action) {
      case 'N': {
        target.y += instruction.value;
        break;
      }
      case 'E': {
        target.x += instruction.value;
        break;
      }
      case 'S': {
        target.y -= instruction.value;
        break;
      }
      case 'W': {
        target.x -= instruction.value;
        break;
      }
      case 'L': {
        if (instruction.value === 90) {
          target = {
            x: -target.y,
            y: target.x,
          };
        } else if (instruction.value === 180) {
          target = {
            x: -target.x,
            y: -target.y,
          };
        } else if (instruction.value === 270) {
          target = {
            x: target.y,
            y: -target.x,
          };
        }
        break;
      }
      case 'R': {
        if (instruction.value === 90) {
          target = {
            x: target.y,
            y: -target.x,
          };
        } else if (instruction.value === 180) {
          target = {
            x: -target.x,
            y: -target.y,
          };
        } else if (instruction.value === 270) {
          target = {
            x: -target.y,
            y: target.x,
          };
        }
        break;
      }
      case 'F': {
        ship.x += instruction.value * target.x;
        ship.y += instruction.value * target.y;
        break;
      }
    }

    // console.log('target', target);
    // console.log('ship', ship);
  }

  return ship;
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

  const finalPosition = followInstructions(start, waypoint, instructions);

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
