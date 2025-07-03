import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let disk = lines[0].split('');
let diskExact: string[] = [];

let blocksId: string[] = [];
let blocksIndex: number[] = [];

let diskExactIndex = -1;
disk.forEach((d, i) => {
  if (i % 2 === 0) {
    for (let j = 0; j < Number(d); j++) {
      diskExact.push((i / 2).toString());
      diskExactIndex++;
      blocksId.push((i / 2).toString());
      blocksIndex.push(diskExactIndex);
    }
  } else {
    for (let j = 0; j < Number(d); j++) {
      diskExact.push('.');
      diskExactIndex++;
    }
  }
});

console.log('before: ', diskExact, blocksIndex, blocksId);

let isStop = false;
diskExact.forEach((d, i) => {
  if (isStop) return;
  if (d === '.') {
    let leaveIndex = blocksIndex.pop() as number;
    let toMoveBlockId = blocksId.pop() as string;
    if (i < leaveIndex) {
      diskExact[i] = toMoveBlockId;
      diskExact[leaveIndex] = '.';
    } else {
      isStop = true;
    }
  }
});

console.log('after: ', diskExact);

let checksum = 0;
diskExact.forEach((d, i) => {
  if (d === '.') return;
  checksum += Number(d) * i;
});
console.log('the answer is: ', checksum);
