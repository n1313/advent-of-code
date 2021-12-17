const solve = require('../../utils/solve');

const step = ([posX, posY, speedX, speedY]) => {
  return [posX + speedX, posY + speedY, speedX > 0 ? speedX - 1 : speedX < 0 ? speedX + 1 : speedX, speedY - 1];
};

const shoot = (posX, posY, speedX, speedY, targetX, targetY) => {
  let overshot = false;
  let hit = false;
  let maxY = posY;
  while (!hit && !overshot) {
    [posX, posY, speedX, speedY] = step([posX, posY, speedX, speedY]);
    maxY = Math.max(posY, maxY);
    if (posX >= targetX[0] && posX <= targetX[1] && posY <= targetY[1] && posY >= targetY[0]) {
      hit = true;
    } else if (posX > targetX[1] || posY < targetY[0]) {
      overshot = true;
    }
  }
  return [hit, maxY];
};

const parse = (lines) => {
  return lines[0]
    .slice(15)
    .split(', y=')
    .map((x) => x.split('..').map(Number));
};

const solver1 = (lines) => {
  const [targetX, targetY] = parse(lines);

  const minSpeedX = Math.floor(Math.sqrt(8 * targetX[0] - 1) / 2);
  const maxSpeedX = targetX[1];
  const minSpeedY = -100;
  const maxSpeedY = 100;

  let bestY = 0;

  for (let speedX = minSpeedX; speedX <= maxSpeedX; speedX++) {
    for (let speedY = minSpeedY; speedY <= maxSpeedY; speedY++) {
      const [hit, maxY] = shoot(0, 0, speedX, speedY, targetX, targetY);
      if (hit) {
        if (maxY > bestY) {
          bestY = maxY;
        }
      }
    }
  }

  return bestY;
};

const solver2 = (lines) => {
  const [targetX, targetY] = parse(lines);

  const minSpeedX = Math.floor(Math.sqrt(8 * targetX[0] - 1) / 2);
  const maxSpeedX = targetX[1];
  const minSpeedY = -100;
  const maxSpeedY = 100;

  let count = 0;

  for (let speedX = minSpeedX; speedX <= maxSpeedX; speedX++) {
    for (let speedY = minSpeedY; speedY <= maxSpeedY; speedY++) {
      const [hit, maxY] = shoot(0, 0, speedX, speedY, targetX, targetY);
      if (hit) {
        count += 1;
      }
    }
  }

  return count;
};

const testInput1 = `target area: x=20..30, y=-10..-5`;
const expectedResult1 = 45;
const expectedResult2 = 112;

solve(solver1, testInput1, expectedResult1);
solve(solver2, testInput1, expectedResult2);
