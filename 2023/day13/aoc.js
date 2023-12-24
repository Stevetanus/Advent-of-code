const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();

let sum = 0;

function day13(lines) {
  let group = [];
  let idx = 0;
  lines.map((ln, y) => {
    if (!group[idx]) group[idx] = [];
    if (ln !== '') {
      group[idx].push(ln);
    } else {
      idx++;
    }
  });
  group.map((g, i) => {
    checkMirrors(g);
  });

  console.log('p1: ', { sum });
  sum = 0;

  group.map((g, i) => {
    checkMirrors(g, true);
  });
  console.log('p2: ', { sum });
}

function checkMirrors(arr, isPart2) {
  let verticalArr = [];

  for (let i = 0; i < arr[0].length; i++) {
    verticalArr.push(['']);
  }

  arr.map((ln, y) => {
    ln.split('').map((v, x) => {
      verticalArr[x] += v;
    });
  });

  let hori = checkArr(arr, isPart2);
  let verti = checkArr(verticalArr, isPart2);
  // console.log({ hori, verti });
  let ans = 100 * hori + verti;
  sum += ans;
}

function checkArr(arr, isPart2) {
  let point = 0;
  let check = false;
  arr.map((ln, y) => {
    if (check) return;

    if (isPart2) {
      let badness = 0;
      for (let ds = 0; ds < arr.length; ds++) {
        let left = y - ds;
        let right = y + ds + 1;
        if (left >= 0 && right < arr.length) {
          for (let lg = 0; lg < ln.length; lg++) {
            if (arr[left][lg] !== arr[right][lg]) {
              badness++;
            }
          }
        }
      }
      if (badness === 1) {
        check = true;
        point = y + 1;
      }
    } else {
      if (y < 1) return;
      if (checkStr(ln, arr[y - 1])) {
        for (let i = y - 2, j = 1; y >= 0; i--, j++) {
          if (!arr[i] || !arr[y + j]) {
            check = true;
            break;
          }
          if (checkStr(arr[i], arr[y + j])) {
            check = true;
          } else {
            check = false;
            break;
          }
        }
        if (check) point = y;
      }
    }
  });
  return point;
}

function checkStr(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function checkOneMiss(a, b) {
  let miss = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      miss++;
    }
  }
  if (miss === 1) {
    return true;
  }
  return false;
}

day13(lines);
