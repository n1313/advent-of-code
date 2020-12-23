const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

const cups = 1000000;
const moves = 10000000;

main(inputString);

function solve(inputString) {
  const list = new Array(cups);

  const input = inputString.split('').map((x) => parseInt(x, 10));
  let curr;

  for (let i = 1; i <= cups; i++) {
    curr = input[i - 1] || i;
    const next = input[i] || i + 1;
    list[curr] = { value: curr, next, i };
  }
  list[curr].next = input[0];

  let currentValue = input[0];

  for (let m = 0; m < moves; m++) {
    const p1 = list[list[currentValue].next];
    const p2 = list[p1.next];
    const p3 = list[p2.next];
    const pickup = [p1.value, p2.value, p3.value];

    const min = [1, 2, 3, 4].find((x) => pickup.indexOf(x) === -1);
    const max = [cups, cups - 1, cups - 2, cups - 3].find((x) => pickup.indexOf(x) === -1);

    let destination = currentValue - 1;

    let found;

    while (!found) {
      if (destination < min) {
        destination = max;
      }
      if (pickup.indexOf(destination) > -1) {
        destination -= 1;
      } else {
        found = true;
      }
    }

    list[currentValue].next = p3.next;
    p3.next = list[destination].next;
    list[destination].next = p1.value;

    currentValue = list[currentValue].next;
  }

  const one = list[1];
  const next1 = list[one.next];
  const next2 = list[next1.next];

  const result = next1.value * next2.value;

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
