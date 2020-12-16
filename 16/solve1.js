const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  // thanks @atarka!
  const [, rules, my, nearby] = inputString.match(
    /(.+?)\r?\n\r?\nyour ticket:\r?\n(.+?)\r?\n\r?\nnearby tickets:\r?\n(.+)/s
  );

  const result = {
    rules: {},
    my: my.split(','),
    nearby: nearby.split('\n').map((ticket) => ticket.split(',')),
  };

  rules.split('\n').forEach((line) => {
    const [fieldName, intervals] = line.split(': ');
    intervals.split(' or ').forEach((interval) => {
      const [from, to] = interval.split('-');
      // thanks again @atarka!
      for (let val = parseInt(from, 10); val <= parseInt(to, 10); val++) {
        result.rules[val] = result.rules[val] || [];
        result.rules[val].push(fieldName);
      }
    });
  });

  return result;
}

function findErrors(rules, tickets) {
  const errors = [];

  tickets.forEach((ticket) => {
    const error = ticket.find((value) => {
      return !Boolean(rules[value]);
    });
    if (error) {
      errors.push(error);
    }
  });

  return errors;
}

function variantDumb(inputString) {
  const parsed = parse(inputString);

  const errors = findErrors(parsed.rules, parsed.nearby);

  return errors.reduce((a, v) => (a += parseInt(v, 10)), 0);
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
