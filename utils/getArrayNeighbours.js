module.exports = function getArrayNeighbours(a, b, maxA, maxB) {
  return [
    [a, b - 1], // up
    [a + 1, b], // right
    [a, b + 1], // bottom
    [a - 1, b], // left
  ].filter(([_a, _b]) => {
    return _a >= 0 && _a < maxA && _b >= 0 && _b < maxB;
  });
};
