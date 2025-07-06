import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
const grid = lines.map((ln) => ln.split(''));

const H = lines.length;
const W = lines[0].length;
let previousLetter = '';
let positionSet = new Set();
let count = 0;
let letterCount = 1;

grid.forEach((ln, i) => {
  ln.forEach((l, j) => {
    let nowLetter = l;
    if (!positionSet.has([i, j].join(','))) {
      previousLetter = nowLetter;
      let perimeter = getPerimeter(nowLetter, [i, j]);
      let toAddCount = letterCount * perimeter;

      count += toAddCount;
      letterCount = 1;
    }
  });
});

function getPerimeter(letter: string, position: number[]) {
  let perimeter = 0;
  if (positionSet.has(position.join(','))) {
    letterCount--;
    return perimeter;
  }
  positionSet.add(position.join(','));
  [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ].forEach((vector, i) => {
    if (
      position[0] + vector[0] < 0 ||
      position[0] + vector[0] >= H ||
      position[1] + vector[1] < 0 ||
      position[1] + vector[1] >= W
    ) {
      perimeter++;
      return;
    }

    let nextLetter = lines[position[0] + vector[0]][position[1] + vector[1]];
    if (nextLetter === letter) {
      letterCount++;
      perimeter += getPerimeter(nextLetter, [
        position[0] + vector[0],
        position[1] + vector[1],
      ]);
    } else {
      perimeter++;
    }
  });
  return perimeter;
}

console.log('answer is: ', count);
