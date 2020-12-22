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

function isHighestCardInDeck1(deck1, deck2) {
  const max1 = Math.max(...deck1);
  const max2 = Math.max(...deck2);
  return max1 > max2;
}

function game(deck1, deck2) {
  const gameConfigurations = {};

  if (isHighestCardInDeck1(deck1, deck2)) {
    return [1, deck1];
  }

  while (deck1.length > 0 && deck2.length > 0) {
    const configuration = [deck1.join('-'), deck2.join('-')].join(':');

    if (gameConfigurations[configuration]) {
      return [1, deck1];
    } else {
      gameConfigurations[configuration] = true;
    }

    let roundWinner;

    const card1 = deck1.shift();
    const card2 = deck2.shift();

    if (card1 <= deck1.length && card2 <= deck2.length) {
      roundWinner = game(deck1.slice(0, card1), deck2.slice(0, card2))[0];
    } else {
      roundWinner = card1 > card2 ? 1 : 2;
    }

    if (roundWinner === 1) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }

  if (deck1.length > deck2.length) {
    return [1, deck1];
  } else {
    return [2, deck2];
  }
}

function solve(inputString) {
  let [deck1, deck2] = parse(inputString);

  const [winner, winningDeck] = game(deck1, deck2);

  const result = winningDeck
    .map((x, i) => {
      return (winningDeck.length - i) * x;
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
