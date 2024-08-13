import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

console.log({ lines });

const time = Number(
  lines[0]
    .split(":")[1]
    .split(" ")
    .filter((v) => v)
    .join("")
);
const distance = Number(
  lines[1]
    .split(":")[1]
    .split(" ")
    .filter((v) => v)
    .join("")
);

console.log({ time, distance });

let holdSecs = 0;
while (holdSecs * (time - holdSecs) < distance) {
  holdSecs++;
}
const answer = time + 1 - holdSecs * 2;
console.log("The answer is ", answer);
