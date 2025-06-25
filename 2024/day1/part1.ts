import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let leftGroup: number[] = [];
let rightGroup: number[] = [];

lines.map((line, i) => {
  const [left, right] = line.split(/\s+/).map(Number);
  leftGroup.push(left);
  rightGroup.push(right);
});

leftGroup.sort((a, b) => a - b);
rightGroup.sort((a, b) => a - b);

let sum = 0;

console.log(leftGroup, rightGroup);
console.log(leftGroup.reverse(), rightGroup.reverse());

for (let i = 0; i < leftGroup.length; i++) {
  console.log(`dis${i}: `, rightGroup[i] - leftGroup[i]);
  sum += Math.abs(rightGroup[i] - leftGroup[i]);
}

console.log(sum);
