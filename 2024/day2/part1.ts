import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

function direction(first: number, second: number) {
  if (second > first) {
    return 1;
  } else if (second < first) {
    return -1;
  } else {
    return 0;
  }
}

function isUpwarding(report: number[]) {
  let condition = true;
  let checks = 0;
  while (condition) {
    const distance = report[checks + 1] - report[checks];
    // console.log({ distance });
    if (distance > 3 || distance < 1) {
      condition = false;
    }
    checks++;
    if (checks === report.length - 1) break;
  }
  return condition;
}

function isDownwarding(report: number[]) {
  let condition = true;
  let checks = 0;
  while (condition) {
    const distance = report[checks + 1] - report[checks];
    if (distance < -3 || distance > -1) {
      condition = false;
    }
    checks++;
    if (checks === report.length - 1) break;
  }
  return condition;
}

let correctReports = 0;

// lines.map((ln, i) => {
//   const reportsList = ln.split(' ').map(Number);
//   const upOrDown = direction(reportsList[0], reportsList[1]);
//   if (upOrDown === 1 && isUpwarding(reportsList)) {
//     correctReports++;
//     console.log('upward: ', { reportsList });
//   }
//   if (upOrDown === -1 && isDownwarding(reportsList)) {
//     correctReports++;
//     console.log('downward: ', { reportsList });
//   }
// });

function getCombinationsAndItself(array: number[]) {
  let combinations: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    // Create a new subset by excluding the i-th element
    let subset = array.slice(0, i).concat(array.slice(i + 1));
    combinations.push(subset);
  }
  combinations.unshift(array);
  return combinations;
}

lines.map((ln, i) => {
  const reportsList = ln.split(' ').map(Number);
  const combinations = getCombinationsAndItself(reportsList);
  if (i < 2 || i == 712 || i == 713) {
    console.log({ combinations });
  }
  let corrects = 0;

  combinations.forEach((cb, i) => {
    if (corrects > 0) return;
    const upOrDown = direction(cb[0], cb[1]);
    if (upOrDown === 1 && isUpwarding(cb)) {
      corrects++;
      correctReports++;
      // console.log('upward: ', { reportsList });
    }
    if (upOrDown === -1 && isDownwarding(cb)) {
      corrects++;
      correctReports++;
      // console.log('downward: ', { reportsList });
    }
  });
  // console.log(`line ${i} corrects?`, corrects);
});

console.log({ correctReports });
