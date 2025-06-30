import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

function getCombinations(operators: string[], length: number): string[][] {
  if (length === 0) return [[]];

  const result: string[][] = [];

  const helper = (current: string[]) => {
    if (current.length === length) {
      result.push([...current]); // 複製避免參照問題
      return;
    }

    for (const op of operators) {
      current.push(op);
      helper(current);
      current.pop(); // 回溯
    }
  };

  helper([]);
  return result;
}

const operators = ['+', '*'];
let count = 0;

lines.forEach((ln, i) => {
  const [testValue, remainingNumbers] = [
    Number(ln.split(':')[0]),
    ln.split(':')[1].split(' ').slice(1).map(Number),
  ];

  const comb = getCombinations(operators, remainingNumbers.length - 1);

  let isCorrectCalibration = false;

  comb.forEach((cArr, j) => {
    if (isCorrectCalibration) return;
    let result = remainingNumbers[0];
    cArr.forEach((c, z) => {
      if (c === '+') {
        result += remainingNumbers[z + 1];
      } else {
        result *= remainingNumbers[z + 1];
      }
    });
    if (result === testValue) {
      count += result;
      isCorrectCalibration = true;
    }
  });
});

console.log('answer is: ', count);
