const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function findPaths(sorted) {
  let paths = 0;

  let queue = [{ index: 0, path: [sorted[0]] }];

  while (queue.length) {
    const top = queue.pop();

    if (top.index === sorted.length - 1) {
      paths += 1;
    } else {
      const current = sorted[top.index];

      for (let nextIndex = top.index + 1; nextIndex <= top.index + 3; nextIndex++) {
        if (nextIndex < sorted.length) {
          const next = sorted[nextIndex];
          if (next - current <= 3) {
            queue.push({
              index: nextIndex,
              path: [...top.path, next],
            });
          }
        }
      }
    }
  }

  return paths;
}

function findIntervals(fixed) {
  const intervals = [];

  let interval = [];

  for (let i = 1; i < fixed.length; i++) {
    const curr = fixed[i];
    const prev = fixed[i - 1];
    const diff = curr - prev;

    if (diff === 3) {
      if (interval.length < 2) {
        // do nothing
      } else {
        interval.push(prev);
        intervals.push(interval);
      }
      interval = [];
    } else {
      interval.push(prev);
    }
  }

  if (interval.length) {
    intervals.push(interval);
  }

  return intervals;
}

function variantDumb(arr) {
  const sorted = arr.map((x) => parseInt(x, 10)).sort((a, z) => a - z);
  const fixed = [0, ...sorted, sorted[sorted.length - 1] + 3];

  const intervals = findIntervals(fixed);

  if (intervals.length === 0) {
    return 1;
  }

  const paths = intervals.map(findPaths).reduce((acc, value) => {
    return acc * value;
  }, 1);

  return paths;
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
