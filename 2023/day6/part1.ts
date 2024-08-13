import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

console.log({ lines });

const time = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => v)
  .map(Number);
const distance = lines[1]
  .split(":")[1]
  .split(" ")
  .filter((v) => v)
  .map(Number);

let beatCounts: number[] = [];

time.forEach((millisecs, i) => {
  let beatCount = 0;
  for (let holdsecs = 0; holdsecs < Number(millisecs); holdsecs++) {
    const currentDistance = holdsecs * (millisecs - holdsecs);
    if (currentDistance > distance[i]) {
      beatCount++;
    }
  }

  beatCounts.push(beatCount);
});

const answer = beatCounts.reduce((prev, curr) => {
  return prev * curr;
}, 1);

console.log("The answer is ", answer);
