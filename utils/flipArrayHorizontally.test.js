const flipArrayHorizontally = require('./flipArrayHorizontally');

const tests = [
  [flipArrayHorizontally(['1']), ['1']],
  [flipArrayHorizontally(['12345', '67890']), ['54321', '09876']],
  [flipArrayHorizontally(['123', '456', '789']), ['321', '654', '987']],
  [flipArrayHorizontally(['opq', 'vwx', 'CDE']), ['qpo', 'xwv', 'EDC']],
];

tests.forEach(([actual, expected], i) => {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  if (passed) {
    console.log('Test', i, 'passed!');
  } else {
    console.log('Test', i, 'failed, expected', expected, 'got', actual);
  }
});
