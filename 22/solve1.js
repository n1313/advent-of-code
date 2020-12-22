const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  return inputString.split('\n\n').map((deck) =>
    deck
      .split('\n')
      .slice(1)
      .map((x) => parseInt(x, 10))
  );
}

function solve(inputString) {
  let [deck1, deck2] = parse(inputString);

  while (deck1.length > 0 && deck2.length > 0) {
    const card1 = deck1.shift();
    const card2 = deck2.shift();

    if (card1 > card2) {
      deck1.push(card1);
      deck1.push(card2);
    } else {
      deck2.push(card2);
      deck2.push(card1);
    }
  }

  const winner = deck1.length ? deck1 : deck2;
  const result = winner
    .map((x, i) => {
      return (winner.length - i) * x;
    })
    .reduce((a, b) => a + b, 0);

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
