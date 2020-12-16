const fs = require('fs');
const inputString = fs.readFileSync(process.argv[2], 'utf-8').trim().split('\n');

main(inputString);

function parse(arr) {
  const result = {
    rules: {},
    my: null,
    nearby: [],
  };

  let section = 0;

  arr.forEach((line) => {
    if (!line) {
      return;
    }

    if (line === 'your ticket:' || line === 'nearby tickets:') {
      section += 1;
      return;
    }

    if (section === 0) {
      const [rule, values] = line.split(': ');
      result.rules[rule] = result.rules[rule] || [];

      const intervals = values.split(' or ');
      intervals.forEach((interval) => {
        const [from, to] = interval.split('-');
        result.rules[rule].push([parseInt(from, 10), parseInt(to, 10)]);
      });
    } else {
      const commas = line.split(',').map((x) => parseInt(x, 10));
      if (section === 1) {
        result.my = commas;
      } else {
        result.nearby.push(commas);
      }
    }
  });

  return result;
}

function validate(rules, tickets) {
  const validTickets = [];

  const flatRules = [];
  Object.values(rules).forEach((rule) => {
    rule.forEach((r) => flatRules.push(r));
  });

  tickets.forEach((ticket) => {
    let validFields = 0;
    ticket.forEach((field) => {
      let failures = 0;
      flatRules.forEach(([from, to]) => {
        if (field > to || field < from) {
          failures += 1;
        }
      });
      if (failures < flatRules.length) {
        validFields += 1;
      }
    });
    if (validFields === ticket.length) {
      validTickets.push(ticket);
    }
  });

  return validTickets;
}

function findFields(rules, tickets) {
  const fields = {};

  const fieldsLength = tickets[0].length;

  Object.entries(rules).forEach(([fieldName, rules]) => {
    fields[fieldName] = [];

    for (let f = 0; f < fieldsLength; f += 1) {
      const fieldValues = tickets.map((ticket) => ticket[f]);

      if (
        fieldValues.every((value) => {
          const hasMatchingRule = rules.find(([from, to]) => {
            return value >= from && value <= to;
          });
          return Boolean(hasMatchingRule);
        })
      ) {
        fields[fieldName].push(f);
      }
    }
  });

  return fields;
}

function narrowDown(fields) {
  const fieldsMap = { ...fields };

  const valuesMap = {};
  Object.entries(fieldsMap).forEach(([fieldName, value]) => {
    value.forEach((v) => {
      valuesMap[v] = valuesMap[v] || [];
      valuesMap[v].push(fieldName);
    });
  });

  const finalFields = {};

  while (Object.keys(fieldsMap).length > 0) {
    const foundFieldWithOnePossibleValue = Object.entries(fieldsMap).find((entry) => {
      return entry[1].length === 1;
    });

    if (foundFieldWithOnePossibleValue) {
      const [fieldName, known] = foundFieldWithOnePossibleValue;
      const knownValue = +known[0];

      finalFields[fieldName] = knownValue;
      console.log(fieldName, 'is', knownValue);

      Object.entries(fieldsMap).forEach(([fieldName, value]) => {
        const idx = value.indexOf(knownValue);
        fieldsMap[fieldName].splice(idx, 1);
      });

      delete fieldsMap[fieldName];
      delete valuesMap[knownValue];
    } else {
      const foundValueWithOnePossibleField = Object.entries(valuesMap).find((entry) => {
        return entry[1].length === 1;
      });

      if (!foundValueWithOnePossibleField) {
        console.log('fieldsMap', fieldsMap);
        console.log('valuesMap', valuesMap);
        console.log('finalFields', finalFields);
        throw new Error('out of ideas');
      }

      const [known, fieldName] = foundValueWithOnePossibleField;
      const knownValue = +known;
      const knownField = String(fieldName[0]);

      finalFields[knownField] = knownValue;
      console.log(knownField, 'is', knownValue);

      Object.entries(valuesMap).forEach(([value, fieldName]) => {
        const idx = fieldName.indexOf(knownField);
        valuesMap[value].splice(idx, 1);
      });

      delete fieldsMap[knownField];
      delete valuesMap[knownValue];
    }
  }

  return finalFields;
}

function variantDumb(arr) {
  const parsed = parse(arr);

  parsed.nearby = validate(parsed.rules, parsed.nearby);

  const possibleFields = findFields(parsed.rules, [parsed.my, ...parsed.nearby]);

  const finalFields = narrowDown(possibleFields);

  const departures = Object.entries(finalFields).filter(([fieldName]) => {
    return fieldName.startsWith('departure');
  });

  const result = departures
    .map(([fieldName, fieldIndex]) => {
      console.log('my', fieldName, 'is', parsed.my[fieldIndex]);
      return parsed.my[fieldIndex];
    })
    .reduce((a, b) => (a *= b), 1);

  return result;
}

function solve(inputString) {
  return variantDumb(inputString);
}

function main(inputString) {
  const start = new Date();
  let result = solve(inputString);
  console.log(result);
  console.log('Took', new Date() - start, 'ms');
}
