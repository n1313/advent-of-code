const solve = require('../../utils/solve');

const REG = /\(\)|\[\]|\<\>|\{\}/g;

const simplify = (string) => {
  let next = string;
  while (true) {
    const tmp = next.replace(REG, '');
    if (tmp === next) {
      break;
    } else {
      next = tmp;
    }
  }
  return next;
};

const solver1 = (lines) => {
  const SCORE = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  let result = 0;

  lines.forEach((line) => {
    const simplified = simplify(line);
    const corruptedMatch = /\)|\]|\}|\>/.exec(simplified);
    if (corruptedMatch) {
      const char = corruptedMatch[0];
      result += SCORE[char];
    }
  });

  return result;
};

const solver2 = (lines) => {
  const SCORE = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };

  const incomplete = [];

  lines.forEach((line) => {
    const simplified = simplify(line);
    const corruptedMatch = /\)|\]|\}|\>/.exec(simplified);
    if (!corruptedMatch) {
      incomplete.push(simplified);
    }
  });

  const scores = [];

  incomplete.forEach((simplified) => {
    const chars = simplified.split('');
    let score = 0;
    while (chars.length) {
      const c = chars.pop();
      score = score * 5 + SCORE[c];
    }
    scores.push(score);
  });

  const result = scores.sort((a, z) => a - z)[(scores.length - 1) / 2];

  return result;
};

const testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

const expectedResult1 = 26397;
const expectedResult2 = 288957;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
