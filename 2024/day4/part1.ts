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
    if (char === 'X') {
      let xmas = char;

      if (i > 2) {
        xmas += lines[i - 1][j - 1];
        xmas += lines[i - 2][j - 2];
        xmas += lines[i - 3][j - 3];

        if (xmas === 'XMAS') count++;

        xmas = char;
        xmas += lines[i - 1][j];
        xmas += lines[i - 2][j];
        xmas += lines[i - 3][j];

        if (xmas === 'XMAS') count++;

        xmas = char;
        xmas += lines[i - 1][j + 1];
        xmas += lines[i - 2][j + 2];
        xmas += lines[i - 3][j + 3];

        if (xmas === 'XMAS') count++;
      }

      if (i < lines.length - 3) {
        xmas = char;
        xmas += lines[i + 1][j + 1];
        xmas += lines[i + 2][j + 2];
        xmas += lines[i + 3][j + 3];

        if (xmas === 'XMAS') count++;
        xmas = char;
        xmas += lines[i + 1][j];
        xmas += lines[i + 2][j];
        xmas += lines[i + 3][j];

        if (xmas === 'XMAS') count++;
        xmas = char;
        xmas += lines[i + 1][j - 1];
        xmas += lines[i + 2][j - 2];
        xmas += lines[i + 3][j - 3];

        if (xmas === 'XMAS') count++;
      }

      xmas = char;
      xmas += lines[i][j + 1];
      xmas += lines[i][j + 2];
      xmas += lines[i][j + 3];

      if (xmas === 'XMAS') count++;

      xmas = char;
      xmas += lines[i][j - 1];
      xmas += lines[i][j - 2];
      xmas += lines[i][j - 3];

      if (xmas === 'XMAS') count++;
    }
  });
});

console.log('answer: ', count);
