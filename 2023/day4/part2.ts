import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let answer = 0;

const scratchcardsObj: { [key: string]: number } = {};

lines.forEach((line, i) => {
  scratchcardsObj[i + 1] = 1;
});

lines.forEach((line, i) => {
  const [left, right] = line.split(":")[1].split("|");
  const winningPool = left.split(" ").filter((v) => v);
  let winningCount = 0;
  right
    .split(" ")
    .filter((v) => v)
    .forEach((numIHave, j) => {
      if (winningPool.indexOf(numIHave) !== -1) {
        winningCount++;
      }
    });

  for (let cardCount = 0; cardCount < scratchcardsObj[i + 1]; cardCount++) {
    for (let cardIndex = i + 2; cardIndex < i + winningCount + 2; cardIndex++) {
      // console.log({ cardIndex, i, winningCount });
      if (cardIndex < lines.length + 1) {
        scratchcardsObj[cardIndex]++;
      }
    }
  }
});

Object.values(scratchcardsObj).forEach((value) => {
  answer += value;
});

console.log("The answer is ", answer);
