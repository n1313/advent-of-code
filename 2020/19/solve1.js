const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

let rules = [];
let messages = [];

main(inputString);

function parse(inputString) {
  const [rawRules, rawMessages] = inputString.split('\n\n');
  rawRules.split('\n').forEach((rule) => {
    const [index, ruleText] = rule.split(': ');
    rules[index] = ruleText;
  });
  messages = rawMessages.split('\n');
}

function getRule(ruleIndex) {
  const rule = rules[ruleIndex];

  if (rule === '"a"' || rule === '"b"') {
    return rule[1];
  }

  return rule
    .split(' ')
    .map((r) => {
      if (r === '|') {
        return ' or ';
      }

      const ruleVal = getRule(r);
      if (ruleVal === 'a' || ruleVal === 'b') {
        return ruleVal;
      } else {
        return `(${ruleVal})`;
      }
    })
    .join(' ');
}

function matchesRule(message, ruleIndex) {
  const ruleString = getRule(ruleIndex);
  const ruleReg = new RegExp(`^${ruleString.replace(/ or /g, '|').replace(/ /g, '')}$`);
  return message.match(ruleReg);
}

function solve(inputString) {
  parse(inputString);

  const result = messages.filter((message) => {
    return matchesRule(message, 0);
  }).length;

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
