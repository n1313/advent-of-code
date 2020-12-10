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
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if (!passport.byr || parseInt(passport.byr, 10) < 1920 || parseInt(passport.byr, 10) > 2002) {
    return false;
  }
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if (!passport.iyr || parseInt(passport.iyr, 10) < 2010 || parseInt(passport.iyr, 10) > 2020) {
    return false;
  }
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if (!passport.eyr || parseInt(passport.eyr, 10) < 2020 || parseInt(passport.eyr, 10) > 2030) {
    return false;
  }
  // hgt (Height) - a number followed by either cm or in:
  //     If cm, the number must be at least 150 and at most 193.
  //     If in, the number must be at least 59 and at most 76.
  if (passport.hgt) {
    const parsed = passport.hgt.match(/^(\d+)(in|cm)$/);
    if (!parsed) {
      return false;
    }
    if (parsed[2] === 'cm' && (parsed[1] < 150 || parsed[1] > 193)) {
      return false;
    }
    if (parsed[2] === 'in' && (parsed[1] < 59 || parsed[1] > 76)) {
      return false;
    }
  } else {
    return false;
  }
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if (!passport.hcl || !passport.hcl.match(/^#[a-z0-9]{6}$/)) {
    return false;
  }
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  if (!passport.ecl || !['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl)) {
    return false;
  }
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (!passport.pid || !passport.pid.match(/^[0-9]{9}$/)) {
    return false;
  }
  // cid (Country ID) - ignored, missing or not.

  return true;
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
