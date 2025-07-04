import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

const D = lines[0].split(' ').map(Number);

const DP = new Map();

// 拆成單個 stone 輸入直到最後一輪
function solve(x: number, t: number): number {
  const key = `${x},${t}`;
  if (DP.has(key)) return DP.get(key);

  let ret;
  if (t === 0) {
    ret = 1;
  } else if (x === 0) {
    ret = solve(1, t - 1);
  } else if (String(x).length % 2 === 0) {
    const dstr = String(x);
    const mid = dstr.length / 2;
    const left = parseInt(dstr.slice(0, mid), 10);
    const right = parseInt(dstr.slice(mid), 10);
    ret = solve(left, t - 1) + solve(right, t - 1);
  } else {
    ret = solve(x * 2024, t - 1);
  }

  DP.set(key, ret);
  return ret;
}

function solve_all(t: number) {
  return D.reduce((sum, x) => sum + solve(x, t), 0);
}

console.log('part2 answer is: ', solve_all(75));
