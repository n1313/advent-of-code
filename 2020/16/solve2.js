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

function validate(rules, tickets) {
  const validTickets = tickets.filter((ticket) => ticket.every((pos) => Boolean(rules[pos])));
  return validTickets;
}

function findPositions(rules, tickets) {
  const positions = {};

  tickets.forEach((ticket) => {
    ticket.forEach((val, pos) => {
      const possibilities = rules[val];
      if (!positions[pos]) {
        positions[pos] = possibilities;
      } else {
        positions[pos] = positions[pos].filter((fieldName) => possibilities.includes(fieldName));
      }
    });
  });

  return positions;
}

function narrowDown(possiblePositions) {
  const finalPositions = {};
  const positionsCount = Object.keys(possiblePositions).length;

  while (Object.keys(finalPositions).length < positionsCount) {
    const [position, [fieldName]] = Object.entries(possiblePositions).find(([position, fields]) => fields.length === 1);

    finalPositions[parseInt(position, 10)] = fieldName;

    Object.entries(possiblePositions).forEach(([position, fields]) => {
      possiblePositions[position] = fields.filter((f) => f !== fieldName);
    });
  }

  return finalPositions;
}

function variantDumb(inputString) {
  const parsed = parse(inputString);

  parsed.nearby = validate(parsed.rules, parsed.nearby);

  const possiblePositions = findPositions(parsed.rules, [parsed.my, ...parsed.nearby]);

  const finalPositions = narrowDown(possiblePositions);

  const result = Object.entries(finalPositions)
    .filter(([position, fieldName]) => fieldName.startsWith('departure'))
    .map(([position, fieldName]) => {
      console.log('my', fieldName, 'is', parsed.my[position]);
      return parsed.my[position];
    })
    .reduce((a, val) => (a *= val), 1);

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
