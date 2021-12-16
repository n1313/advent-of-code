const solve = require('../../utils/solve');

const hex2bin = (hex) => {
  return hex
    .split('')
    .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
    .join('');
};

const bin2dec = (bin) => {
  return parseInt(bin, 2);
};

const parsePacket = (bin) => {
  const version = bin2dec(bin.slice(0, 3));
  const type = bin2dec(bin.slice(3, 6));
  const isOperator = type !== 4;

  const body = bin.slice(6);

  let packet;
  let raw;

  if (isOperator) {
    const lengthType = body[0];
    const subpackets = [];

    if (lengthType === '0') {
      const subpacketsLength = bin2dec(body.slice(1, 16));
      let pointer = 0;

      while (pointer < subpacketsLength) {
        const slice = body.slice(16 + pointer, 16 + subpacketsLength);
        const subpacket = parsePacket(slice);
        subpackets.push(subpacket);
        pointer += subpacket.raw.length;
      }

      raw = bin.slice(0, 6 + 1 + 15 + subpacketsLength);
    } else {
      const subpacketsCount = bin2dec(body.slice(1, 12));
      let pointer = 0;
      let subpacketsLength = 0;

      while (subpackets.length < subpacketsCount) {
        const slice = body.slice(12 + pointer);
        const subpacket = parsePacket(slice);
        subpackets.push(subpacket);
        pointer += subpacket.raw.length;
        subpacketsLength += subpacket.raw.length;
      }

      raw = bin.slice(0, 6 + 1 + 11 + subpacketsLength);
    }

    packet = {
      raw,
      version,
      type,
      isOperator,
      subpackets,
    };
  } else {
    let value = '';

    let lastGroup = false;
    let c = 0;
    while (!lastGroup && c < body.length) {
      const group = body.slice(c, c + 5);
      if (group[0] === '0') {
        lastGroup = true;
      }
      value += group.slice(1);
      c += 5;
    }
    value = bin2dec(value);

    raw = bin.slice(0, 6 + c);

    packet = {
      raw,
      version,
      type,
      isOperator,
      value,
    };
  }

  return packet;
};

const solver1 = (lines) => {
  const bin = hex2bin(lines[0]);
  const outer = parsePacket(bin);

  let result = 0;
  const queue = [outer];
  while (queue.length > 0) {
    const q = queue.shift();
    result += q.version;
    if (q.subpackets) {
      q.subpackets.forEach((s) => {
        queue.push(s);
      });
    }
  }

  return result;
};

const calculate = (packet) => {
  switch (packet.type) {
    case 0: {
      return packet.subpackets.reduce((acc, subpacket) => {
        const value = calculate(subpacket);
        return acc + value;
      }, 0);
    }
    case 1: {
      return packet.subpackets.reduce((acc, subpacket) => {
        const value = calculate(subpacket);
        return acc * value;
      }, 1);
    }
    case 2: {
      return packet.subpackets.reduce((acc, subpacket) => {
        const value = calculate(subpacket);
        return Math.min(acc, value);
      }, Infinity);
    }
    case 3: {
      return packet.subpackets.reduce((acc, subpacket) => {
        const value = calculate(subpacket);
        return Math.max(acc, value);
      }, -1);
    }
    case 4: {
      return packet.value;
    }
    case 5: {
      const v1 = calculate(packet.subpackets[0]);
      const v2 = calculate(packet.subpackets[1]);
      return v1 > v2 ? 1 : 0;
    }
    case 6: {
      const v1 = calculate(packet.subpackets[0]);
      const v2 = calculate(packet.subpackets[1]);
      return v1 < v2 ? 1 : 0;
    }
    case 7: {
      const v1 = calculate(packet.subpackets[0]);
      const v2 = calculate(packet.subpackets[1]);
      return v1 === v2 ? 1 : 0;
    }
  }
};

const solver2 = (lines) => {
  const bin = hex2bin(lines[0]);
  const outer = parsePacket(bin);

  return calculate(outer);
};

const testInput1 = `A0016C880162017C3686B18A3D4780`;
const expectedResult1 = 31;

const testInput2 = `9C0141080250320F1802104A08`;
const expectedResult2 = 1;

solve(solver1, testInput1, expectedResult1);
solve(solver2, testInput2, expectedResult2);
