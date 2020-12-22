const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim();

main(inputString);

function parse(inputString) {
  const ingredientsMap = {};
  const allergensMap = {};
  const ingredientsCounts = {};

  inputString.split('\n').forEach((line, l) => {
    const [rawIngredientsList, rawAllergens] = line.split(' (contains ');
    const ingredients = rawIngredientsList.split(' ');
    const allergens = rawAllergens.slice(0, -1).split(', ');

    ingredients.forEach((ingredient) => {
      ingredientsMap[ingredient] = ingredientsMap[ingredient] || {};
      ingredientsCounts[ingredient] = ingredientsCounts[ingredient] || 0;
      ingredientsCounts[ingredient] += 1;
      allergens.forEach((allergen) => {
        ingredientsMap[ingredient][allergen] = ingredientsMap[ingredient][allergen] || 0;
        ingredientsMap[ingredient][allergen] += 1;
        allergensMap[allergen] = allergensMap[allergen] || {};
        allergensMap[allergen][ingredient] = allergensMap[allergen][ingredient] || 0;
        allergensMap[allergen][ingredient] += 1;
      });
    });
  });

  return [ingredientsMap, allergensMap, ingredientsCounts];
}

function solve(inputString) {
  const [ingredientsMap, allergensMap, ingredientsCounts] = parse(inputString);

  const uniqueAllergens = Object.keys(allergensMap);
  const uniqueIngredients = Object.keys(ingredientsMap);

  const solvedAllergens = {};
  let unsolvedAllergens = allergensMap;

  while (Object.keys(solvedAllergens).length < uniqueAllergens.length) {
    let candidateIngredient;

    const candidateAllergen = Object.entries(unsolvedAllergens).find(([allergen, ingredients]) => {
      const max = Math.max(...Object.values(ingredients));
      const maxIngredient = Object.entries(ingredients).filter(([i, v]) => v === max);
      if (maxIngredient.length === 1) {
        candidateIngredient = maxIngredient[0][0];
        return true;
      }
    })[0];

    solvedAllergens[candidateAllergen] = candidateIngredient;

    delete unsolvedAllergens[candidateAllergen];
    Object.entries(unsolvedAllergens).forEach(([a, i]) => {
      if (i[candidateIngredient]) {
        delete i[candidateIngredient];
      }
    });
  }

  const sortedAllergens = Object.keys(solvedAllergens).sort();

  const result = sortedAllergens.map((a) => solvedAllergens[a]).join(',');

  return result;
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
