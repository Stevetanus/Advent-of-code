import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';

// 用於判斷地圖邊界與障礙物
const lines = getLines(path.join(__dirname, 'input.txt'));
let isOuterStart = false;
let count = 0;
let givenBlockArr: number[][] = [];

let xObject: { [key: number]: number[] } = {};

lines.forEach((ln, i) => {
  if (isOuterStart) return;
  if (ln.indexOf('^') != -1) {
    let startingPoint = [i, ln.indexOf('^')];
    let direction = 'top';
    console.log(lines.length, ln.length);

    function updateObject(x: number, y: number) {
      if (!xObject[x]) {
        xObject[x] = [y];
      } else {
        if (xObject[x].indexOf(y) === -1) {
          xObject[x].push(y);
        }
      }
    }

    while (
      startingPoint[0] < lines.length &&
      startingPoint[0] >= 0 &&
      startingPoint[1] >= 0 &&
      startingPoint[1] < ln.length
    ) {
      // console.log({ startingPoint, direction, count });
      if (
        lines[startingPoint[0]][startingPoint[1]] !== '#' &&
        direction === 'top'
      ) {
        updateObject(startingPoint[0], startingPoint[1]);
        startingPoint[0]--;
        // count++;
      } else if (
        lines[startingPoint[0]][startingPoint[1]] !== '#' &&
        direction === 'right'
      ) {
        updateObject(startingPoint[0], startingPoint[1]);
        startingPoint[1]++;
        // count++;
      } else if (
        lines[startingPoint[0]][startingPoint[1]] !== '#' &&
        direction === 'down'
      ) {
        updateObject(startingPoint[0], startingPoint[1]);
        startingPoint[0]++;
        // count++;
      } else if (
        lines[startingPoint[0]][startingPoint[1]] !== '#' &&
        direction === 'left'
      ) {
        updateObject(startingPoint[0], startingPoint[1]);
        startingPoint[1]--;
        // count++;
      } else {
        // change direction
        if (direction === 'top') {
          startingPoint[0]++;
          startingPoint[1]++;
          direction = 'right';
        } else if (direction === 'right') {
          startingPoint[1]--;
          startingPoint[0]++;
          direction = 'down';
        } else if (direction === 'down') {
          startingPoint[0]--;
          startingPoint[1]--;
          direction = 'left';
        } else {
          startingPoint[1]++;
          startingPoint[0]--;
          direction = 'top';
        }
      }
    }

    isOuterStart = true;
  }
});

Object.entries(xObject).forEach((v) => {
  v[1].forEach((y) => {
    givenBlockArr.push([Number(v[0]), y]);
  });
});

givenBlockArr.forEach((arr, i) => {
  findLoopCount(arr);
});

function findLoopCount(givenBlock: number[], isStart = false) {
  if (givenBlock[0] === 61 && givenBlock[1] === 78) return;
  // 二維陣列複製
  let newLines = lines.map((line) => [...line]);

  // 插入障礙物
  newLines[givenBlock[0]][givenBlock[1]] = '#';
  // let newLines = [...lines];

  let beenStucked: number[][] = [];
  // newLines[givenBlock[0]] =
  //   lines[givenBlock[0]].slice(0, givenBlock[1]) +
  //   '#' +
  //   lines[givenBlock[0]].slice(givenBlock[1]);

  // console.log(lines[givenBlock[0]], lines.length);
  // console.log(newLines[givenBlock[0]], newLines.length);

  newLines.forEach((ln, i) => {
    if (ln.indexOf('^') != -1) {
      let startingPoint = [i, ln.indexOf('^')];
      console.log({ startingPoint });

      let direction = 'top';
      console.log(newLines.length, ln.length);

      while (
        startingPoint[0] < newLines.length &&
        startingPoint[0] >= 0 &&
        startingPoint[1] >= 0 &&
        startingPoint[1] < ln.length
      ) {
        // console.log({ startingPoint, direction, count });
        if (
          newLines[startingPoint[0]][startingPoint[1]] !== '#' &&
          direction === 'top'
        ) {
          startingPoint[0]--;
        } else if (
          newLines[startingPoint[0]][startingPoint[1]] !== '#' &&
          direction === 'right'
        ) {
          startingPoint[1]++;
        } else if (
          newLines[startingPoint[0]][startingPoint[1]] !== '#' &&
          direction === 'down'
        ) {
          startingPoint[0]++;
        } else if (
          newLines[startingPoint[0]][startingPoint[1]] !== '#' &&
          direction === 'left'
        ) {
          startingPoint[1]--;
        } else {
          beenStucked.push([startingPoint[0], startingPoint[1]]);
          if (beenStucked.length >= 10000) {
            count++;
            break;
          }

          if (direction === 'top') {
            startingPoint[0]++;
            startingPoint[1]++;
            direction = 'right';
          } else if (direction === 'right') {
            startingPoint[1]--;
            startingPoint[0]++;
            direction = 'down';
          } else if (direction === 'down') {
            startingPoint[0]--;
            startingPoint[1]--;
            direction = 'left';
          } else {
            startingPoint[1]++;
            startingPoint[0]--;
            direction = 'top';
          }
        }
      }
    }
  });
}

console.log('part2 answer is: ', count);
