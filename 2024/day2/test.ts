import * as path from 'path';
import { getLines } from '../../tools/tools';
// __dirname is a special variable that holds the directory name of the current module (script.ts)
const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

function direction(first: number, second: number, numberList: number[]) {
  if (second > first) {
    return 1;
  } else if (second < first) {
    return -1;
  } else {
    if (numberList[2] > first) {
      return 1;
    } else if (numberList[2] < first) {
      return -1;
    } else {
      return 0;
    }
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

function newReport(direction: number, report: number[]) {
  let newBB: number[] = [];
  let specialIndex = 0;
  if (direction === 1) {
    report.forEach((el, i) => {
      if (
        report[i + 1] &&
        report[i + 1] - report[i] < 4 &&
        report[i + 1] - report[i] > 0
      ) {
      } else {
        specialIndex = i;
      }
    });
  } else {
    report.forEach((el, i) => {
      if (
        report[i + 1] &&
        report[i + 1] - report[i] > -4 &&
        report[i + 1] - report[i] < 0
      ) {
      } else {
        specialIndex = i;
      }
    });
  }
  // newBB = report.splice(specialIndex, 1);
  newBB = [...report.slice(0, specialIndex), ...report.slice(specialIndex + 1)];
  console.log({ report, newBB });
  return newBB;
}

let correctReports = 0;

lines.map((ln, i) => {
  const reportsList = ln.split(' ').map(Number);
  const upOrDown = direction(reportsList[0], reportsList[1], reportsList);
  if (upOrDown === 1) {
    if (isUpwarding(reportsList)) {
      correctReports++;
    } else if (isUpwarding(newReport(1, reportsList))) {
      correctReports++;
    } else {
      console.log('not correct report: ', { i });
    }
    console.log('upward: ', { reportsList });
  }
  if (upOrDown === -1) {
    if (isDownwarding(reportsList)) {
      correctReports++;
    } else if (isDownwarding(newReport(-1, reportsList))) {
      correctReports++;
    } else {
      console.log('not correct report: ', { i });
    }
    console.log('downward: ', { reportsList });
  }
});

console.log({ correctReports });
