import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let answer = 0;

let seeds = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => v)
  .map(Number);
let currentTitle = "";

const plantsTransformMap: {
  [key: string]: {
    destinationStart: number;
    sourceStart: number;
    range: number;
  }[];
} = {};

const mapTitle = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];
lines.forEach((line, i) => {
  if (i < 2 || !line) return;
  mapTitle.forEach((title) => {
    if (line.includes(title)) {
      currentTitle = title;
    }
  });

  if (plantsTransformMap[currentTitle]) {
    const [destinationStart, sourceStart, range] = line
      .split(" ")
      .filter((v) => v)
      .map(Number);

    plantsTransformMap[currentTitle].push({
      destinationStart,
      sourceStart,
      range,
    });
  } else {
    plantsTransformMap[currentTitle] = [];
  }
});

function transformByMap(
  seeds: number[],
  mapping: { destinationStart: number; sourceStart: number; range: number }[]
) {
  seeds.forEach((seed, seedIndex) => {
    mapping.forEach((map, mapIndex) => {
      if (seed >= map.sourceStart && seed < map.sourceStart + map.range) {
        seeds[seedIndex] = map.destinationStart + seed - map.sourceStart;
      }
    });
  });
}

Object.keys(plantsTransformMap).forEach((mapTitle) => {
  transformByMap(seeds, plantsTransformMap[mapTitle]);
});

answer = seeds.reduce((prev, curr) => {
  return prev < curr ? prev : curr;
}, Infinity);

console.log("The answer is ", answer);
