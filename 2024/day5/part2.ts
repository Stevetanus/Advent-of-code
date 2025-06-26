import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let orderingRules: { [key: string]: string[] } = {};
let emptyLineIndex = lines.findIndex((ln) => ln.length === 0);

const firstSection = lines.slice(0, emptyLineIndex);
const secondSection = lines.slice(emptyLineIndex + 1);

function comparePages(a: string, b: string): number {
  if (orderingRules[a]?.includes(b)) return -1;
  if (orderingRules[b]?.includes(a)) return 1;
  return 0;
}

firstSection.forEach((ln, i) => {
  const [first, second] = ln.split('|');
  if (!orderingRules[first]) {
    orderingRules[first] = [second];
  } else {
    orderingRules[first].push(second);
  }
});

// 分割 updates
const updates = secondSection.map((ln) => ln.split(','));

// --- Part 2 ---
let part2Sum = 0;

updates.forEach((update) => {
  const sorted = [...update].sort(comparePages); // 排序

  // 原始不等於排序版，表示這行是 invalid
  if (update.join(',') !== sorted.join(',')) {
    const mid = sorted[Math.floor(sorted.length / 2)];
    part2Sum += Number(mid);
  }
});

console.log('Part 2 result:', part2Sum);
