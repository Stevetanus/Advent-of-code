const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

const directions = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};

const path = {};

function day18(lines) {
  lines.map((ln, i) => {
    const [dir, steps, hex] = ln.split(' ');
    if (!path[dir]) {
      path[dir] = Number(steps);
    } else {
      path[dir] += Number(steps);
    }
  });

  console.log({ path });

  let coords = [];
  for (let i = 0; i < 1000; i++) {
    let str = '';
    for (let j = 0; j < 1000; j++) {
      str += '.';
    }
    coords.push(str);
  }

  let startR = 500;
  let startC = 500;
  let rows = [];
  let cols = [];
  lines.map((ln, index) => {
    const [dir, steps, hex] = ln.split(' ');
    // console.log({ startR, startC, dir, steps });
    for (let i = 0; i < Number(steps); i++) {
      const [dr, dc] = directions[dir]; // 0, -1
      startR += dr;
      startC += dc;
      if (index < 1) {
        console.log(startR, startC);
        console.log(coords[startR][startC + 1]);
      }
      let newR = coords[startR].split('');
      newR[startC] = '#';
      coords[startR] = newR.join('');
    }

    rows.push(startR);
    cols.push(startC);
  });

  console.log(
    Math.max(...rows),
    Math.min(...rows),
    Math.max(...cols),
    Math.min(...cols)
  );

  let sum = 0;
  for (let i = 226; i < 505; i++) {
    let start = 9999;
    let end = 0;
    for (let j = 459; j < 842; j++) {
      if (coords[i][j] === '#' && j < start) {
        start = j;
      }
      if (coords[i][j] === '#' && j > end) {
        end = j;
      }
    }
    console.log({ end, start });
    sum += end - start + 1;
  }

  console.log('part1 :', sum);
}

day18(lines);
