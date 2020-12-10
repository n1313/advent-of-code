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

function variantDumb(arr) {
  const parsed = arr.map(parseString);

  const map = {};
  parsed.forEach((color) => {
    map[color.color] = color.children.map((child) => child[1]);
  });

  // console.log('map', map);

  const reverseMap = {};
  parsed.forEach((color) => {
    color.children.forEach((child) => {
      reverseMap[child[1]] = reverseMap[child[1]] || {};
      reverseMap[child[1]][color.color] = true;
    });
  });

  // console.log('reverseMap', reverseMap);

  let results = {};

  let queue = ['shiny gold'];

  while (queue.length > 0) {
    const currentColor = queue.pop();
    // console.log('currentColor', currentColor);
    const allowedParents = reverseMap[currentColor];
    if (allowedParents) {
      const allowedParentsColors = Object.keys(allowedParents);
      allowedParentsColors.forEach((color) => {
        results[color] = true;
      });
      queue = queue.concat(allowedParentsColors);
    }
    // console.log('queue', queue);
  }

  console.log('results', results);

  return Object.keys(results).length;
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
