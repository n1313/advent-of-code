module.exports = function flipArrayHorizontally(array) {
  return array.map((row) => row.split('').reverse().join(''));
};
