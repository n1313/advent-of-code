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
  if (typeof number === 'object') {
    return [toArray(number.left), toArray(number.right)];
  } else {
    return number;
  }
};

const nest = (number, parent) => {
  number.parent = parent;
  number.level += 1;
  number.left = nest(number.left, number);
  number.right = nest(number.right, number);
  return number;
};

const add = (left, right) => {
  const number = {
    level: 0,
    parent: null,
  };
  number.left = nest(left, number);
  number.right = nest(right, number);
  return number;
};

const findUp = (number, direction) => {
  if (!number.parent) {
    return null;
  } else if (number.parent[direction].isRegular) {
    return number.parent;
  } else if (number.parent[direction] === number) {
    return findUp(number.parent, direction);
  } else {
    return findDown(number.parent, direction === 'left' ? 'right' : 'left');
  }
};

const findDown = (number, direction) => {
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
    console.log('explode', number);
    const leftNode = findUp(number, 'left');
    if (leftNode) {
      if (leftNode.level >= number.level) {
        leftNode.right += number.left;
      } else {
        leftNode.left += number.left;
      }
    }
    const rightNode = findUp(number, 'right');
    if (rightNode) {
      if (rightNode.level >= number.level) {
        rightNode.left += number.right;
      } else {
        rightNode.right += number.right;
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

const split = (number) => {};

const reduce = (number) => {
  while (explode(number)) {
    // ?!!
  }
  // while (split(number)) {
  //   // ???
  // }

  return number;
};

const solver1 = (lines) => {
  const numbers = parse(lines);

  let newNumber = numbers[0];

  console.log('', newNumber);

  reduce(newNumber);

  /*
  for (let n = 1; n < numbers.length; n++) {
    newNumber = add(newNumber, numbers[n]);
    console.log(debug(newNumber), '+', debug(numbers[n]), '=', debug(newNumber));
    newNumber = reduce(newNumber);
  }

  console.log('newNumber', newNumber);
  */
};

const solver2 = (lines) => {};

const testInput1 = `[[[[[9,8],1],2],3],4]`;
/*
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
*/

const expectedResult1 = 4140;
const expectedResult2 = 112;

solve(solver1, testInput1, expectedResult1);
// solve(solver2, testInput1, expectedResult2);
