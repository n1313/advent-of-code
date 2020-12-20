const rotateArrayRight = require('./rotateArrayRight');

const tests = [
  [rotateArrayRight(['1']), ['1']],
  [rotateArrayRight(['12345', '67890']), ['61', '72', '83', '94', '05']],
  [rotateArrayRight(['123', '456', '789']), ['741', '852', '963']],
];

tests.forEach(([actual, expected], i) => {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  if (passed) {
    console.log('Test', i, 'passed!');
  } else {
    console.log('Test', i, 'failed, expected', expected, 'got', actual);
  }
});
