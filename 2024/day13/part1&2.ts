import * as path from 'path';
import { getLines } from '../../tools/tools';

const filePath = path.join(__dirname, 'input.txt');
const lines = getLines(filePath);

// process 二元一次方程式
// 94a + 22b = 8400
// 34a + 67b = 5400
// 6298a + 1474b = 562800
// 748a + 1474b = 118800
// 5550a = 177280 a = 80
// 5400 - 80 * 34  = 2680
// 2680 /67 = 40
// 80 * 3 + 40 * 1

function getPress(isPart2 = false) {
  const pointsObj: {
    [key: number]: { x: number[]; y: number[]; goal?: number[] };
  } = {};

  let pairIndex = 1;
  lines.forEach((ln, i) => {
    if (!ln.length) {
      pairIndex++;
      return;
    }
    if (!pointsObj[pairIndex]) {
      pointsObj[pairIndex] = {
        x: [],
        y: [],
        goal: [],
      };
    }
    try {
      if (i % 4 == 2) {
        ln.split(':')[1]
          .split(',')
          .forEach((g, j) => {
            if (isPart2) {
              pointsObj[pairIndex].goal!.push(
                Number(g.split('=')[1]) + 10000000000000
              );
            } else {
              pointsObj[pairIndex].goal!.push(Number(g.split('=')[1]));
            }
          });
      } else {
        const [xAmount, yAmount] = ln.split(':')[1].split(',');

        pointsObj[pairIndex].x.push(Number(xAmount.split('+')[1]));
        pointsObj[pairIndex].y.push(Number(yAmount.split('+')[1]));
      }
    } catch (error) {
      console.log({ error });
    }
  });

  let count = 0;
  Object.values(pointsObj).forEach((v, i) => {
    // console.log({ v });
    let x = 0;
    let y = 0;
    let smallestCommon = lcm(v.x[1], v.y[1]);
    let multiFirst = smallestCommon / v.x[1];
    let multiSecond = smallestCommon / v.y[1];
    let newX1 = v.x[0] * multiFirst;
    let newX2 = v.y[0] * multiSecond;

    if (v.goal) {
      let newGoal1 = v.goal[0] * multiFirst;
      let newGoal2 = v.goal[1] * multiSecond;
      if (newGoal1 > newGoal2) {
        x = (newGoal1 - newGoal2) / (newX1 - newX2);
        y = (v.goal[0] - v.x[0] * x) / v.x[1];
      } else {
        x = (newGoal2 - newGoal1) / (newX2 - newX1);
        y = (v.goal[1] - v.y[0] * x) / v.y[1];
      }
    }

    if (Number.isInteger(x) && Number.isInteger(y)) {
      count += 3 * x + 1 * y;
    }
  });
  return count;
}

console.log('part1: ', getPress(false));
console.log('part2: ', getPress(true));

function gcd(a: number, b: number) {
  // 使用欧几里得算法计算最大公因数
  while (b) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number) {
  // 最小公倍数公式: lcm(a, b) = (a * b) / gcd(a, b)
  if (a === 0 || b === 0) {
    return 0; // 如果其中一个数为0，最小公倍数也为0
  }
  return Math.abs(a * b) / gcd(a, b);
}
