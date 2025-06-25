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
  let tolerateLevel = 0;
  while (condition) {
    const distance = report[checks + 1] - report[checks];
    // console.log({ distance });
    if (distance > 3 || distance < 1) {
      const newDistance = report[checks + 2] - report[checks];
      checks++;
      if (newDistance > 3 || newDistance < 1) {
        condition = false;
      } else {
        tolerateLevel++;
      }
      if (tolerateLevel > 1) {
        condition = false;
      }
    }
    checks++;
    if (checks > report.length - 1 || !condition) break;
  }
  return condition;
}

function isDownwarding(report: number[]) {
  let condition = true;
  let checks = 0;
  let tolerateLevel = 0;
  while (condition) {
    const distance = report[checks + 1] - report[checks];
    if (distance < -3 || distance > -1) {
      const newDistance = report[checks + 2] - report[checks];
      checks++;
      if (newDistance < -3 || newDistance > -1) {
        condition = false;
      } else {
        tolerateLevel++;
      }
      if (tolerateLevel > 1) {
        condition = false;
      }
    }
    checks++;
    if (checks > report.length - 1) break;
  }
  return condition;
}

let correctReports = 0;

lines.map((ln, i) => {
  const reportsList = ln.split(' ').map(Number);
  let upOrDown = direction(reportsList[0], reportsList[1]);
  if (upOrDown === 0) {
    upOrDown = direction(reportsList[0], reportsList[2]);
  }
  if (upOrDown === 1 && isUpwarding(reportsList)) {
    correctReports++;
    console.log('upward: ', { reportsList });
  }
  if (upOrDown === -1 && isDownwarding(reportsList)) {
    correctReports++;
    console.log('downward: ', { reportsList });
  }
});

console.log({ correctReports });
