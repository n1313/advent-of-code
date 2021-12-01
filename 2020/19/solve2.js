const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

let rules = [];
let messages = [];

const arbitraryLevelLimiter = 5;

main(inputString);

function parse(inputString) {
  const [rawRules, rawMessages] = inputString.split('\n\n');
  rawRules.split('\n').forEach((rule) => {
    const [index, ruleText] = rule.split(': ');
    rules[index] = ruleText;
  });

  rules[8] = '42 | 42 8';
  rules[11] = '42 31 | 42 11 31';

  messages = rawMessages.split('\n');
}

function getRule(ruleIndex, level = 0) {
  if (level > arbitraryLevelLimiter) {
    return '';
  }

  const rule = rules[ruleIndex];
  if (rule === '"a"' || rule === '"b"') {
    return rule[1];
  }

  const recurse = rule
    .split(' ')
    .map((r) => {
      if (r === '|') {
        return ' or ';
      }

      const ruleVal = getRule(r, r === ruleIndex ? level + 1 : level);

      if (ruleVal === 'a' || ruleVal === 'b') {
        return ruleVal;
      } else {
        return `(${ruleVal})`;
      }
    })
    .join(' ');

  return recurse;
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
