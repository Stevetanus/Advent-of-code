import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let stonesArr = lines[0].split(' ');

function getNewStonesArr(stonesArr: string[]) {
  let newStonesArr: string[] = [];
  stonesArr.forEach((stone, i) => {
    if (stone === '0') {
      newStonesArr.push('1');
    } else if (stone.length % 2 === 0) {
      let left = Number(stone.slice(0, stone.length / 2)).toString();
      let right = Number(stone.slice(stone.length / 2)).toString();
      newStonesArr.push(left, right);
    } else {
      newStonesArr.push((Number(stone) * 2024).toString());
    }
  });
  return newStonesArr;
}

for (let i = 0; i < 25; i++) {
  stonesArr = getNewStonesArr(stonesArr);
}

console.log('answer is: ', stonesArr.length);
