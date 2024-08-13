import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let answer = 0;
let inputs = lines[0]
  .split(":")[1]
  .split(" ")
  .filter((v) => v)
  .map(Number);

let seeds: { start: number; end: number }[] = [];

for (let i = 0; i < inputs.length; i += 2) {
  seeds.push({
    start: inputs[i],
    end: inputs[i] + inputs[i + 1],
  });
}

const blocks: [
  {
    destinationStart: number;
    sourceStart: number;
    range: number;
  }
][] = [];
let blockIndex = -1;
lines.forEach((line) => {
  if (line.includes("map")) {
    blockIndex++;
  }
  if (line && !line.includes("map")) {
    const [destinationStart, sourceStart, range] = line.split(" ").map(Number);
    blocks[blockIndex]
      ? blocks[blockIndex].push({
          destinationStart,
          sourceStart,
          range,
        })
      : (blocks[blockIndex] = [
          {
            destinationStart,
            sourceStart,
            range,
          },
        ]);
  }
});

blocks.forEach((block) => {
  const newSeeds: { start: number; end: number }[] = [];
  while (seeds.length) {
    const { start, end } = seeds.pop() ?? { start: 0, end: 0 };

    let isHandled = false;

    block.some((map) => {
      // Use `some` instead of `forEach`
      const { destinationStart, sourceStart, range } = map;
      const observedStart = Math.max(start, sourceStart);
      const observedEnd = Math.min(end, sourceStart + range);

      if (observedStart < observedEnd) {
        newSeeds.push({
          start: observedStart - sourceStart + destinationStart,
          end: observedEnd - sourceStart + destinationStart,
        });
        if (observedStart > start) {
          seeds.push({
            start: start,
            end: observedStart,
          });
        }
        if (end > observedEnd) {
          seeds.push({
            start: observedEnd,
            end: end,
          });
        }
        isHandled = true;
        return true; // Break out of the loop
      }
      return false;
    });

    if (!isHandled) {
      newSeeds.push({
        start,
        end,
      });
    }
  }
  seeds = newSeeds;
});

answer = seeds.reduce((prev, curr) => {
  return curr.start < prev ? curr.start : prev;
}, Infinity);

console.log("The answer is ", answer);
