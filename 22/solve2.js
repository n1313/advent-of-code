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

function game(deck1, deck2) {
  const gameConfigurations = {};

  let gameWinner;

  while (deck1.length > 0 && deck2.length > 0 && !gameWinner) {
    const configuration = [deck1.join('-'), deck2.join('-')].join(':');

    if (gameConfigurations[configuration]) {
      gameWinner = 1;
      break;
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
      deck1.push(card1);
      deck1.push(card2);
    } else {
      deck2.push(card2);
      deck2.push(card1);
    }
  }

  if (!gameWinner) {
    gameWinner = deck1.length > deck2.length ? 1 : 2;
  }

  return [gameWinner, deck1, deck2];
}

function solve(inputString) {
  let [deck1, deck2] = parse(inputString);

  const [winner, postgameDeck1, postgameDeck2] = game(deck1, deck2);

  const winningDeck = postgameDeck1.length > postgameDeck2.length ? postgameDeck1 : postgameDeck2;

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
