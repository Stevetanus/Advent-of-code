import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

// console.log(lines.length); // 1362

let orderingRules: { [key: string]: string[] } = {};
let count = 0;

// console.log(lines[lines.length - 1].split(','));

// process.exit();

let emptyLineIndex: number = Infinity;
lines.forEach((ln, i) => {
  if (ln.length === 0) {
    // console.log('this is cool');˜
    emptyLineIndex = i;
  }

  console.log({ i, emptyLineIndex }, ln.length);

  if (i <= emptyLineIndex) {
    const [first, second] = ln.split('|');

    if (!orderingRules[first]) {
      orderingRules[first] = [second];
    } else {
      orderingRules[first].push(second);
    }
  } else {
    const pages = ln.split(',');
    let isEnd = false;
    pages.forEach((page, j) => {
      if (isEnd || j === pages.length - 1) return;
      if (!orderingRules[page].includes(pages[j + 1])) {
        isEnd = true;
      }
    });
    const midNumber = Number(pages[Math.ceil(pages.length / 2) - 1]);

    if (!isEnd) {
      console.log({ pages });

      count += midNumber;
    }
  }
});

console.log('result: ', count);
