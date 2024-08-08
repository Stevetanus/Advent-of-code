import fs from "fs";
import * as path from "path";
import { getLines } from "../../tools/tools";
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let total = 0;

lines.forEach((line, i) => {
  let firstFound = false;
  let lastFound = false;
  let calibrationValue = "";
  line.split("").forEach((character, j) => {
    if (firstFound) return;
    if (/\d/.test(character)) {
      calibrationValue += character;
      firstFound = true;
    }
  });
  line
    .split("")
    .reverse()
    .forEach((character, j) => {
      if (lastFound) return;
      if (/\d/.test(character)) {
        calibrationValue += character;
        lastFound = true;
      }
    });
  total += Number(calibrationValue);
});
console.log("\n");
console.log("The answer is ", total);
