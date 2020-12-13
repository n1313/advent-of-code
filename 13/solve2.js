const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

const skip = 1;
// const skip = 100041242663081;

main(inputString);

function isDepartingOnTimestamp(time, bus) {
  if (time % bus === 0) {
    return true;
  }
  return false;
}

function variantDumb(arr) {
  const buses = {};
  let largest = 0;
  let first;

  arr[1].split(',').forEach((b, i) => {
    if (b === 'x') {
      return;
    }
    buses[b] = i;
    if (!first) {
      first = b;
    }
    const bint = parseInt(b, 10);
    if (bint > largest) {
      largest = bint;
    }
  });

  const start = Math.ceil(skip / largest) * largest;

  const largestPosition = buses[largest];
  let found = false;
  let i = 0;
  let time;

  while (!found) {
    time = start + largest * i;
    // console.log('time', time);
    found = Object.entries(buses).every(([bus, position]) => {
      const offset = time + (position - largestPosition);
      const result = isDepartingOnTimestamp(offset, bus);
      return result;
    });
    i += 1;
  }

  const firstDeparture = time + (buses[first] - largestPosition);

  console.log('firstDeparture', firstDeparture);
  return firstDeparture;
}

function variantLessDumb(arr) {
  const buses = arr[1].split(',').map((bus) => parseInt(bus, 10));

  let step = 1;
  let time = 1;

  for (let i = 0; i < buses.length; i++) {
    console.log('i', i);
    if (!buses[i]) {
      continue;
    }
    while ((time += step)) {
      console.log('time', time);
      if ((time + i) % buses[i] === 0) {
        step *= buses[i];
        break;
      }
    }
  }

  return time;
}

function solve(inputString) {
  // return variantDumb(inputString);

  return variantLessDumb(inputString);
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
