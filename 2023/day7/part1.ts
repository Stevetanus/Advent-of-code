import * as path from 'path';
import { getLines } from '../../tools/tools';
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

const compositionArr = [];

lines.forEach((line, i) => {
  const [cards, bid] = line.split(' ');
  const composition: { [key: string]: number } = {};
  cards.split('').forEach((card, j) => {
    if (!Object.prototype.hasOwnProperty.call(composition, card)) {
      composition[card] = 1;
    } else {
      composition[card]++;
    }
  });
  console.log({ cards, composition });
});
