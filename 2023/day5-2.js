const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
const lines = data.split(/\r\n/);
if (lines.at(-1) === "") lines.pop();
console.log("start");

function day5(lines) {
  let inputs = lines[0].split(":")[1].trim().split(" ").map(Number);
  seeds = [];
  for (let i = 0; i < inputs.length; i += 2) {
    seeds.push([inputs[i], inputs[i] + inputs[i + 1]]);
  }
  console.log({ seeds });

  let blocks = lines.slice(2).filter((l) => l);
  let blockyy = [];
  let groupIndex = -1;
  blocks.forEach((b) => {
    if (b.endsWith("map:")) {
      groupIndex++;
      blockyy[groupIndex] = [];
      return;
    }
    blockyy[groupIndex].push(b);
  });
  // return;

  for (let block of blockyy) {
    console.log(block);
    let ranges = [];
    for (let line of block) {
      console.log({ line });
      ln = line.split(" ").map(Number);
      ranges.push([ln[0], ln[1], ln[2]]);
    }
    console.log({ ranges });
    let newArr = [];
    while (seeds.length) {
      let [start, end] = seeds.pop();
      let foundOverlap = false;
      for (let [a, b, c] of ranges) {
        // for (let i = 0; i < ranges.length; i++) {
        // a: to b: from c: offset
        console.log({ a, b, c });
        let overlapStart = Math.max(start, b);
        let overlapEnd = Math.min(end, b + c);
        if (overlapStart < overlapEnd) {
          newArr.push([overlapStart - b + a, overlapEnd - b + a]);
          if (overlapStart > start) {
            seeds.push([start, overlapStart]);
          }
          if (end > overlapEnd) {
            seeds.push([overlapEnd, end]);
          }
          foundOverlap = true;
          break;
        }
      }
      if (!foundOverlap) {
        console.log("else", newArr);
        newArr.push([start, end]);
      }
    }
    seeds = newArr;
  }

  console.log({ seeds });
}

day5(lines);
