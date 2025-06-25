import fs from 'fs';
import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

let count = 0;

lines.forEach((ln, i) => {
  let charArray = ln.split('');
  charArray.forEach((char, j) => {
    if (char === 'A') {
      let xmas = char;

      if (i > 0 && i < lines.length - 1) {
        let diagMas = '';
        let masCount = 0;

        diagMas += lines[i - 1][j - 1];
        diagMas += char;
        diagMas += lines[i + 1][j + 1];

        if (diagMas === 'MAS' || diagMas === 'SAM') {
          masCount++;
        }

        diagMas = '';
        diagMas += lines[i - 1][j + 1];
        diagMas += char;
        diagMas += lines[i + 1][j - 1];

        if (diagMas === 'MAS' || diagMas === 'SAM') {
          masCount++;
        }

        if (masCount === 2) {
          count++;
        }
      }
    }
  });
});

console.log('answer: ', count);
