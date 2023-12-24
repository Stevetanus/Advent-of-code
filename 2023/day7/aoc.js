const fs = require('fs');
const data = fs.readFileSync('crawler/src/day7/2023day7.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day7(lines) {
  let ranking = [];
  let bidArr = [];
  let scoreObj = {
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: [],
    0: [],
  };
  lines.forEach((ln, i) => {
    let [card, bid] = ln.split(' ');
    // console.log(card);
    scoreObj[getScore(card)].push({
      card,
      bid,
    });
  });
  let keys = Object.keys(scoreObj);
  keys.map((ki) =>
    scoreObj[ki].sort((a, b) => {
      return weakOrStrong(a.card, b.card);
    })
  );

  console.log(
    scoreObj[0].slice(0, 50),
    scoreObj[1].slice(0, 50),
    scoreObj[2].slice(0, 50),
    scoreObj[3].slice(0, 50),
    scoreObj[4].slice(0, 50),
    scoreObj[5].slice(0, 50),
    scoreObj[6].slice(0, 50)
  );

  let sum = 0;
  keys.forEach((ki) => {
    scoreObj[ki].forEach((s) => {
      ranking.push(s.card);
      bidArr.push(s.bid);
    });
  });
  bidArr.forEach((r, i) => {
    sum += (i + 1) * r;
  });

  console.log({ sum });
  // console.log(scoreObj[1]);
}

function getScore(str) {
  let strObj = {};
  for (let i = 0; i < str.length; i++) {
    if (!strObj[str[i]]) {
      strObj[str[i]] = 1;
    } else {
      strObj[str[i]]++;
    }
  }

  let score = 0;
  let keys = Object.keys(strObj);
  if (strObj['J'] && strObj['J'] < 5) {
    // console.log({ strObj });
    let modifiedKi = '';
    keys.map((ki) => {
      if (ki === 'J') return;
      if (!modifiedKi) {
        modifiedKi = ki;
      } else if (strObj[ki] > strObj[modifiedKi]) {
        modifiedKi = ki;
      }
    });
    strObj[modifiedKi] += strObj['J'];
    delete strObj['J'];
    // console.log({ strObj });
  }

  // console.log({ str, keys, strObj });
  // update keys
  keys = Object.keys(strObj);
  if (keys.length === 1) {
    score = 6;
  } else if (keys.length === 2) {
    if (strObj[keys[0]] < 2 || strObj[keys[1]] < 2) {
      score = 5;
    } else {
      score = 4;
    }
  } else if (keys.length === 3) {
    // 3 支
    console.log({ str, strObj });
    if (strObj[keys[0]] > 2 || strObj[keys[1]] > 2 || strObj[keys[2]] > 2) {
      score = 3;
    } else {
      score = 2;
    }
  } else if (keys.length === 4) {
    score = 1;
  } else {
    score = 0;
  }
  return score;
}

function weakOrStrong(str1, str2) {
  // part1
  // let rank = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  let rank = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
  // let num = 0;
  for (let i = 0; i < str1.length; i++) {
    if (rank.indexOf(str1[i]) > rank.indexOf(str2[i])) {
      return -1;
    }
    if (rank.indexOf(str1[i]) < rank.indexOf(str2[i])) {
      return 1;
    }
  }
  return 0;
  // console.log({ str1, str2, num });
  // return num;
}

day7(lines);
