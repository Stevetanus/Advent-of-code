import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
let isStart = false;
let count = 0;

let xObject: { [key: number]: number[] } = {};

lines.forEach((ln, i) => {
  if (isStart) return;
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

    isStart = true;
  }
});

Object.values(xObject).forEach((yOrdinateArr) => {
  count += yOrdinateArr.length;
});

console.log({ xObject }, count);
