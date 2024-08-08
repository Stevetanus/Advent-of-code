import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

// Determine which games would have been possible if the bag had been loaded with
// only 12 red cubes,
// 13 green cubes,
// and 14 blue cubes.
// What is the sum of the IDs of those games?

let sum = 0;

lines.forEach((line, i) => {
  const gameIndex = Number(line.split(":")[0].split(" ")[1]);

  let isPossible = true;
  line
    .split(":")[1]
    .split(";")
    .forEach((set, i) => {
      let red = 0;
      let green = 0;
      let blue = 0;
      set.split(",").forEach((cubes, j) => {
        const count = Number(cubes.trim().split(" ")[0]);
        if (cubes.endsWith("red")) {
          red = count;
        } else if (cubes.endsWith("blue")) {
          blue = count;
        } else if (cubes.endsWith("green")) {
          green = count;
        }
      });
      if (red > 12 || green > 13 || blue > 14) {
        isPossible = false;
      }
    });
  if (isPossible) {
    sum += gameIndex;
  }
});

console.log("\n");
console.log("The answer is ", sum);
