module.exports = function getArrayNeighbours(a, b, maxA, maxB, diagonal = false) {
  return [
    [a, b - 1], // up
    [a + 1, b], // right
    [a, b + 1], // bottom
    [a - 1, b], // left
    diagonal && [a - 1, b - 1], // up-left
    diagonal && [a + 1, b - 1], // up-right
    diagonal && [a - 1, b + 1], // bottom-left
    diagonal && [a + 1, b + 1], // bottom-right
  ]
    .filter(Boolean)
    .filter(([_a, _b]) => {
      return _a >= 0 && _a < maxA && _b >= 0 && _b < maxB;
    });
};
