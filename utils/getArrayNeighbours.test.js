const getArrayNeighbours = require('./getArrayNeighbours');

const tests = [
  [
    getArrayNeighbours(1, 1, 5, 5),
    [
      [1, 0],
      [2, 1],
      [1, 2],
      [0, 1],
    ],
  ],
  [
    getArrayNeighbours(0, 0, 5, 5),
    [
      [1, 0],
      [0, 1],
    ],
  ],
  [
    getArrayNeighbours(4, 0, 5, 5),
    [
      [4, 1],
      [3, 0],
    ],
  ],
  [
    getArrayNeighbours(4, 2, 5, 5),
    [
      [4, 1],
      [4, 3],
      [3, 2],
    ],
  ],
  [
    getArrayNeighbours(0, 2, 5, 5),
    [
      [0, 1],
      [1, 2],
      [0, 3],
    ],
  ],
  [getArrayNeighbours(10, 10, 5, 5), []],
];

tests.forEach(([actual, expected], i) => {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  if (passed) {
    console.log('Test', i, 'passed!');
  } else {
    console.log('Test', i, 'failed, expected', expected, 'got', actual);
  }
});
