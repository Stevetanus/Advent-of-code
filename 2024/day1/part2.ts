import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let leftGroup: number[] = [];
let rightGroup: number[] = [];

let sum = 0;

lines.map((line, i) => {
  const [left, right] = line.split(/\s+/).map(Number);
  leftGroup.push(left);
  rightGroup.push(right);
});

leftGroup.sort((a, b) => a - b);
rightGroup.sort((a, b) => a - b);

leftGroup.forEach((numberL) => {
  const numberLMultiplier = rightGroup.filter(
    (numberR) => numberR === numberL
  ).length;
  if (numberLMultiplier) {
    sum += numberL * numberLMultiplier;
  }
});

console.log(sum);
