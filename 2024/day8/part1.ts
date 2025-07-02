import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);
const W = lines[0].length;
const H = lines.length;
const antennasObj: { [key: string]: number[][] } = {};

lines.forEach((ln, i) => {
  for (let j = 0; j < ln.length; j++) {
    if (ln[j] !== '.') {
      if (!antennasObj[ln[j]]) {
        antennasObj[ln[j]] = [[i, j]];
      } else {
        antennasObj[ln[j]].push([i, j]);
      }
    }
  }
});

let antinodes = new Set();
const helper = (
  yxArr: number[][] = [
    [1, 23],
    [4, 22],
    [5, 24],
    [6, 21],
  ]
) => {
  yxArr.forEach((yx, i) => {
    for (let j = 0; j < yxArr.length - 1; j++) {
      let antiOne = [
        yx[0] + (yx[0] - yxArr[(i + j + 1) % yxArr.length][0]),
        yx[1] + (yx[1] - yxArr[(i + j + 1) % yxArr.length][1]),
      ];
      let antiTwo = [
        yxArr[(i + j + 1) % yxArr.length][0] +
          (yxArr[(i + j + 1) % yxArr.length][0] - yx[0]),
        yxArr[(i + j + 1) % yxArr.length][1] +
          (yxArr[(i + j + 1) % yxArr.length][1] - yx[1]),
      ];
      if (
        antiOne[0] >= 0 &&
        antiOne[0] < H - 1 &&
        antiOne[1] >= 0 &&
        antiOne[1] < W - 1
      ) {
        antinodes.add(antiOne.join(','));
      }
      if (
        antiTwo[0] >= 0 &&
        antiTwo[0] < H &&
        antiTwo[1] >= 0 &&
        antiTwo[1] < W
      ) {
        antinodes.add(antiTwo.join(','));
      }
    }
  });
};

Object.values(antennasObj).forEach((freqLocation, i) => {
  helper(freqLocation);
});

console.log('answer is: ', antinodes.size);
