import fs from "fs";
import * as path from "path";
import { getLines } from "../../tools/tools";

const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);
if (lines.at(-1) === "") lines.pop();

type EnglishNumber = {
  [key: string]: string;
};

let total = 0;
const englishNumber: EnglishNumber = {
  ["one"]: "1",
  ["two"]: "2",
  ["three"]: "3",
  ["four"]: "4",
  ["five"]: "5",
  ["six"]: "6",
  ["seven"]: "7",
  ["eight"]: "8",
  ["nine"]: "9",
};

lines.forEach((line, i) => {
  let firstFound = false;
  let lastFound = false;
  let calibrationValue = "";
  const firstNumberIndex = Object.keys(englishNumber).reduce(
    (prev, curr) => {
      const regex = new RegExp(curr);
      const match = line.match(regex);
      if (match) {
        const index = match.index!;
        if (index < prev.index) {
          return {
            number: englishNumber[curr],
            index: index,
          };
        }
      }
      return prev;
    },
    {
      number: "",
      index: Infinity,
    }
  );

  line.split("").forEach((character, j) => {
    if (firstFound) return;
    if (/\d/.test(character)) {
      if (j < firstNumberIndex.index) {
        calibrationValue += character;
      } else {
        calibrationValue += firstNumberIndex.number;
      }
      firstFound = true;
    }
  });
  const reversedLine = line.split("").reverse();

  const lastNumberIndex = Object.keys(englishNumber).reduce(
    (prev, curr) => {
      const regex = new RegExp(curr);
      const match = line.match(regex);
      if (match) {
        // keypoints: lastIndexOf() helps us find the last substring matched index quickly.
        const index = line.lastIndexOf(curr);
        if (index > prev.index) {
          return {
            number: englishNumber[curr],
            index: index,
          };
        }
      }
      return prev;
    },
    {
      number: "",
      index: -Infinity,
    }
  );

  reversedLine.forEach((character, j) => {
    if (lastFound) return;
    if (/\d/.test(character)) {
      // line.length - j - 1 is the index go forwards
      if (line.length - j - 1 > lastNumberIndex.index) {
        calibrationValue += character;
      } else {
        calibrationValue += lastNumberIndex.number;
      }
      lastFound = true;
    }
  });
  total += Number(calibrationValue);
});
console.log("\n");
console.log("The answer is ", total);
