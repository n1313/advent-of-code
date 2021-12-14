const solve = require('../../utils/solve');

const solver = (lines, steps) => {
  let template = lines[0];
  let templatePairs = {};
  for (let c = 0; c < template.length - 1; c++) {
    const pair = `${template[c]}${template[c + 1]}`;
    templatePairs[pair] = templatePairs[pair] + 1 || 1;
  }

  const rulesMap = {};
  lines.slice(2).forEach((line) => {
    const id = `${line[0]}${line[1]}`;
    const p1 = `${line[0]}${line[6]}`;
    const p2 = `${line[6]}${line[1]}`;
    rulesMap[id] = [p1, p2];
  });

  for (let s = 0; s < steps; s++) {
    const next = {};
    Object.entries(templatePairs).forEach(([key, count]) => {
      const rule = rulesMap[key];
      if (rule) {
        next[rule[0]] = next[rule[0]] + count || count;
        next[rule[1]] = next[rule[1]] + count || count;
      }
    });
    templatePairs = next;
  }

  const letters = {};
  Object.entries(templatePairs).forEach(([pair, count]) => {
    letters[pair[0]] = letters[pair[0]] ? BigInt(letters[pair[0]]) + BigInt(count) : BigInt(count);
  });

  const lastLetter = template[template.length - 1];
  letters[lastLetter] = letters[lastLetter] + 1n;

  let min = BigInt(Number.MAX_SAFE_INTEGER);
  let max = 0n;
  Object.values(letters).forEach((v) => {
    if (min > v) {
      min = v;
    }
    if (max < v) {
      max = v;
    }
  });

  return max - min;
};

const solver1 = (lines) => {
  return solver(lines, 10);
};

const solver2 = (lines) => {
  return solver(lines, 40);
};

const testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const expectedResult1 = 1588n;
const expectedResult2 = 2188189693529n;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
