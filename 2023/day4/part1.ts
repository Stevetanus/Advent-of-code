import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let answer = 0;

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

  if (winningCount) {
    console.log(
      `line ${i} has ${winningCount} count `,
      2 ** (winningCount - 1)
    );
    answer += 2 ** (winningCount - 1);
  }
});

console.log("The answer is ", answer);
