const solve = require('../../utils/solve');

const solver1 = (lines) => {
  const data = lines.map((l) => l.split(' | ').map((ll) => ll.split(' ')));

  let result = 0;

  data.forEach(([input, output]) => {
    output.forEach((x) => {
      if (x.length !== 5 && x.length !== 6) {
        result += 1;
      }
    });
  });

  return result;
};

const contains = (candidate, check) => {
  return check.split('').every((x) => candidate.includes(x));
};

const difference = (candidate, check) => {
  return candidate.split('').filter((x) => !check.includes(x)).length;
};

const solver2 = (lines) => {
  const data = lines.map((l) => l.split(' | ').map((ll) => ll.split(' ').map((lll) => lll.split('').sort().join(''))));

  let result = 0;

  data.forEach(([input, output]) => {
    const codes = [...input, ...output];
    const digits = {};

    digits[1] = codes.find((c) => c.length === 2);
    digits[4] = codes.find((c) => c.length === 4);
    digits[7] = codes.find((c) => c.length === 3);
    digits[8] = codes.find((c) => c.length === 7);

    const allFives = codes.filter((c) => c.length === 5);
    const allSixes = codes.filter((c) => c.length === 6);

    digits[6] = allSixes.find((c) => {
      return (
        (c.includes(digits[1][0]) && !c.includes(digits[1][1])) ||
        (c.includes(digits[1][1]) && !c.includes(digits[1][0]))
      );
    });

    allSixes.forEach((c) => {
      if (c !== digits[6]) {
        if (contains(c, digits[4])) {
          digits[9] = c;
        } else {
          digits[0] = c;
        }
      }
    });

    allFives.forEach((c) => {
      if (contains(c, digits[1])) {
        digits[3] = c;
      } else if (difference(c, digits[4]) === 2) {
        digits[5] = c;
      } else {
        digits[2] = c;
      }
    });

    const solved = {};
    Object.entries(digits).forEach(([k, v]) => (solved[v] = k));
    const value = parseInt(output.map((code) => solved[code]).join(''));

    result += value;
  });

  return result;
};

const testInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const expectedResult1 = 26;
const expectedResult2 = 61229;

solve(solver1, testInput, expectedResult1);
solve(solver2, testInput, expectedResult2);
