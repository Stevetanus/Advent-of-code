const fs = require('fs');
const data = fs.readFileSync(
  '/Users/hsien-chengwang/Desktop/202307/crawler/src/2023day4.txt',
  'utf8'
);
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
console.log(lines);

function part1(lines) {
  let sum = 0;
  let colors = ['red', 'green', 'blue'];
  let pass = [];
  let power = 0;
  let passObj = {};
  lines.forEach((line, i) => {
    const [game, info] = line.split(':');
    const actions = info.trim().split(';');
    console.log(actions);
    let isPass = true;

    let powerObj = {
      red: 0,
      green: 0,
      blue: 0,
    };

    actions.forEach((action) => {
      let colorsObj = {
        red: 0,
        green: 0,
        blue: 0,
      };
      // colors.forEach((color, i) => {
      //   let innerArr = action.split(',');
      //   innerArr.forEach((inner, i) => {
      //     if (inner.includes(color)) {
      //       let num = Number(inner.replace(color, '').trim());
      //       console.log({ color, num });
      //       colorsObj[color] += num;
      //       console.log(colorsObj[color]);
      //     }
      //   });
      // });
      colors.forEach((color, i) => {
        let innerArr = action.split(',');
        innerArr.forEach((inner, i) => {
          if (inner.includes(color)) {
            let num = Number(inner.replace(color, '').trim());
            console.log({ color, num });
            colorsObj[color] += num;
            if (num > powerObj[color]) {
              powerObj[color] = num;
            }
            console.log(colorsObj[color]);
          }
        });
      });
      if (colorsObj.red > 12 || colorsObj.green > 13 || colorsObj.blue > 14) {
        isPass = false;
      }
      // actions.indexOf()
    });

    if (isPass) {
      let num = i + 1;
      pass.push(num);
      sum += num;
    }

    power += powerObj.red * powerObj.green * powerObj.blue;
    // console.log({ i, colorsObj });
    // colors.forEach();
    // if (colorsObj.red <= 12 && colorsObj.green <= 13 && colorsObj.blue <= 14) {
    //   console.log('its me', i);
    //   let num = i + 1;
    //   pass.push(num);
    //   sum += num;
    // }
  });
  console.log({ pass });
  console.log({ sum });
  console.log({ power });
}
function part2(lines) {
  lines.forEach((line) => {});
}

function day12015(lines) {
  let sum = 0;
  let baseArr = [];

  lines.map((l) => {
    l.split('').map((ll, i) => {
      if (ll === '(') {
        console.log('plus');
        sum++;
      }
      if (ll === ')') {
        console.log('minus');
        sum--;
      }
      if (sum === -1) {
        baseArr.push(i + 1);
      }
    });
  });
  console.log({ sum });
  console.log({ baseArr });
}

const isDigit = (char) => /[0-9]/.test(char);
const isSymbol = (char) => char !== '.' && !isDigit(char);

function day3Part1(lines) {
  let numberReg = /[0-9]{1,3}/g;
  let specialReg = /[@*$+-=$/#&]/;

  let num = 0;
  maArr = [];
  lines.forEach((line, lineIndex) => {
    // for(let i, max = line.length; i < max; i++) {
    //   if (numberReg.test()) {

    //   }
    // },
    const matchArr = line.match(numberReg);
    console.log({ matchArr });
    matchArr.map((ma) => {
      let index = line.indexOf(ma);

      if (
        (lines[lineIndex - 1] &&
          testLines(
            lines[lineIndex - 1].slice(index - 1, index + ma.length + 1)
          )) ||
        (lines[lineIndex + 1] &&
          testLines(
            lines[lineIndex + 1].slice(index - 1, index + ma.length + 1)
          )) ||
        (lines[lineIndex][index - 1] && lines[lineIndex][index - 1] !== '.') ||
        (lines[lineIndex][index + ma.length] &&
          lines[lineIndex][index + ma.length] !== '.')
      ) {
        if (lines[lineIndex][index - 1] === '-') {
          let newMa = '-' + ma;
          maArr.push(newMa);
          num -= Number(ma);
          console.log({ newMa });
        } else {
          maArr.push(ma);
          console.log({ ma });
          num += Number(ma);
        }
      }
    });
  });
  console.log({ maArr, num });
}

function testLines(str) {
  let isPass = false;
  console.log({ str });
  for (let i = 0, max = str.length; i < max; i++) {
    if (isSymbol(str[i])) {
      console.log('need to break');
      isPass = true;
      break;
    }
  }
  console.log({ isPass });
  return isPass;
}

// part1(lines);
// day12015(lines);
// day3Part1(lines);
// function part1RegEx(lines) {
//   let sum = lines
//     .join('')
//     .match(
//       /(\d*(?<=[^\d.\n\r].{140,142})\d+)|(\d+(?=.{140,142}[^\d.\n\r])\d*)|((?<=[^\d.\n\r])\d+)|(\d+(?=[^\d.\n\r]))/gs
//     )
//     ?.reduce((p, c) => p + +c, 0);
//   console.log(sum);
// }
// part1RegEx(lines);

function day4Part1(lines) {
  let ans = 0;
  let countObj = {};
  let oops = [];
  let cards = [];

  lines.map((line, lineIndex) => {
    if (!countObj[lineIndex + 1]) {
      console.log('bbb', lineIndex, countObj);
      countObj[lineIndex + 1] = 1;
    } else {
      countObj[lineIndex + 1] += 1;
    }

    const [winNum, ownNum] = line
      .split(':')[1]
      .split('|')
      .map((n) => n.trim());
    console.log({ winNum, ownNum });
    let count = 0;
    let winNumArr = winNum.split(' ').filter((w) => w);
    let ownNumArr = ownNum.split(' ').filter((o) => o);
    winNumArr.map((winN, winIndex) => {
      ownNumArr.map((ownN, ownIndex) => {
        if (Number(ownN) === Number(winN)) {
          console.log({ ownN });
          count++;
        }
      });
    });
    console.log({ winNumArr, ownNumArr, count });

    // 計算各別刮刮卡

    // 1
    // 2 3 4 5 6 7 8 9 10 11
    // 3 4 5 6 7 8
    // 4 5 6 7 8 9 10
    // 5 6 7 8 9 10 11 12 13 14

    for (let i = 0; i < count; i++) {
      console.log({ lineIndex, i });
      // if (lineIndex + i + 2 > 209) continue;
      if (!countObj[lineIndex + i + 2]) {
        countObj[lineIndex + i + 2] = 0;
      }

      countObj[lineIndex + i + 2] += countObj[lineIndex + 1];

      //   countObj[lineIndex + i + 2] += countObj[lineIndex + 1];
      // } else {

      // }
    }
    console.log({ countObj }, getValue(countObj));

    cards.push({ name: lineIndex, matches: count, processed: false });
    if (count) {
      let c = 2 ** (count - 1);
      ans += c;
    }
    // console.log({ count, ans });
  });

  let index = 0;
  // console.log({ cards });
  while (index < cards.length) {
    let name = cards[index].name;
    for (let i = 0; i < cards[index].matches; i++) {
      cards.push({
        name: cards[name + i + 1].name,
        matches: cards[name + i + 1].matches,
        processed: false,
      });
    }
    cards[index].processed = true;
    index++;
  }

  console.log(`Part 2: ${cards.length} cards`);

  console.log({ oops, ans });
}

function getValue(obj) {
  let value = 0;
  Object.values(obj).map((v) => {
    if (isNaN(v)) return;
    value += v;
  });
  return value;
}

day4Part1(lines);
