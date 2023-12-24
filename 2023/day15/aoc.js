const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const lines = data.split(/\n/);
if (lines.at(-1) === '') lines.pop();
console.log('start');
// console.log(lines);

function day15(lines, isPart2 = false) {
  let sum = 0;

  if (isPart2) {
    let box = {};
    for (let i = 0; i < 256; i++) {
      box[i] = [];
    }
    lines[0].split(',').map((str, i) => {
      if (!str) return;
      let [hashStr, focal] = str.split(/[-=]/);
      let start = 0;
      hashStr.split('').map((v, x) => {
        start = hash(start, v);
      });

      let isFound = false;
      box[start].map((b, i) => {
        if (b.str === hashStr) {
          isFound = true;
          if (focal !== '') {
            b.foc = Number(focal);
          } else {
            box[start] = box[start].filter((b) => b.str !== hashStr);
          }
        }
      });
      if (!isFound && focal) {
        box[start].push({ str: hashStr, foc: focal });
      }
      console.log({ hashStr, focal, start }, box[start]);

      // console.log(start, box[start]);
    });
    console.log(box[0], box[1], box[2], box[3], box[4]);

    for (let i = 0; i < 256; i++) {
      box[i].map((b, j) => {
        sum += (i + 1) * (j + 1) * Number(b.foc);
      });
    }
  } else {
    lines[0].split(',').map((str, i) => {
      if (!str) return;
      let start = 0;
      str.split('').map((v, x) => {
        start = hash(start, v);
      });
      console.log({ str, start });
      sum += start;
    });
  }
  if (isPart2) {
    console.log('p2: ', sum);
  } else {
    console.log('p1: ', sum);
  }
}

function hash(start, str) {
  return ((start + str.charCodeAt()) * 17) % 256;
}

day15(lines, true);
