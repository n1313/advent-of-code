module.exports = function rotateArrayRight(array) {
  const rotated = [];

  const height = array.length;
  const width = array[0].length;

  for (let w = 0; w < width; w++) {
    for (let h = 0; h < height; h++) {
      rotated[w] = rotated[w] || [];
      rotated[w][height - 1 - h] = array[h][w];
    }
  }

  if (typeof array[0] === 'string') {
    return rotated.map((row) => row.join(''));
  }

  return rotated;
};
