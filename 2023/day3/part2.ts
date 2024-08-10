import * as path from "path";
import { getLines } from "../../tools/tools";
const filePath = path.join(__dirname, "input.txt");
const lines = getLines(filePath);

const numPositionArray: {
  [key: string]: string;
}[] = [];

const partsObj: {
  [key: string]: string[];
} = {};

let sum = 0;

lines.forEach((line, i) => {
  const numArray = [...line.matchAll(/\d{1,3}/g)];

  numPositionArray.push({});

  numArray.forEach((match, j) => {
    for (let k = 0; k < match[0].length; k++) {
      numPositionArray[i][match.index + k] = match[0];
    }
  });

  numArray.forEach((match, j) => {
    console.log(match);
    if (lines[i - 1]) {
      for (let k = -1; k < match[0].length + 1; k++) {
        if (lines[i - 1][match.index + k] === "*") {
          partsObj[`${i - 1}${match.index + k}`]
            ? partsObj[`${i - 1}${match.index + k}`].push(match[0])
            : (partsObj[`${i - 1}${match.index + k}`] = [match[0]]);
        }
      }
    }
    for (let k = -1; k < match[0].length + 1; k++) {
      if (lines[i][match.index + k] === "*") {
        console.log("did found *", i, match.index + k);
        partsObj[`${i}${match.index + k}`]
          ? partsObj[`${i}${match.index + k}`].push(match[0])
          : (partsObj[`${i}${match.index + k}`] = [match[0]]);
      }
    }
    if (lines[i + 1]) {
      for (let k = -1; k < match[0].length + 1; k++) {
        if (lines[i + 1][match.index + k] === "*") {
          console.log("did found * at the next row");
          partsObj[`${i + 1}${match.index + k}`]
            ? partsObj[`${i + 1}${match.index + k}`].push(match[0])
            : (partsObj[`${i + 1}${match.index + k}`] = [match[0]]);
        }
      }
    }
  });
});

console.log({ partsObj });

Object.values(partsObj).forEach((valueArr) => {
  if (valueArr.length === 2) {
    const gearRatio = Number(valueArr[0]) * Number(valueArr[1]);
    sum += gearRatio;
  }
});

// lines.forEach((line, i) => {
//   const specialCharArray = [...line.matchAll(/[*]/g)];
//   specialCharArray.forEach((match, j) => {
//     // console.log({ match });
//     const partNumberArray: string[] = [];
//     if (lines[i - 1]) {
//       for (let offset = -1; offset < 2; offset++) {
//         const partNumber = numPositionArray[i - 1][match.index + offset];
//         if (partNumber) {
//           if (partNumberArray.indexOf(partNumber) === -1) {
//             partNumberArray.push(partNumber);
//           }
//         }
//       }
//     }
//     for (let offset = -1; offset < 2; offset++) {
//       const partNumber = numPositionArray[i][match.index + offset];
//       if (partNumber) {
//         if (partNumberArray.indexOf(partNumber) === -1) {
//           partNumberArray.push(partNumber);
//         }
//       }
//     }
//     if (lines[i + 1]) {
//       for (let offset = -1; offset < 2; offset++) {
//         const partNumber = numPositionArray[i + 1][match.index + offset];
//         if (partNumber) {
//           if (partNumberArray.indexOf(partNumber) === -1) {
//             partNumberArray.push(partNumber);
//           }
//         }
//       }
//     }

//     if (partNumberArray.length === 2) {
//       let gearRatio = 1;
//       partNumberArray.forEach((numStr) => {
//         gearRatio *= Number(numStr);
//       });
//       console.log(j, match.index, partNumberArray, gearRatio);
//       sum += gearRatio;
//     }
//   });
// });

console.log("The answer is ", sum);
