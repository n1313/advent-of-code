const fs = require('fs');

module.exports = function solve(solver, testString, expectedResult, inputFilename = process.argv[2], split = true) {
  if (!inputFilename) {
    throw new Error('You forgot input!');
  }

  const prepareInput = (string) => (split ? string.trim().split('\n') : string.trim());

  const actualInput = prepareInput(fs.readFileSync(inputFilename, 'utf-8'));
  const testInput = prepareInput(testString);

  const testResult = solver(testInput);
  if (testResult !== expectedResult) {
    throw new Error(`Unexpected result: ${testResult}`);
  }

  const start = new Date();
  const result = solver(actualInput);
  const end = new Date();

  console.log(result);
  console.log('Took', end - start, 'ms');
};
