import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let sum = 0;

function isSpecialChar(char: string) {
  return char && char.match(/[^\d\.]/);
}

lines.forEach((line, i) => {
  const numArray = [...line.matchAll(/\d{1,3}/g)];

  numArray.forEach((match, j) => {
    let isMatch = false;
    let runtimes = 0;
    while (!isMatch) {
      if (runtimes > 0) break;
      if (lines[i - 1]) {
        for (let k = -1; k < match[0].length + 1; k++) {
          if (isSpecialChar(lines[i - 1][match.index + k])) {
            isMatch = true;
            break;
          }
        }
      }
      for (let k = -1; k < match[0].length + 1; k++) {
        if (isSpecialChar(lines[i][match.index + k])) {
          isMatch = true;
          break;
        }
      }
      if (lines[i + 1]) {
        for (let k = -1; k < match[0].length + 1; k++) {
          if (isSpecialChar(lines[i + 1][match.index + k])) {
            isMatch = true;
            break;
          }
        }
      }
      runtimes++;
    }
    if (isMatch) {
      console.log(match[0]);
      sum += Number(match[0]);
    }
  });
});

console.log("The answer is ", sum);
