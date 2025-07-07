import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let grid = new Array(103).fill(null).map(() => new Array(101).fill(0));

lines.forEach((ln, i) => {
  let [p, v] = ln.split(' ');

  let [x, y] = p.split('=')[1].split(',').map(Number);

  let [vx, vy] = v.split('=')[1].split(',').map(Number);

  let endPoint = getLastPosition([x, y], [vx, vy], 100);
  grid[endPoint[1]][endPoint[0]]++;
});
function getLastPosition(
  startPoint: number[],
  vector: number[],
  times: number
): number[] {
  const width = grid[0].length;
  const height = grid.length;

  const vX = (startPoint[0] + times * vector[0]) % width;
  const vY = (startPoint[1] + times * vector[1]) % height;
  const newX = vX >= 0 ? vX : vX + width;
  const newY = vY >= 0 ? vY : vY + height;
  return [newX, newY];
}

let middleY = Math.floor(grid.length / 2);
let middleX = Math.floor(grid[0].length / 2);
console.log({ middleY, middleX });

let first = 0;
let second = 0;
let third = 0;
let fourth = 0;

grid.forEach((y, i) => {
  y.forEach((x, j) => {
    if (i !== middleY && j !== middleX) {
      if (i < middleY && j < middleX) {
        first += x;
      } else if (i < middleY && j > middleX) {
        second += x;
      } else if (i > middleY && j < middleX) {
        third += x;
      } else {
        fourth += x;
      }
    }
  });
});

console.log('answer is:', first * second * third * fourth);
