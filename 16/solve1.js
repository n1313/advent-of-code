const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function parse(arr) {
  const result = {
    rules: [],
    my: [],
    nearby: [],
  };

  let section = 0;

  arr.forEach((line) => {
    if (!line) {
      return;
    }

    if (line === 'your ticket:' || line === 'nearby tickets:') {
      section += 1;
      return;
    }

    if (section === 0) {
      const [rule, values] = line.split(': ');
      const intervals = values.split(' or ');
      intervals.forEach((interval) => {
        const [from, to] = interval.split('-');
        result.rules.push([parseInt(from, 10), parseInt(to, 10)]);
      });
    } else {
      const commas = line.split(',').map((x) => parseInt(x, 10));
      if (section === 1) {
        result.my = commas;
      } else {
        result.nearby.push(commas);
      }
    }
  });

  return result;
}

function findErrors(rules, tickets) {
  const errors = [];

  tickets.forEach((fields) => {
    fields.forEach((field) => {
      let failures = 0;
      rules.forEach(([from, to]) => {
        if (field > to || field < from) {
          failures += 1;
        }
      });
      if (failures === rules.length) {
        errors.push(field);
        console.log('invalid', fields[0], fields[1]);
      }
    });
  });

  return errors;
}

function variantDumb(arr) {
  const parsed = parse(arr);

  const errors = findErrors(parsed.rules, parsed.nearby);

  return errors.reduce((a, b) => (a += b), 0);
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
