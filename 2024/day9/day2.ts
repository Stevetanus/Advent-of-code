// followed through Jonathan Paulson's solution
import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let disk = lines[0].split('');

// 1. 解析檔案與空格區塊
type Block = { pos: number; size: number; id: number };
type Space = { pos: number; size: number };

let blocks: Block[] = [];
let spaces: Space[] = [];
let final: (number | null)[] = [];
let pos = 0;
let fileId = 0;

for (let i = 0; i < disk.length; i++) {
  let c = disk[i];
  let n = Number(c);
  if (i % 2 === 0) {
    // 檔案區塊
    blocks.push({ pos, size: n, id: fileId });
    for (let j = 0; j < n; j++) {
      final.push(fileId);
      pos++;
    }
    fileId++;
  } else {
    // 空格區塊
    spaces.push({ pos, size: n });
    for (let j = 0; j < n; j++) {
      final.push(null);
      pos++;
    }
  }
}

// 2. 從後往前搬移檔案到前面的空格
for (let b = blocks.length - 1; b >= 0; b--) {
  let { pos: blockPos, size: blockSize, id: blockId } = blocks[b];
  for (let s = 0; s < spaces.length; s++) {
    let { pos: spacePos, size: spaceSize } = spaces[s];
    // 只搬到在自己前面的空格，且空間夠大
    if (spacePos < blockPos && blockSize <= spaceSize) {
      // 執行搬移
      for (let j = 0; j < blockSize; j++) {
        // 檢查原本位置
        if (final[blockPos + j] !== blockId) throw new Error('搬移錯誤');
        final[blockPos + j] = null;
        final[spacePos + j] = blockId;
      }
      // 更新空格資訊
      spaces[s] = { pos: spacePos + blockSize, size: spaceSize - blockSize };
      break;
    }
  }
}

// 3. 計算 checksum
let checksum = 0;
for (let i = 0; i < final.length; i++) {
  let v = final[i];
  if (v !== null) checksum += v * i;
}

console.log('the answer is:', checksum);
