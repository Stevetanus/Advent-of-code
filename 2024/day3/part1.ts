import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

const regexPattern = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;
let match: RegExpExecArray | null;
let doMatch: RegExpExecArray | null;
let dontMatch: RegExpExecArray | null;
let totalSum = 0;

[lines.join('')].forEach((ln, i) => {
  let doArr: number[] = [];
  let dontArr: number[] = [];
  let dontMulRange: number[][] = [];

  while ((doMatch = doRegex.exec(ln)) !== null) {
    doArr.push(doMatch.index);
  }
  while ((dontMatch = dontRegex.exec(ln)) !== null) {
    dontArr.push(dontMatch.index);
  }

  dontArr.forEach((start, i) => {
    let range: number[] = [];
    let end!: number;
    range.push(start);
    doArr.forEach((e, j) => {
      if (end) return;
      if (e > start) {
        end = e;
        range.push(end);
      }
    });
    if (!range[1]) {
      range[1] = Infinity;
    }
    dontMulRange.push(range);
  });

  console.log({ doArr, dontArr, dontMulRange });

  // while ((match = regexPattern.exec(ln)) !== null) {
  //   const num1 = parseInt(match[1], 10);
  //   const num2 = parseInt(match[2], 10);

  //   const product = num1 * num2;
  //   totalSum += product;

  //   console.log(
  //     `Matched: ${match[0]}, Numbers: ${num1}, ${num2}, Product: ${product}`
  //   );
  // }

  while ((match = regexPattern.exec(ln)) !== null) {
    let isSkip = false;

    dontMulRange.forEach((range, index) => {
      if (match && match.index > range[0] && match.index < range[1]) {
        isSkip = true;
      }
    });
    if (isSkip) continue;
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);

    const product = num1 * num2;
    totalSum += product;

    console.log(
      `Matched index ${match.index}: ${match[0]}, Numbers: ${num1}, ${num2}, Product: ${product}`
    );
  }
});
console.log(`Total Sum of Products: ${totalSum}`);
