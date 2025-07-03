import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
const grid = lines.map((ln) => ln.split(''));
const H = lines.length;
const W = lines[0].length;

let p1 = 0;

grid.forEach((row, i) => {
  row.forEach((column, j) => {
    if (column === '0') {
      let Queue = [{ value: column, y: i, x: j }];
      let seen = new Set();

      while (Queue.length) {
        const { value, y, x } = Queue.shift() as {
          value: string;
          y: number;
          x: number;
        };

        const key = `${y},${x}`;
        if (seen.has(key)) continue;
        seen.add(key);

        if (grid[y][x] === '9') {
          p1++;
        }

        [
          [-1, 0],
          [0, 1],
          [1, 0],
          [0, -1],
        ].forEach((direction, z) => {
          const rr = y + direction[0];
          const cc = x + direction[1];
          if (!grid[rr]) return;
          if (!grid[rr][cc]) return;
          const nextValue = grid[rr][cc];
          if (nextValue === (Number(value) + 1).toString()) {
            Queue.push({
              value: nextValue,
              y: rr,
              x: cc,
            });
          }
        });
      }
    }
  });
});

console.log('answer is : ', p1);
