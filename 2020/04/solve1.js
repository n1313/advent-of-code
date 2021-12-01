const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').split('\n');

main();

function collectPassports(arr) {
  console.log('');
  const passports = [];

  let passport = {};

  for (let i = 0; i < arr.length; i++) {
    const line = arr[i];
    if (!line || !line.trim()) {
      passports.push(passport);
      passport = {};
      continue;
    }
    const fields = line.split(' ');
    fields.forEach((field) => {
      const [key, value] = field.split(':');
      passport[key] = value;
    });
  }

  return passports;
}

function isValidPassport(passport) {
  if (Object.keys(passport).length === 8) {
    return true;
  }
  if (Object.keys(passport).length === 7 && !passport.cid) {
    return true;
  }
  return false;
}

function variantDumb(arr) {
  const passports = collectPassports(arr);

  const valid = passports.filter(isValidPassport);

  return valid.length;
}

function solve() {
  return variantDumb(inputString);
}

function main() {
  const start = new Date();
  let result = solve();
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
