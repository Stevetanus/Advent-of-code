import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
let startingPoint: number[] = [];
let directionArr: string[] = [];
let isDirection = false;
let grid: string[][] = [];
lines.map((ln, i) => {
  if (!ln.length) isDirection = true;
  if (isDirection && ln.length) {
    directionArr.push(ln);
  } else {
    const lnArr = ln.split('');
    lnArr.forEach((ele, j) => {
      if (ele === '@') {
        startingPoint.push(i);
        startingPoint.push(j);
      }
    });
    lnArr.length && grid.push(lnArr);
  }
});

function updatePos(vector: number[]) {
  let isStop = false;
  let toUpdatePos: string[] = [[startingPoint[0], startingPoint[1]].join(',')];
  let i = 0;

  while (i < toUpdatePos.length) {
    const [cx, cy] = toUpdatePos[i].split(',').map(Number);
    let nx = cx + vector[0];
    let ny = cy + vector[1];
    if (grid[nx][ny] === 'O') {
      toUpdatePos.push([nx, ny].join(','));
    } else if (grid[nx][ny] === '#') {
      isStop = true;
      break;
    }
    i++;
  }

  if (isStop) return;

  const gridN = grid.map((row) => row.slice());
  toUpdatePos.forEach((p, i) => {
    const [x, y] = p.split(',').map(Number);
    gridN[x][y] = '.';
  });
  toUpdatePos.forEach((p, i) => {
    const [x, y] = p.split(',').map(Number);
    gridN[x + vector[0]][y + vector[1]] = grid[x][y];
  });
  grid = gridN;
  startingPoint = [startingPoint[0] + vector[0], startingPoint[1] + vector[1]];
}

directionArr.forEach((drS, i) => {
  drS.split('').forEach((dr, j) => {
    if (dr === '^') {
      updatePos([-1, 0]);
    } else if (dr === '<') {
      updatePos([0, -1]);
    } else if (dr === 'v') {
      updatePos([1, 0]);
    } else if (dr === '>') {
      updatePos([0, 1]);
    }
  });
});

let answer = 0;
grid.forEach((y, i) => {
  y.forEach((x, j) => {
    if (x === 'O') {
      answer += i * 100 + j;
    }
  });
});
console.log({ answer });
