import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
let startingPoint: number[] = [];
let directionArr: string[] = [];
let isDirection = false;
const grid: string[][] = [];
let gridTwice: string[][] = [];
lines.map((ln, i) => {
  if (!ln.length) isDirection = true;
  if (isDirection && ln.length) {
    directionArr.push(ln);
  } else {
    if (!ln.length) return;
    const lnArr = ln.split('');
    let lnArrTwice: string[] = [];
    lnArr.forEach((ele, j) => {
      if (ele === '@') {
        startingPoint.push(i);
        startingPoint.push(lnArrTwice.length);
        lnArrTwice.push('@');
        lnArrTwice.push('.');
      } else if (ele === '.') {
        lnArrTwice.push('.');
        lnArrTwice.push('.');
      } else if (ele === '#') {
        lnArrTwice.push('#');
        lnArrTwice.push('#');
      } else {
        lnArrTwice.push('[');
        lnArrTwice.push(']');
      }
    });
    grid.push(lnArr);
    gridTwice.push(lnArrTwice);
  }
});

function updatePos(vector: number[]) {
  let toUpdatePos: string[] = [[startingPoint[0], startingPoint[1]].join(',')];
  let isStop = false;
  let i = 0;
  while (i < toUpdatePos.length) {
    let checkPointPos = toUpdatePos[i].split(',').map(Number);
    const [nx, ny] = [
      checkPointPos[0] + vector[0],
      checkPointPos[1] + vector[1],
    ];
    let checkPoint = gridTwice[nx][ny];
    if ('[]'.includes(checkPoint)) {
      let posStr = [nx, ny].join(',');
      if (!toUpdatePos.includes(posStr)) {
        toUpdatePos.push([nx, ny].join(','));
      }
      if (checkPoint === '[') {
        let rightStr = [nx, ny + 1].join(',');
        if (!toUpdatePos.includes(rightStr)) {
          toUpdatePos.push(rightStr);
        }
      }
      if (checkPoint === ']') {
        let leftStr = [nx, ny - 1].join(',');
        if (!toUpdatePos.includes(leftStr)) {
          toUpdatePos.push(leftStr);
        }
      }
    } else if (checkPoint === '#') {
      isStop = true;
      break;
    }
    i++;
  }

  if (isStop) return;
  const gridTwiceN = gridTwice.map((row) => row.slice());
  toUpdatePos.forEach((s, i) => {
    const [x, y] = s.split(',').map(Number);
    gridTwiceN[x][y] = '.';
  });
  toUpdatePos.forEach((s, i) => {
    const [x, y] = s.split(',').map(Number);
    gridTwiceN[x + vector[0]][y + vector[1]] = gridTwice[x][y];
  });

  gridTwice = gridTwiceN;
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
gridTwice.forEach((y, i) => {
  y.forEach((x, j) => {
    if (x === '[') {
      answer += i * 100 + j;
    }
  });
});
console.log({ answer });
