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
    antinodes.add(yx.join(','));
    for (let j = 0; j < yxArr.length - 1; j++) {
      let toAddAntinodeNeg = [yx[0], yx[1]];
      let slopeNeg = [
        yx[0] - yxArr[(i + j + 1) % yxArr.length][0],
        yx[1] - yxArr[(i + j + 1) % yxArr.length][1],
      ];
      let toAddAntinodePos = [
        yxArr[(i + j + 1) % yxArr.length][0],
        yxArr[(i + j + 1) % yxArr.length][1],
      ];
      let slopePos = [
        yxArr[(i + j + 1) % yxArr.length][0] - yx[0],
        yxArr[(i + j + 1) % yxArr.length][1] - yx[1],
      ];
      while (
        toAddAntinodeNeg[0] + slopeNeg[0] >= 0 &&
        toAddAntinodeNeg[0] + slopeNeg[0] < H &&
        toAddAntinodeNeg[1] + slopeNeg[1] >= 0 &&
        toAddAntinodeNeg[1] + slopeNeg[1] < W
      ) {
        toAddAntinodeNeg[0] = toAddAntinodeNeg[0] + slopeNeg[0];
        toAddAntinodeNeg[1] = toAddAntinodeNeg[1] + slopeNeg[1];
        antinodes.add(toAddAntinodeNeg.join(','));
      }
      while (
        toAddAntinodePos[0] + slopePos[0] >= 0 &&
        toAddAntinodePos[0] + slopePos[0] < H &&
        toAddAntinodePos[1] + slopePos[1] >= 0 &&
        toAddAntinodePos[1] + slopePos[1] < W
      ) {
        toAddAntinodePos[0] = toAddAntinodePos[0] + slopePos[0];
        toAddAntinodePos[1] = toAddAntinodePos[1] + slopePos[1];
        antinodes.add(toAddAntinodePos.join(','));
      }
    }
  });
};

Object.values(antennasObj).forEach((freqLocation, i) => {
  helper(freqLocation);
});

console.log('answer is: ', antinodes.size);
