const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function parseString(str) {
  const reg1 = /^(.+) bags contain (.+).$/;
  const match = str.match(reg1);
  const color = match[1];
  const children = match[2];

  if (children === 'no other bags') {
    return {
      color,
      children: [],
    };
  }

  const allowedColors = children.split(',').map((substr) => {
    const reg2 = /([0-9]+) (.+?) bag/;
    return substr.match(reg2).slice(1);
  });

  return {
    color,
    children: allowedColors,
  };
}

function dive(map, color) {
  const children = map[color];

  console.log('children of', color, children);

  if (!children.length) {
    console.log('each', color, 'bag is', 1, 'bag');
    return 1;
  }

  let result = 1;
  children.forEach((child) => {
    const [childAmount, childColor] = child;
    // console.log('childColor', childColor);
    const amount = childAmount * dive(map, childColor);
    result += amount;
  });
  console.log('each', color, 'bag is', result, 'bags');

  return result;
}

function variantDumb(arr) {
  const parsed = arr.map(parseString);

  const map = {};
  parsed.forEach((color) => {
    map[color.color] = color.children;
  });

  let result = dive(map, 'shiny gold') - 1;

  return result;
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
