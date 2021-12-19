const solve = require('../../utils/solve');

let id = 0;

const createNumber = (n, parent = null, level = 0) => {
  const number = {
    id: id++,
    level,
    parent,
  };
  if (Array.isArray(n)) {
    number.left = createNumber(n[0], number, level + 1);
    number.right = createNumber(n[1], number, level + 1);
  } else {
    number.value = n;
    number.isRegular = true;
  }
  return number;
};

const parse = (lines) => {
  return lines.map(JSON.parse).map((n) => createNumber(n));
};

const toArray = (number) => {
  if (number.isRegular) {
    return number.value;
  } else {
    return [toArray(number.left), toArray(number.right)];
  }
};

const debug = (number) => {
  const pad = ''.padStart(number.level, ' ');
  if (number.isRegular) {
    console.log(pad, '*', number.id, '=', number.value);
  }
  if (number.left) {
    console.log(pad, number.id, 'left =', number.left.id);
    debug(number.left);
  }
  if (number.right) {
    console.log(pad, number.id, 'right =', number.right.id);
    debug(number.right);
  }
};

const nest = (number, parent) => {
  number.parent = parent;
  number.level += 1;
  if (!number.isRegular) {
    number.left = nest(number.left, number);
    number.right = nest(number.right, number);
  }
  return number;
};

const add = (left, right) => {
  const number = {
    level: 0,
    parent: null,
    id: id++,
  };
  number.left = nest(left, number);
  number.right = nest(right, number);
  // console.log('a', JSON.stringify(toArray(number)));
  return number;
};

const findUp = (number, direction) => {
  // console.log('findUp', number.id, direction);
  const parent = number.parent;
  if (!parent) {
    return null;
  } else if (parent[direction] === number) {
    return findUp(parent, direction);
  } else if (!parent[direction].isRegular) {
    const oppositeDirection = direction === 'left' ? 'right' : 'left';
    return findDown(parent[direction], oppositeDirection);
  } else if (parent[direction].isRegular) {
    return parent;
  } else {
    throw new Error('wtf');
  }
};

const findDown = (number, direction) => {
  // console.log('findDown', number.id, direction);
  if (number[direction].isRegular) {
    return number;
  } else {
    return findDown(number[direction], direction);
  }
};

const explode = (number) => {
  if (number.isRegular) {
    return false;
  }
  if (number.level >= 4) {
    // console.log('  explode', number.id);
    const leftNode = findUp(number, 'left');
    if (leftNode) {
      if (leftNode.right.isRegular) {
        leftNode.right.value += number.left.value;
        // console.log('     left', leftNode.right.id, leftNode.left.value);
      } else {
        leftNode.left.value += number.left.value;
        // console.log('     left', leftNode.left.id, leftNode.left.value);
      }
    }
    const rightNode = findUp(number, 'right');
    if (rightNode) {
      if (rightNode.left.isRegular) {
        rightNode.left.value += number.right.value;
        // console.log('    right', rightNode.left.id, rightNode.left.value);
      } else {
        rightNode.right.value += number.right.value;
        // console.log('    right', rightNode.right.id, rightNode.right.value);
      }
    }
    number.value = 0;
    number.isRegular = true;
    delete number.left;
    delete number.right;
    return true;
  } else {
    return explode(number.left) || explode(number.right);
  }
};

const split = (number) => {
  if (number.isRegular) {
    if (number.value >= 10) {
      number.left = createNumber(Math.floor(number.value / 2), number, number.level + 1);
      number.right = createNumber(Math.ceil(number.value / 2), number, number.level + 1);
      delete number.isRegular;
      delete number.value;
      return true;
    }
    return false;
  } else {
    return split(number.left) || split(number.right);
  }
};

const reduce = (number) => {
  while (explode(number) || split(number)) {
    // ??!
    // console.log('r', JSON.stringify(toArray(number)));
  }

  return number;
};

const magnitude = (number) => {
  if (number.isRegular) {
    return number.value;
  } else {
    return 3 * magnitude(number.left) + 2 * magnitude(number.right);
  }
};

const solver1 = (lines) => {
  const numbers = parse(lines);

  let accumulator = numbers[0];

  for (let n = 1; n < numbers.length; n++) {
    const newNumber = add(accumulator, numbers[n]);
    reduce(newNumber);
    accumulator = newNumber;
  }

  return magnitude(accumulator);
};

const solver2 = (lines) => {
  let maxMag = 0;

  for (let n = 0; n < lines.length; n++) {
    for (let m = 0; m < lines.length; m++) {
      const n1 = createNumber(JSON.parse(lines[n]));
      const n2 = createNumber(JSON.parse(lines[m]));
      console.log('n, n1', n, JSON.stringify(toArray(n1)));
      console.log('n, n2', n, JSON.stringify(toArray(n2)));
      const newNumber = add(n1, n2);
      reduce(newNumber);
      console.log(JSON.stringify(toArray(newNumber)));
      const mag = magnitude(newNumber);
      console.log(n, '+', m, '=', mag);
      maxMag = Math.max(maxMag, mag);
    }
  }

  return maxMag;
};

const testInput1 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

const expectedResult1 = 4140;
const expectedResult2 = 3993;

solve(solver1, testInput1, expectedResult1);
solve(solver2, testInput1, expectedResult2);
