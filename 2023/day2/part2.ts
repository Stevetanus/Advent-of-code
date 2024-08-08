import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

let sum = 0;

lines.forEach((line, i) => {
  const { red, green, blue } = line
    .split(":")[1]
    .split(";")
    .reduce(
      (prev, currSet) => {
        let currSetRed = 0;
        let currSetGreen = 0;
        let currSetBlue = 0;
        currSet.split(",").forEach((cubes, i) => {
          const count = Number(cubes.trim().split(" ")[0]);
          if (cubes.endsWith("red")) {
            currSetRed = count;
          } else if (cubes.endsWith("green")) {
            currSetGreen = count;
          } else if (cubes.endsWith("blue")) {
            currSetBlue = count;
          }
        });
        return {
          red: currSetRed > prev.red ? currSetRed : prev.red,
          green: currSetGreen > prev.green ? currSetGreen : prev.green,
          blue: currSetBlue > prev.blue ? currSetBlue : prev.blue,
        };
      },
      {
        red: 0,
        green: 0,
        blue: 0,
      }
    );

  sum += red * green * blue;
});

console.log("\n");
console.log("The answer is ", sum);
