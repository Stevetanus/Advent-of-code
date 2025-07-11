import * as path from 'path';
import { getLines } from '../../tools/tools';
import { PriorityQueue } from '@datastructures-js/priority-queue';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

const grid = lines.map((str) => str.split(''));

const R = grid.length;
const C = grid[0].length;

// 方向：上、右、下、左
const DIRS: [number, number][] = [
  [-1, 0], // 上
  [0, 1], // 右
  [1, 0], // 下
  [0, -1], // 左
];

type State = {
  cost: number;
  r: number;
  c: number;
  dir: number;
};

// 尋找 S 與 E
let sr = -1,
  sc = -1,
  er = -1,
  ec = -1;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] === 'S') {
      sr = r;
      sc = c;
    }
    if (grid[r][c] === 'E') {
      er = r;
      ec = c;
    }
  }
}

const pq = new PriorityQueue<State>((a, b) => a.cost - b.cost);
const visited = new Set<String>();

pq.enqueue({ r: sr, c: sc, dir: 1, cost: 0 });

let best: number | null = null;
const pointObj: { [key: string]: number } = {};

while (!pq.isEmpty()) {
  const { r, c, dir, cost } = pq.dequeue() as State;

  const key = `${r},${c},${dir}`;
  if (visited.has(key)) continue;
  visited.add(key);

  if (!(key in pointObj)) {
    pointObj[key] = cost;
  }

  if (r === er && c === ec && best === null) {
    best = cost;
  }

  const [dr, dc] = DIRS[dir];
  const nr = r + dr;
  const nc = c + dc;

  if (nr >= 0 && nc >= 0 && nr < R && nc < C && grid[nr][nc] !== '#') {
    pq.enqueue({ r: nr, c: nc, dir: dir, cost: cost + 1 });
  }

  pq.enqueue({ r: r, c: c, dir: (dir + 1) % 4, cost: cost + 1000 });
  pq.enqueue({ r: r, c: c, dir: (dir + 3) % 4, cost: cost + 1000 });
}

console.log('part1: ', best);

for (let newDir = 0; newDir < DIRS.length; newDir++) {
  pq.enqueue({ r: er, c: ec, dir: newDir, cost: 0 });
}
const bestPathTiles = new Set<string>();

const pointObjB: { [key: string]: number } = {};
const visited2 = new Set<string>();

while (!pq.isEmpty()) {
  const { r, c, dir, cost } = pq.dequeue() as State;

  const key = `${r},${c},${dir}`;
  if (visited2.has(key)) continue;
  visited2.add(key);
  if (!(key in pointObjB)) {
    pointObjB[key] = cost;
  }

  const [dr, dc] = DIRS[(dir + 2) % 4];
  const nr = r + dr;
  const nc = c + dc;

  if (nr >= 0 && nc >= 0 && nr < R && nc < C && grid[nr][nc] !== '#') {
    pq.enqueue({ r: nr, c: nc, dir: dir, cost: cost + 1 });
  }

  pq.enqueue({ r: r, c: c, dir: (dir + 3) % 4, cost: cost + 1000 });
  pq.enqueue({ r: r, c: c, dir: (dir + 1) % 4, cost: cost + 1000 });
}

grid.forEach((row, i) => {
  row.forEach((col, j) => {
    DIRS.forEach((dir, k) => {
      if (`${i},${j},${k}` in pointObj && `${i},${j},${k}` in pointObjB) {
        if (pointObj[`${i},${j},${k}`] + pointObjB[`${i},${j},${k}`] === best) {
          bestPathTiles.add(`${i},${j}`);
        }
      }
    });
  });
});

for (let i = 0; i < grid.length; i++) {
  let row = '';
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === '#') row += '#';
    else if (bestPathTiles.has(`${i},${j}`)) row += 'O';
    else row += '.';
  }
  // to see graph
  console.log(row);
}

console.log('part2', bestPathTiles.size);
