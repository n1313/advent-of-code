const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function getGroups(arr) {
  const groups = [];

  let group = [];

  arr.forEach((line) => {
    if (line) {
      group.push(line);
    } else {
      groups.push(group);
      group = [];
    }
  });

  return groups;
}

function getAnswers(group) {
  const answers = {};

  group.forEach((person) => {
    for (let i = 0; i < person.length; i++) {
      const char = person[i];
      // console.log('char', char);
      answers[char] = answers[char] ? answers[char] + 1 : 1;
    }
  });

  console.log('answers', answers);

  return Object.entries(answers).filter(([key, value]) => {
    return value === group.length;
  });
}

function variantDumb(arr) {
  const groups = getGroups(arr);

  const answers = groups.map(getAnswers);

  const result = answers.reduce((acc, answer) => acc + answer.length, 0);
  return result;
}

function solve() {
  return variantDumb(inputString);
}

function main() {
  const start = new Date();
  let result = solve();
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
